---
title: "Reading Without Source: What REA Changes, and What It Does Not"
date: 2026-10-13 00:45:00 +0100
summary: >-
  REA lets coding agents interrogate compiled software and return evidence-backed
  findings, not source code. The technical mechanism is modest. The questions it
  opens for vendors, security teams, lawyers and engineering organisations are
  not, and this essay poses them without answering them.
standfirst: On agent-driven reverse engineering, and the questions it opens
tags: [reverse-engineering, agents, verification, security]
thumb: /assets/img/rea-cover-pyramid.webp
image: /assets/img/rea-cover-pyramid.webp
image_width: 1006
image_height: 1102
image_alt: "An archaeology analogy. An original pyramid labelled source code keeps its behaviour, names and comments, and design intent. After compilation it is an eroded pyramid: behaviour is kept, names and comments are usually stripped, design intent is lost. Agent proposals are hypotheses, not evidence. A robot labelled agent excavates pseudocode as proposals, and symbols, strings, calls and references as evidence."
---

> This is a personal essay on a public open-source tool and on general concepts
> in software analysis. It is not issued on behalf of any employer or
> institution and does not describe their software, systems, clients or
> activities.
>
> Statements about the tool are attributed to its public documentation. The
> essay reports no test results and makes no claim about how well the tool
> performs on any particular software. Nothing here is legal, security or
> investment advice. The references to law describe one provision in one
> jurisdiction as a question, not as a conclusion.

<figure>
  <img src="/assets/img/rea-cover-pyramid.webp" width="1006" height="1102" loading="eager" fetchpriority="high" decoding="async"
       alt="An archaeology analogy. An original pyramid labelled source code keeps its behaviour, names and comments, and design intent. After compilation it is an eroded pyramid: behaviour is kept, names and comments are usually stripped, design intent is lost. Agent proposals are hypotheses, not evidence. A robot labelled agent excavates pseudocode as proposals, and symbols, strings, calls and references as evidence.">
  <figcaption>An analogy, not data: the source pyramid erodes when it is compiled. The robot is the coding agent. What it brings back are proposals and evidence, and a proposal is a hypothesis.</figcaption>
</figure>

A compiled program keeps what the code does and discards why it was written that way.

That one sentence explains most of what a reverse-engineering tool can and cannot do, and it frames how I read the arrival of REA, a recently released open-source project that connects AI coding agents to professional reverse-engineering tools.

<figure>
  <img src="/assets/img/rea-binary-keeps-and-loses.webp" width="1200" height="675" loading="lazy" decoding="async"
       alt="Three columns: source code, compiled binary and what REA returns. A binary keeps behaviour, usually strips names and comments, reduces types to sizes and offsets, and does not record design intent. REA returns pseudocode, symbols, strings, calls and references, evidence and stated limits.">
  <figcaption>What survives compilation, and what the tooling hands back. An agent can propose names and structure; a proposal is a hypothesis, not a recovery.</figcaption>
</figure>

The technical mechanism is modest. The change that matters is the price of asking a question of a binary. This essay separates the two, describes how the machinery works, and then does something deliberately limited: it lists the questions this opens for the industry, and does not answer them.

## What REA is, and what it is not

REA is an orchestration layer between AI agents and reverse-engineering tools. It is an MCP (Model Context Protocol) server, MIT-licensed, that exposes analysis capabilities to coding assistants such as Claude Code, Cursor and Codex. For native binaries it routes analysis through Hopper, Ghidra or IDA Pro, which the user supplies and licenses separately (setup can optionally install Hopper). It also covers JavaScript and Electron applications, .NET assemblies, websites and several other target types.

The project's claim, as I read its documentation, is narrow. Without source code, an agent can be helped to understand how a packaged piece of software implements a feature, and to report conclusions with the evidence behind them.

What comes back is pseudocode, assembly, strings, symbols, call relationships and references, together with the evidence and limitations behind each conclusion. It is not source code, and it does not compile.

That distinction deserves weight, because the phrase "reverse engineer anything" invites a different reading. The output is a set of clues. Going from clues to a maintainable reimplementation still needs human judgement and engineering decisions: what to keep, what to redesign, what was incidental to the original and what was essential.

The documentation also states a scope. REA is intended for analysis of software the user owns or is authorised to examine, and it grants no licence, key or activation entitlement for the commercial tools it drives. I return to that sentence in the questions below.

## How reverse-engineering tools read a binary

### The static pipeline

Static analysis reads the file without running it.

<figure>
  <img src="/assets/img/rea-static-pipeline.webp" width="1200" height="675" loading="lazy" decoding="async"
       alt="Five stages from bytes to pseudocode, with what stays uncertain at each. Identify and parse: the layout is explicit in the file. Disassemble: code versus data and indirect jump targets are uncertain. Lift to intermediate representation: adds no intent, only normalises. Recover flow: paths that depend on runtime values are uncertain. Decompile: names, types and structure are guesses.">
  <figcaption>Each stage makes the program more readable. The row underneath marks what each stage cannot settle by itself.</figcaption>
</figure>

The tool identifies the file format (ELF, PE or Mach-O), parses the headers and section table, and maps virtual addresses. It disassembles bytes into instructions for the target architecture. It then lifts those instructions into an intermediate representation, builds control-flow and data-flow views, and finally emits decompiled pseudocode.

The intermediate step is the one worth understanding. Ghidra's SLEIGH language describes the semantics of each processor's instructions in terms of P-code, which Ghidra's documentation calls a register transfer language that is machine independent. A single analysis can then be reused across x86, ARM, MIPS and others, because it runs on P-code and not on any one instruction set.

Two cautions keep this honest. First, raw P-code is not yet the finished data-flow graph. Ghidra's P-code reference notes that graph construction adds further steps and opcodes that cannot occur in the original raw translation. Second, P-code makes machine code analysable; it does not restore anything the compiler discarded. It is a bridge for understanding, not material for rewriting. Variable names, type systems, design patterns and exception semantics are not in it, because they were not in the binary to begin with.

### The dynamic pipeline

Static analysis can be misled. Obfuscation, encryption and indirect jumps all hide what a program does from a reader who never runs it.

Dynamic analysis answers by running the target. A debugger such as GDB, LLDB or WinDbg exposes memory, registers and call stacks at runtime. On x86, a software breakpoint typically works by replacing the first byte of an instruction with `int 3`, which raises an exception and hands control to the debugger. Binary instrumentation goes further and inserts callbacks into the running program, for example at each basic block, to record how control moves.

Neither approach is sufficient alone. Static analysis proposes what the instructions say; dynamic analysis observes what the program does. A conclusion that both support is stronger than either one.

## How REA's workflow runs

REA does not change this pipeline. It changes who operates it. The agent asks the questions, the engines do the reading, and the results come back as evidence.

### Converge on the question

The most consequential step happens before any tool is called. The unhelpful question is "how is this software implemented?" The workable one is narrower: "how does its local search build an index and perform matching? Show supporting evidence."

A converged question does three jobs. It gives the agent a path to follow. It makes the conclusion checkable, because there is something specific to check. And it makes a confidence judgement possible, because there is a claim to be confident about.

### Advance in layers

<figure>
  <img src="/assets/img/rea-question-to-evidence.webp" width="1200" height="675" loading="lazy" decoding="async"
       alt="The chain from a human's narrow question through a coding agent, the REA MCP server and an analysis engine to the target. Below it, four passes: map, critical path, local logic and cross-check. At the bottom, the output of evidence and limits passes to a human recheck.">
  <figcaption>The human asks and the human checks. The agent and the engines sit between the two.</figcaption>
</figure>

The analysis proceeds in four passes, each narrower than the last.

1. **Map.** Build an overview: module composition, entry points and the distribution of key functions, from file structure and symbols.
2. **Critical path.** Locate the functions and call relationships around the target feature, through call-graph tracing, string search and cross-references.
3. **Local logic.** Follow input to processing to output in decompiled pseudocode and the underlying data flow.
4. **Cross-check.** Ask whether strings, call chains and runtime behaviour point to the same conclusion, using debugging and runtime capture.

The project's documentation describes its examples in the same spirit: recovered rules are compared against controlled runs or public source before a reconstruction is tested.

### Evidence, limits, and the recheck

Each conclusion is meant to arrive with three kinds of information. There is evidence: verifiable clues such as function addresses, string references and call chains, which a reader can return to and recheck. There are stated limits: what was not investigated, so that the reader does not over-infer in the gaps. And there is the reader's own judgement of confidence. The documentation I read describes evidence and limitations; how much to trust a given conclusion is left to the person reading it.

The human role is therefore not that of a bystander. It is the questioner at the start and the proofreader at the end.

## Where the cost moved

Reverse engineering has always been a series of small questions followed by judgement. What does this function do? Who calls it? Where does this string go? Each question cost analyst time: opening the tool, navigating to the right place, reading, naming, writing down.

An agent changes the cost of asking. It can pose and chase many of these questions quickly, and it can do so in the plain language of a feature description. I have not seen a measurement of this in the material I read, so I treat it as a structural observation and not a quantified one.

What the agent does not change is the cost of two other things. One is deciding which question is worth asking. The other is checking the answer. This matches an argument I made in [Structure Follows the Criteria](/writing/structure-follows-the-criteria/): work goes well where a checkable criterion can live. A converged question with cited evidence has one. A vague request for "how it works" does not.

The same post describes a failure mode in chains: when a step can no longer be judged, its checkpoint quietly becomes a rubber stamp. Fluent output may create a similar condition from a different cause. If an answer reads well and cites addresses, the recheck is easy to skip. An evidence-backed answer is only as good as the recheck. This is my inference from the mechanism, not something I have observed in the tool.

## Questions this opens

I am not offering recommendations. The questions belong to different people, and several of them depend on a jurisdiction, a contract or a threat model I cannot see. I have grouped them by who might own them.

### For vendors and product owners

- If behaviour can be recovered at the price of a well-framed question, what does distributing a compiled artefact protect, and for how long?
- Obfuscation raises cost measured in analyst hours. What does it buy when the cost is measured in compute?
- Which parts of a product's value live in its behaviour, and which live in its data, its service or its operation? Which of those can a binary reveal?

### For security teams

- A defender studying a patch and an attacker studying it use the same tool. How does the interval between a fix shipping and the fix being understood change, and for whom?
- The documentation notes that runtime capture runs or interacts with the selected target using the user's own permissions. What boundary applies when an agent holding those permissions analyses an untrusted sample?
- A binary's strings and embedded text become input to the agent. What stops a hostile sample from addressing the analyst's agent directly?

### For legal and compliance functions

- Article 6 of the EU Software Directive (2009/24/EC) permits limited decompilation, without the rightholder's authorisation, where it is indispensable to obtain information for an independently created program to interoperate. It attaches conditions: the person must be a licensee or otherwise entitled to use the copy, the information must not already be readily available, and the acts must be confined to the parts of the program that interoperability requires. It also restricts what the information may be used for, including developing a substantially similar program. How is "confined to the necessary parts" evidenced when an agent explores broadly?
- Clean-room practice separates the people who read the original from the people who write the replacement. Where does that separation sit when a single agent session does both, and what record would show it?
- The project scopes its use to software one owns or is authorised to examine. Who checks that, and at what point?

### For engineering organisations

- Many organisations run software whose source or documentation has been lost. If reading a binary becomes cheaper, what happens to the cost of undocumented systems?
- If an agent produces an explanation of how a legacy component works, who owns that explanation, who maintains it, and what happens when the binary is updated?

### For anyone relying on the output

- An answer arrives with stated limits. What happens to those limits as the answer is summarised, forwarded and acted on downstream?
- Who is accountable when a conclusion that was correctly labelled as partial is used as if it were complete?

## What this essay does not know

This essay rests on public documentation of a very young project. I have not seen an independent evaluation of how accurate REA's conclusions are, and I report none. Popularity figures circulated in coverage of the project disagree with each other by an order of magnitude, so I have not used them. The questions above are not exhaustive; they are the ones that follow most directly from the mechanism.

The mechanism itself is not new. Disassemblers, decompilers, debuggers and instrumentation have existed for decades. What is new is the interface in front of them, and the practical question of what changes when the interface is a conversation.

## Sources

- [REA repository and README](https://github.com/morluto/rea) and [documentation site](https://morluto.github.io/rea/): scope, supported targets, routing to Hopper, Ghidra and IDA, output description, authorisation statement, licensing.
- [Ghidra SLEIGH documentation](https://ghidra.re/ghidra_docs/languages/html/sleigh.html): P-code as a machine-independent register transfer language.
- [Ghidra P-code reference](https://ghidra.re/ghidra_docs/languages/html/pcoderef.html): raw P-code versus graph construction.
- [Directive 2009/24/EC, Article 6 (Decompilation)](https://www.legislation.gov.uk/eudr/2009/24/article/6), as reproduced on legislation.gov.uk. I read this copy and not the EUR-Lex original; check the official text before relying on the exact wording.
- Breakpoint and instrumentation descriptions are standard debugger and instrumentation practice, not specific to REA.

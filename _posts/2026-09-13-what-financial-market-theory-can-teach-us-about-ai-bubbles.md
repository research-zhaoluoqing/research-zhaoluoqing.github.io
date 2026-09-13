---
title: "What Financial-Market Theory Can Teach Us About AI Bubbles"
date: 2026-09-13
summary: >-
  A framework for separating AI progress, delivered value, durable scarcity and
  the assumptions embedded in valuation—without making a current market or
  security judgment.
standfirst: Invariants, scarcity, and duration
tags: [ai, financial-economics, valuation, systems]
thumb: /assets/img/ai-bubbles-invariants-scarcity-duration.webp
---

> This is a personal research essay on general concepts in financial economics
> and AI systems. It is not issued on behalf of any employer or institution and
> does not describe their activities, systems, clients or assessments.
>
> References to valuation and bubbles are conceptual. The article makes no
> assessment of any identifiable security’s investment merits or current market
> valuation and provides no trading, investment, legal or regulatory advice.
>
> Factual statements are attributed to the public sources cited. Numerical
> examples and business scenarios explicitly labelled hypothetical are
> constructed for illustration; they do not represent actual transactions,
> monitoring arrangements, employers or clients. Proposed analytical methods and
> tests are not presented as completed empirical findings.

<figure>
  <img src="/assets/img/ai-bubbles-invariants-scarcity-duration.webp"
       width="1122" height="1402" loading="eager" decoding="async"
       alt="AI progress feeds two paths: a large balloon of expectations measured by growth, margins and duration, and delivered value measured by useful results and retained cash flow. The central risk is temporary scarcity being priced as lasting advantage.">
  <figcaption>AI progress creates possibilities; evidence tests whether expected growth, margins and duration can become delivered value.</figcaption>
</figure>

An artificial-intelligence technology can keep improving and produce substantial social value while the businesses built around it retain less profit than expected. There is no contradiction. Technical progress, customer value, supplier profit, free cash flow, and valuation assumptions are different links in a chain. The central methodological question is not simply whether AI works or whether demand is real. It is: **what future would a given valuation require, and which conversions from technical progress to cash flow would have to succeed for that valuation to be internally consistent?**

The chain is:

**technical progress → business outcomes → profit retained by the supplier → free cash flow after reinvestment → valuation assumptions.**

Failure can occur at every arrow. A stronger model may not fit the workflow. A useful product may transfer much of its benefit to customers through lower prices. Rapid revenue growth may require equally rapid spending on compute, integration, sales, compliance, or capacity. A highly profitable period may be real but shorter than the period embedded in the valuation. A technically sound company may run out of financing before its economics mature.

This is why an AI weakness is only a potential opportunity. It becomes commercially relevant when it corresponds to demand with willingness to pay and can be closed at an acceptable total cost. It becomes a durable source of profit only when customers, platforms, model providers, and competitors cannot quickly replicate or appropriate the improvement. Financial-market theory adds a final consistency check: whether a hypothetical valuation requires more growth, profitability, capital efficiency, or competitive duration than the stated evidence can support.

The analysis therefore begins with an **invariant**: a constraint, demand, or causal relationship that continues to hold within a specified time horizon, scope, and set of change conditions. An invariant is not a permanent product category. Prompt libraries, retrieval architectures, model interfaces, and regulations can change. More stable propositions are conditional: a system cannot reliably act on information that it neither possesses nor can infer; an uncertain action needs observable evidence if errors are to be detected and corrected; a supplier that is easy to replace will struggle to retain economic surplus.

Invariants help identify real gaps. Financial theory adds a second question: how a valuation would price those gaps, their rate of closure, and the duration of the resulting scarcity.

## 1. Why Technical Success Does Not Guarantee Durable Financial Value

Financial analysis must keep five objects separate.

**Technical capability** asks what a model or system can accomplish under specified conditions. **Customer value** asks whether that capability changes an outcome for which a user will pay. **Supplier economics** ask how much of that value becomes revenue and operating profit after delivery costs. **Free cash flow** asks what remains after the reinvestment needed to sustain growth and advantage. **Market valuation** discounts an uncertain distribution of those future cash flows at a rate affected by interest rates, risk premia, and financing conditions.

The distinctions matter because growth is not sufficient for value creation. Growth creates value when incremental investment earns returns above the relevant cost of capital. A company can expand revenue while destroying value if it must spend too much to acquire customers, customize deployments, finance infrastructure, or defend a fading advantage. Conversely, a company may temporarily report modest cash flow because it is reinvesting at unusually attractive rates. The financial task is to distinguish the two.

The price of a high-growth AI company generally reflects a joint hypothesis about at least four variables:

1. the eventual scale of demand;
2. the share of that demand the company will capture;
3. the margin and reinvestment burden at maturity;
4. the period during which returns on capital remain above competitive levels.

These variables cannot be inferred uniquely from price. Many combinations can produce the same valuation. A reverse valuation is therefore not a machine for discovering a market's single forecast. It is a way of exposing the combinations of growth, margin, reinvestment efficiency, discount rate, and competitive-advantage duration that would reconcile a specified hypothetical price with future cash flow.

Aswath Damodaran connects growth valuation to the **competitive advantage period**: the span during which a firm can earn excess returns before competition pushes returns toward the cost of capital. A market-implied competitive advantage period reverses the usual process by asking how long excess returns would have to persist to support the observed value under stated assumptions ([Damodaran, “How long will high growth last?”](https://pages.stern.nyu.edu/adamodar/New_Home_Page/valquestions/highgrowthperiod.htm)). The method is valuable because AI markets often agree that demand will expand but disagree about who will retain the surplus and for how long.

This framing also prevents loose use of the word “bubble.” Five conditions that are often conflated should be distinguished:

| Condition | What it means | What it does not establish |
|---|---|---|
| High growth expectations | Investors expect rapid expansion | That the expectations are unsupported |
| High valuation | Price is large relative to current earnings or assets | That price exceeds defensible value |
| High uncertainty | The distribution of future outcomes is wide | That investors are irrational |
| Speculative price formation | Resale expectations and trading constraints influence price | That fundamentals are irrelevant |
| Evidential valuation gap | Price requires assumptions stronger or longer-lived than available evidence supports | A uniquely measurable “true value” |

A later price decline does not by itself prove that the earlier price was irrational. New information may have changed the estimated market size, discount rate, regulation, or probability of success. Equally, genuine technical progress does not prove that every price paid during the transition was reasonable.

Research offers competing mechanisms. Scheinkman and Xiong show how heterogeneous beliefs, overconfidence, and short-sale constraints can give an asset a resale-option component: buyers may pay more because they expect a more optimistic buyer later ([Scheinkman and Xiong, 2003](https://www.princeton.edu/~wxiong/papers/bubble.pdf)). Pástor and Veronesi provide an important counterweight. In their model, technological revolutions create high uncertainty about productivity and adoption; price patterns that look like bubbles ex post may emerge through rational learning and may not have been predictably exploitable ex ante ([Pástor and Veronesi, 2005/2009](https://www.nber.org/papers/w11876)). The two accounts need not be mutually exclusive. The practical implication is that high prices, disagreement, volatility, and subsequent reversals are evidence to explain—not automatic proof of a bubble.

## 2. Invariants and Two Kinds of Gap

The framework uses ten lenses. Eight describe recurring business constraints; two—adaptation and legal or supply continuity—cut across the others and test whether an advantage survives change.

| Lens | Candidate invariant | Financial transmission |
|---|---|---|
| Goals and trade-offs | Conflicting objectives require priorities and acceptance criteria | Conversion, implementation time, rework, liability |
| Information availability | Missing or unauthorized information limits reliable decisions | Coverage, delivery cost, sales friction |
| Verification and feedback | Uncertain action needs outcome evidence for correction | Error loss, retention, maintenance cost |
| Execution and coordination | Advice creates outcomes only through tools, state, permissions, and consistent rules | Deployment time, expansion revenue, support cost |
| Error consequences and responsibility | Higher-consequence errors increase the value of control, containment, and recovery | Insurance, reserves, incident loss, addressable market |
| Attention and adoption | More output does not guarantee understanding, review, or use | Utilization, churn, customer-acquisition payback |
| Resources and scaling speed | Capability expansion consumes physical and organizational capacity | Gross margin, capital needs, working capital |
| Substitution and bargaining | Easier substitution weakens value capture | Pricing, retention, terminal margins |
| Change and adaptation | Evidence and advantages remain valid only within a scope and period | Maintenance investment, advantage duration |
| Legal and supply continuity | Technical feasibility does not ensure lawful, continuous delivery | Launch timing, serviceable market, interruption risk |

The numbers attached to these factors may change without invalidating the causal relationship. Data may become easier to access without making information irrelevant. Model reliability may rise without eliminating the need to define high-consequence errors. Standardized orchestration may reduce integration costs while leaving authoritative state and execution necessary. What changes is the size of the gap, the layer in which it resides, and the supplier able to charge for closing it.

### The Business Gap

The **business gap** is the distance between what a customer requires and what a system can deliver under common constraints. It should be stated in operational terms: task, population, severe-error ceiling, latency limit, cost budget, and required coverage.

“AI is not reliable enough” is not measurable. A useful statement is: “Under a specified severe-error ceiling and total-cost budget, 70 percent of orders must be completed automatically, while the current system can safely complete 40 percent.” The gap is 30 percentage points of coverage under those conditions.

At least five sub-gaps should be separated:

- **Model capability:** the general model lacks the required competence or reliability.
- **System delivery:** the model lacks current data, tools, permissions, state, checks, or recovery.
- **Organizational adoption:** incentives, procurement, accountability, workflow, or review capacity prevent use.
- **Institutional access:** law, professional standards, or internal policy restrict the actor, purpose, market, or data flow.
- **Supply continuity:** the service cannot be maintained through model, cloud, chip, power, network, or labor disruption.

The distinction prevents model benchmarks from standing in for business performance. METR's task-completion time horizon, for example, measures success on a suite concentrated in software engineering, machine learning, and cybersecurity. METR emphasizes that the tasks are unusually self-contained and clean and that a measured time horizon should not be read as equivalent automation of ordinary professional work involving tacit context, social interaction, and difficult-to-score outcomes ([METR, Task-Completion Time Horizons](https://metr.org/time-horizons/)). Fixed technical-task progress is real evidence, but its scope must be preserved.

Two denominators should consequently be tracked. A **fixed task set** shows whether capability improves on unchanged work. A **current business task set** changes as customers delegate harder cases, raise standards, and seek end-to-end execution. Model performance can improve rapidly on the first while the operational gap persists or expands on the second.

### The Pricing-Expectation Gap

The **pricing-expectation gap** is the distance between the growth, profitability, reinvestment efficiency, and advantage duration embedded in a price and the range supported by current evidence. Unlike a measured business shortfall, it is not a known scalar. Future cash flow and an appropriate discount rate are uncertain, and multiple assumption sets can justify the same price.

The concept nevertheless generates sharper questions than a simple price-to-earnings comparison:

- If the business gap is closing, has the price already incorporated the likely improvement?
- If models reduce delivery costs, do they also reduce competitors' entry costs?
- If customer value expands, does the supplier's share of that value rise or fall?
- If a product remains useful, how many years of superior margins does the price require?
- If advantage lasts long enough operationally, can the firm finance the reinvestment needed to reach positive free cash flow?

Business-gap closure and pricing-gap closure are parallel, not sequential, questions. A company may close an important customer gap and still be a poor investment because the achievement was fully priced. Another may face genuine execution risk yet offer attractive expected returns because the price assumes little success. The framework does not replace valuation; it improves the causal assumptions that valuation uses.

## 3. Scarcity Migrates—and Capital Changes What It Finances

A gap creates economic value only while the ability to close it remains scarce. Scarcity is dynamic because model progress, standards, organizational learning, and capital formation alter supply.

Four states are useful:

| Gap movement | Operational interpretation | Financial question |
|---|---|---|
| Rapidly converging | General models or platforms absorb the problem | Can investment be recovered before differentiation disappears? |
| Slowly converging | Integration, physical deployment, or institutional change governs the pace | Can delivery be standardized without destroying margins? |
| Expanding | Task volume, complexity, or standards rise faster than capability | Is the widening problem economically solvable? |
| Transferring | One constraint eases and another becomes binding | Does the company control the next scarce complement? |

Gap velocity must be compared with delivery velocity. A firm that needs 18 months to implement a solution to a gap being halved every six months can diagnose the problem correctly and still arrive too late. A firm addressing a slowly changing institutional or physical bottleneck may retain scarcity longer, but its deployment cost can consume the benefit.

Capital creates another feedback loop:

**shortage and high profit → capital entry → capacity expansion and competition → reduced shortage → weaker pricing power.**

This is not limited to one AI business model. It can operate in accelerators, data centers, power infrastructure, model development, application software, workflow integration, and specialist labor. The engineering details differ, but the financial mechanism is similar: high expected returns attract supply, and supply changes the return opportunity.

An analyst can therefore identify the correct bottleneck and still misjudge the durability of supplier profit. The missing step is supply elasticity: how much capacity can competitors, customers, or adjacent platforms add; how long does it take; how much capital is required; and does expansion create a new bottleneck elsewhere? Scarcity may migrate from compute to power, from model access to customer distribution, or from prompt formulation to authoritative context and workflow integration.

Three hypothetical categories illustrate the mechanism without referring to identifiable firms or current market conditions.

First, consider a **prompt-library business**. Better instruction-following reduces the scarcity of basic prompt construction. The business may respond by adding creator identity, reputation, persistent user state, or distribution. This is a migration hypothesis: it succeeds only if the new complement is harder to reproduce and improves retention or willingness to pay. If users can move their prompts, histories, and creator relationships at low cost, the necessary discovery function may persist without durable supplier profit.

Second, consider a **workflow-integration provider** connecting an AI system to order, inventory, and customer-service applications. Better models can increase the number of workflows worth automating, raising demand for integration. The same progress can make workflow construction, routing, or tool use easier to standardize. Scarcity may therefore migrate toward connector reliability, authoritative state, permissions, governance, and recovery from upstream change. The function remains necessary, but the source of differentiation changes.

Third, consider a **warehouse-equipment provider** adding learned perception and planning to physical systems. The model may reduce programming effort while leaving actuator reliability, site integration, safety validation, uptime, maintenance travel, and recovery as binding constraints. Capital directed at the visible model bottleneck could expand model supply quickly while the operational bottleneck moves to field service or hardware reliability.

Across these constructed cases, the analytical question is whether capital expands gap-closing capacity faster than demand expands, and whether the supplier still controls the scarce complement after adjustment.

## 4. The Pricing of Durability: Three Mismatches and Two Bubble Mechanisms

The most consequential valuation error is often not the direction of technological change but its timing. Three duration mismatches deserve separate analysis.

### Delivery Time Versus Gap-Convergence Time

A product may solve a real problem but require long integration, procurement, data preparation, validation, and organizational change. If a general model or standard platform closes much of the same gap before deployment finishes, the customer receives less incremental value than expected. Sales cycles lengthen, price falls, and sunk implementation work earns a poor return.

The relevant comparison is not simply product quality against today's baseline. It is the supplier's rate of delivery against the baseline's expected rate of improvement. Evidence that would reduce this concern includes falling deployment time, persistent incremental performance after model replacement, and customers expanding use despite access to stronger standard alternatives.

### Advantage Duration Versus the Duration Implied by Price

A company may possess genuine differentiation for three years while an illustrative valuation requires ten or fifteen years of superior margins and returns on capital. The business thesis can be correct while the financial-value thesis is internally inconsistent.

Reverse discounted-cash-flow analysis exposes this mismatch. Start from enterprise or equity value, specify a discount rate and mature-state economics, then solve for combinations of revenue growth, operating margin, reinvestment, and excess-return duration consistent with the price. The result is not unique. Its purpose is to reveal how demanding the joint assumptions are and which operating evidence should be monitored.

A useful reverse valuation should vary at least:

- revenue growth and eventual market size;
- mature operating margin;
- sales-to-capital ratio or another reinvestment-efficiency measure;
- cost of capital and terminal growth;
- the period before returns on new capital converge toward competitive levels.

If a valuation remains defensible across conservative combinations, concern falls. If it works only when high growth, peak margins, low reinvestment, and a long advantage period occur simultaneously, the evidential pricing gap is larger. A single multiple cannot show this interaction.

### Funding Runway Versus Cash-Flow Realization

A technology path may be viable in the long run while a particular company cannot finance the journey. Training, inference, deployment staff, hardware inventory, manufacturing capacity, regulatory work, and customer acquisition can create long periods of negative cash flow. Higher interest rates, wider risk premia, or closed funding markets can force dilution, retrenchment, or failure before the product matures.

This mismatch matters most for capital-intensive or low-margin intermediaries. A firm may demonstrate demand and still lack bargaining power over upstream suppliers or customers. Financial resilience—cash, debt maturity, committed capacity, working capital, and access to lawful substitutes—is therefore part of the technology thesis.

### How a Bubble Can Form

The first mechanism is **duration extrapolation**. Investors observe a real shortage and real high returns, but treat them as persistent while underestimating competitive entry and capacity expansion. Capital then helps eliminate the scarcity on which the valuation depends. The causal error is not believing in demand; it is assigning too long a competitive-advantage period or too high a retained margin.

The second mechanism is **price formation under disagreement and trading constraints**. If optimistic investors can buy more easily than skeptical investors can short, prices may include value associated with resale to a more optimistic future buyer, as in Scheinkman and Xiong's model. Market attention, issuance, volatility, and trading volume can then interact with fundamentals. This theoretical mechanism should not be inferred merely from volatility; the relevant constraints and disagreement would have to be demonstrated.

Competitive explanations must remain open. Under Pástor and Veronesi's account, the productivity of a new technology is initially uncertain and learned over time. Fast adoption can increase systematic uncertainty, producing price patterns that appear bubble-like in hindsight without offering an obvious ex ante arbitrage. Changes in interest rates and risk premia can also move valuations even if operating forecasts are unchanged. A careful analysis therefore separates deteriorating fundamentals, a higher discount rate, revised uncertainty, financing stress, and speculative resale dynamics.

### A Hypothetical Teaching Case: Aster Systems

Consider **Aster Systems**, a wholly fictional provider of AI-assisted order classification and inventory synchronization for online retailers. The example is constructed solely to illustrate the method and does not represent an actual company, transaction, monitoring arrangement, employer, or client.

At the start of the example, retailers require 80 percent of routine orders to pass without manual intervention while severe routing errors remain below a fixed tolerance. Aster safely covers 50 percent. Its product combines a general model with customer-approved product data, deterministic inventory checks, exception routing, and a human-review queue. The initial business gap is therefore 30 percentage points under the stated constraints.

Suppose implementation takes twelve months. During that period, stronger general models lift the unmodified baseline from 50 to 68 percent. Aster's completed system reaches 78 percent. The product has improved in absolute terms, but its incremental coverage at delivery is ten points rather than the 28 points suggested by comparison with the original baseline. This is the first duration mismatch: deployment time consumed part of the scarcity.

Now introduce a purely illustrative reverse valuation. Assume a hypothetical valuation can be reconciled with one combination in which Aster multiplies recurring revenue sixfold over six years, reaches a 25 percent operating margin, reinvests efficiently, and earns excess returns for a further decade. This is not a valuation result or recommendation. It is a set of assumptions selected to show how reverse analysis works.

Each assumption must be translated back into evidence:

- Sixfold revenue requires a sufficiently large serviceable market, falling deployment time, and sustained customer adoption.
- A 25 percent margin requires model, review, support, and connector-maintenance costs to grow more slowly than revenue.
- High reinvestment efficiency requires new customers and workflows to be added without repeating most integration work.
- A decade of excess returns requires Aster's evidence, state, workflow position, or distribution to resist model improvements and platform bundling.

Suppose Aster's reliability improves and review hours fall, but a standard commerce platform introduces equivalent inventory checks in year three. Aster still provides customer value, yet its standalone price and advantage period may decline. Alternatively, suppose the platform feature does not reduce Aster's retention or pricing because customers value its cross-platform state and recovery capability. That evidence would weaken the substitution concern.

Finally, suppose Aster must fund implementation staff and model costs for four years before producing positive free cash flow. If its financing capacity lasts only two years, a technically viable path is not enough. This is the third mismatch: cash-flow realization arrives after financial runway expires.

The teaching case does not answer whether any real asset is overvalued. It shows how the two gaps interact. The business gap asks whether Aster closes the retailer's operational shortfall. The pricing-expectation gap asks whether a stated valuation depends on a larger, more profitable, or longer-lived outcome than the hypothetical evidence supports.

## 5. From Engineering Constraints to Cash Flow

Engineering analysis becomes financially meaningful when its transmission is explicit. The following map connects recurring AI constraints with operating and valuation variables.

| Engineering or institutional issue | Operational result | Financial consequence |
|---|---|---|
| Missing information or unclear goals | Rework, low coverage, delayed acceptance | Longer implementation, lower conversion, higher delivery cost |
| Rejection and human review | Queues, expert bottlenecks, delayed service | Lower gross margin, capacity limits, working-capital pressure |
| Correlated errors | Batch incidents and larger exposure | Losses, reserves, insurance, churn, higher cost of capital |
| State and system integration | Reliable execution or repeated failures | Retention and expansion versus support and maintenance cost |
| Model upgrades and standards | Better baseline and easier substitution | Lower prices, shorter differentiation period |
| Data drift and feedback | Performance persistence or decay | Maintenance spending, renewal rates, customer lifetime value |
| Law and institutional permission | Allowed, delayed, or prohibited deployment | Serviceable market, launch date, compliance cost |
| Supply concentration | Interruption and costly migration | Revenue discontinuity, inventory and redundancy cost |

### Reliability, Coverage, and Human Capacity

Average accuracy is inadequate because it hides coverage, rejection, escalation, and correlated error. A system can improve measured accuracy by refusing more work. Another can increase automation by taking more risk. The business objective is better stated as: maximize correct automated coverage subject to a severe-error ceiling, latency limit, human-capacity constraint, and total-cost budget.

Selective prediction formalizes the trade-off between risk and coverage, but statistical guarantees must be described narrowly. Conformal methods, for example, can provide specified coverage or risk guarantees under assumptions concerning calibration data, exchangeability, and the defined loss. They do not make an arbitrary free-form answer correct, guarantee equal performance for every subgroup, or automatically control the risk of a production-selected subset ([Angelopoulos et al., “Conformal Risk Control”](https://research.google/pubs/conformal-risk-control/)). The financial relevance lies in whether a control expands profitable, insurable coverage—not in the label attached to the method.

Correlation changes tail risk even when average error is unchanged. If 1,000 actions each have a one percent independent failure probability, expected errors equal ten. If a one percent common fault causes all 1,000 actions to fail together, expected errors are still ten, but exposure is concentrated. Loss becomes nonlinear only when an additional propagation mechanism exists: downstream automation consumes the error, liquidity is depleted, capacity is overwhelmed, or detection is delayed. The system should therefore measure affected customers and actions, exposure before detection, containment time, and recovery cost.

Multiple agents that share a model, retrieved source, or false premise do not provide independent verification merely by agreeing. Repeated sampling may reduce random variance while leaving common-mode error intact. Independent data, deterministic checks, or contact with the actual system of record may add more assurance than another model vote.

Human review is also a capacity constraint, not a safety incantation. The load is approximately:

**task arrival volume × escalation rate × effective review time per task.**

If volume rises from 1,000 to 3,000 tasks per hour while escalation falls from 20 to 10 percent, review demand rises from 200 to 300 tasks. If capacity is 250, backlog grows despite a better escalation rate. Remaining cases may also be harder because the model has removed simple work. Financially, this affects service capacity, gross margin, response time, and liability. Random audits of automatically released cases are needed because reviewing only model-flagged cases cannot reveal failures the model does not recognize.

Evidence that would weaken these concerns is equally clear: automated coverage rises, severe errors fall, total review hours decline, queue times remain stable under volume growth, and the improvement persists with stronger base models. If those conditions hold, the expected review bottleneck and associated margin pressure should be revised downward.

### Execution, State, and Multi-Agent Economics

Advice creates value only when it produces a correct state change. Enterprise execution requires authenticated tools, authoritative state, permissions, idempotency, logs, exception handling, and recovery. These capabilities can increase retention and expansion by embedding a product in customer workflows. They can also create continuing connector maintenance, support, and compliance costs.

Multi-agent systems intensify both sides. Parallel agents can improve research or decomposable work, but tightly coupled workflows create handoffs, duplicated actions, and inconsistent state. Anthropic reported that its own multi-agent research system consumed far more tokens than ordinary chat interactions and was less suitable for tightly coupled tasks, but those are observations about a particular architecture rather than a universal scaling law ([Anthropic, “How We Built Our Multi-Agent Research System”](https://www.anthropic.com/engineering/multi-agent-research-system)).

The durable asset is not “having agents.” It is reliable coordination around goals, permissions, provenance, and authoritative state. Existing databases, workflow engines, and identity systems may supply much of it. An independent application deserves a valuation premium only if it creates measurable incremental outcomes and survives platform integration. If platform bundling does not reduce its retention, pricing, or expansion revenue, the substitution-risk thesis should be revised rather than defended dogmatically.

### When Data Advantages Decay—and How Updating Can Extend Them

Data do not have a universal half-life. Stable product specifications can remain useful for years; fraud patterns, sanctions lists, prices, preferences, interfaces, and regulations may change quickly. At least four changes should be separated: input distribution, the relationship between input and outcome, business objectives, and surrounding rules or permissions.

A data advantage exists only when data are relevant, lawfully usable, difficult to reproduce, tied to reliable outcomes, and incorporated into the product before they become stale. A large store of interactions without outcome labels may be operational exhaust rather than a moat. A smaller flow of timely, independently verified results may be more valuable.

The update loop is:

**capture real outcomes → detect change → verify the cause → update evaluation → propose an intervention → test independently → release narrowly → monitor and recover.**

Its value can be observed through detection latency, verification quality, recovery time, recurrence, maintenance cost, and renewal or expansion outcomes. Production feedback must not automatically become truth. Recursive learning from model-generated data can degrade performance when generated data displace the original distribution, although this does not establish that synthetic data are universally harmful ([Shumailov et al., Nature, 2024](https://www.nature.com/articles/s41586-024-07566-y)).

Financially, an effective loop can lengthen customer lifetime and competitive duration. An expensive loop that merely keeps performance from deteriorating may instead represent maintenance capital. Ownership also matters: the customer may own the data, restrict cross-customer reuse, or demand portability. Processing data does not guarantee control of the resulting surplus.

### Legal Access and Supply Continuity

Technical feasibility, legal permissibility, continuous supply, and commercial viability are separate gates. Legal analysis must be indexed to actor, intended purpose, market, data flow, product version, and date.

The method requires the analyst to distinguish rules already in force from rules that have been enacted but are not yet applicable, policy proposals, formal guidance, and predictions about future policy. A requirement in one jurisdiction cannot be generalized to another, and a legal conclusion for one actor or intended use may not transfer to another. Current legal status should be checked against authoritative sources for the relevant date; this essay does not perform that legal analysis.

Prohibited conduct cannot be converted into an acceptable business case merely by subtracting an expected fine. Compliance evidence also expires outside the system, purpose, version, and period it covers. A model replacement or new data flow may require renewed work.

Geopolitical analysis should follow a causal chain:

**policy or event change → affected dependency → business consequence → lawful available substitute → switching cost and recovery time.**

In a hypothetical supply scenario, a policy change restricts access to a component used by several nominally independent providers. The first-order effect is not simply “higher geopolitical risk.” The analysis should identify the shared dependency, the services affected, the lawful substitutes available to the relevant business, the work needed to qualify them, and the time during which service or revenue could be interrupted. No probability should be invented where evidence is absent.

For cash flow, the questions are concrete: what revenue becomes unlawful or unavailable; how long launch is delayed; what compliance and redesign cost is added; whether a lawful substitute exists; and how long migration interrupts service. Multiple vendors do not diversify risk when they share chips, foundries, packaging, power, networks, identity infrastructure, or model APIs.

## 6. How to Test the Thesis Without Manufacturing Precision

Methods should be assigned to the questions they can answer. Three meanings of “factor” must first be kept separate.

| Factor type | Examples | Purpose |
|---|---|---|
| Mechanism dimension | Information, verification, substitution, legal access | Explain why value forms or fails |
| Observable indicator | Retention, review cost, deployment time, gross margin | Measure manifestations of the mechanism |
| Statistical factor | A common component extracted from correlated indicators | Summarize variation and reduce redundancy |

Principal component analysis operates on the second layer to explore the third. It identifies linear combinations that explain sample variance; it does not discover causal mechanisms or prove an invariant. A low-variance legal constraint can determine whether a business exists even if PCA assigns it little importance. Statistical orthogonality is not economic independence, and a historical component may not remain stable after a regime change. Hand-scoring ten concepts and applying PCA would often create false precision. A standard methodological review provides the statistical foundation and cautions for interpretation ([Jolliffe and Cadima, 2016](https://doi.org/10.1098/rsta.2015.0202)).

Where comparable observations exist across firms or periods, PCA or factor analysis may help identify whether customer growth, retention, and usage depth largely move with an “adoption” component, or whether financing conditions, attention, and valuation multiples share a “capital heat” component. It should not be used to subtract one component from another and declare the result a bubble index without a defensible economic model, stable measurement, and out-of-sample evidence.

| Method | Comparison and observation | What supports the claim | What it cannot prove |
|---|---|---|---|
| A/B or paired comparison | System with and without a mechanism; observe final outcomes, total cost, severe errors, and review load | Better outcomes within risk and capacity limits | Long-term moat or rare-event safety |
| Ablation | Remove data, routing, state, or verification | Outcome deterioration identifies a contributing component | That rivals cannot copy it |
| Cross-time and cross-model test | Evaluate on later data and stronger or cheaper models | Incremental value persists through change | Permanent advantage |
| Stress and fault test | Introduce stale data, shared-source error, tool failure, or overload | Exposure is contained and recovery is fast | Real incident probability without a frequency model |
| Substitution and migration test | Replace with a platform or competing supplier | Meaningful outcome loss or high lawful switching cost | Value capture if customers refuse to pay |
| PCA or factor analysis | Examine common variation across comparable indicators | A stable, interpretable component aids evidence organization | Causality, invariance, or bubble status |
| Reverse DCF and scenarios | Vary growth, margin, reinvestment, discount rate, and duration | Price is defensible across plausible combinations | A unique market forecast or certain intrinsic value |

A useful validation hierarchy is:

**effect evidence → mechanism evidence → temporal evidence → substitution evidence → value-capture evidence → price consistency.**

The first shows that something works. The second explains why. The third tests persistence. The fourth tests scarcity. The fifth asks whether the supplier receives the benefit. The sixth asks whether an illustrative valuation assumes more than the evidence supports.

Rare severe incidents require historical replay, independent audit, exposure limits, and common-mode fault tests in addition to ordinary experiments. Not observing an accident in a short test does not establish that the risk disappeared. Conversely, stress tests reveal possible failure modes but cannot estimate real-world frequency without a representative occurrence model.

## 7. How the Framework Checks Assumption Consistency

A disciplined framework must specify evidence that would change its conclusion. It should not begin with “AI is a bubble” and search only for confirming examples. Nor should it convert a conceptual inconsistency into a view about an identifiable security or present market conditions.

### Patterns That Weaken Assumption Consistency

In a hypothetical valuation exercise, confidence in the stated assumptions should fall when several conditions appear together:

- Valuation requires high growth, high margins, low reinvestment, and a long advantage period simultaneously.
- Customer adoption is broad in trials but shallow in paid, recurring, outcome-producing workflows.
- Revenue depends on customers whose own AI economics remain unproven or financing-dependent.
- Capacity and competitive entry are growing faster than end demand, weakening scarcity.
- Model progress reduces both customer cost and supplier differentiation.
- Human review, integration, or incident costs are omitted from reported automation economics.
- Financing must remain unusually abundant until distant cash-flow realization.
- A valuation remains supportable only by combining optimistic assumptions about growth, margins, capital efficiency, and duration rather than testing them jointly.

No single item proves a bubble. Together they indicate that the gap between operational evidence and the assumptions required by the illustrative valuation is widening.

### Patterns That Strengthen Assumption Consistency

Confidence in the hypothetical assumptions should rise when:

- Reliable automated coverage rises while severe errors and total human-review cost decline.
- Customers renew, expand, and accept pricing even after stronger standard models and bundled platform features become available.
- Gross margin and free cash flow remain resilient as competitors add capacity.
- Returns on incremental invested capital remain above the cost of capital rather than being sustained only by accounting growth.
- Deployment time falls faster than the targeted gap converges.
- Data and feedback advantages remain effective on later, untouched periods and across model changes.
- Supply dependencies diversify at the upstream level and lawful switching time falls.
- Realized profits and cash flow catch up with the combinations implied by reverse valuation.

This evidence would require a skeptical durability thesis to be revised. The purpose is to test internal consistency, not to classify a current sector or security.

### The Full Financial Chain

A customer-level model can begin with:

**Customer net benefit ≈ volume × eligible coverage × [success probability × benefit − failure probability × loss − variable cost] − fixed implementation cost.**

The analysis must then continue:

**customer net benefit → supplier's attainable price → supplier revenue − delivery and operating cost → reinvestment need → free cash flow → an illustrative discounted valuation.**

Some harms should remain constraints rather than monetized losses. Prohibited conduct, rights violations, or unacceptable safety exposure cannot be justified by expected profit. Tail risk should separately examine incident probability where estimable, maximum exposure before containment, recovery time, and whether recovery competes for the same scarce staff or infrastructure needed for normal operations.

For analytical purposes, the most internally coherent value-creation hypotheses are those in which:

- the underlying demand or constraint persists over the relevant horizon;
- the business gap is concrete and economically closeable;
- delivery improves outcomes within real reliability and review limits;
- the advantage survives plausible model, competitive, and environmental changes;
- legal access and supply continuity are credible;
- the supplier retains a meaningful share of customer value;
- capital requirements do not outrun financing capacity; and
- the illustrative valuation does not require a stronger or longer-lived outcome than the evidence supports.

The durable insight is not that AI will always make mistakes, integration will always be difficult, or proprietary data will always win. Those claims freeze today's bottlenecks. The more defensible invariants are relationships: missing information constrains judgment; uncertain action requires outcome evidence; execution requires authoritative state and permissions; correlated error changes exposure; human attention is finite; capacity expansion consumes resources; easy substitution weakens value capture; evidence and compliance claims expire outside their scope; and technical feasibility does not guarantee lawful, continuous supply.

These relationships produce business gaps, but the gaps move. Financial-market theory asks how that movement should be represented in valuation assumptions. A capability gap may close while a review or integration gap expands. A real scarcity may attract enough capital to destroy its own excess return. A useful product may be copied. An enduring function may yield no independent profit. Even a highly profitable hypothetical supplier can be assigned an advantage period longer than the competitive evidence permits.

The correct unit of judgment is therefore a time-bounded, falsifiable chain: what requirement persists; what prevents it from being met; how quickly the distance is changing; who can close it; what the customer would pay; what the supplier could retain after reinvestment; how long excess returns could survive; and what combination of those assumptions an illustrative valuation requires.

Invariants explain the constraint. Business gaps identify the possible source of value. Valuation theory assigns a duration and financial consequence to its scarcity. The method tests whether the assumed business outcome, supplier economics, funding path, and competitive period can coexist without making a claim about a current security or market.

## Key References

- Damodaran, Aswath. [“How Long Will High Growth Last?”](https://pages.stern.nyu.edu/adamodar/New_Home_Page/valquestions/highgrowthperiod.htm).
- Scheinkman, José A., and Wei Xiong. [“Overconfidence and Speculative Bubbles”](https://www.princeton.edu/~wxiong/papers/bubble.pdf), *Journal of Political Economy*, 2003.
- Pástor, Ľuboš, and Pietro Veronesi. [“Technological Revolutions and Stock Prices”](https://www.nber.org/papers/w11876), NBER Working Paper 11876; later published in the *American Economic Review*.
- METR. [Task-Completion Time Horizons of Frontier AI Models](https://metr.org/time-horizons/).
- Angelopoulos, Anastasios N., et al. [“Conformal Risk Control”](https://research.google/pubs/conformal-risk-control/), ICLR 2024.
- Jolliffe, Ian T., and Jorge Cadima. [“Principal Component Analysis: A Review and Recent Developments”](https://doi.org/10.1098/rsta.2015.0202), *Philosophical Transactions of the Royal Society A*, 2016.
- Shumailov, Ilia, et al. [“AI Models Collapse When Trained on Recursively Generated Data”](https://www.nature.com/articles/s41586-024-07566-y), *Nature*, 2024.
- Anthropic. [“How We Built Our Multi-Agent Research System”](https://www.anthropic.com/engineering/multi-agent-research-system).

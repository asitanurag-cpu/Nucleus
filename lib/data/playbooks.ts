import { Playbook } from "../types";

export const playbooks: Playbook[] = [
  {
    id: "pb-1",
    slug: "pitch-deck-guide",
    title: "How to Build a Pitch Deck That European VCs Actually Read",
    description: "Structure, common mistakes, and European-specific considerations including regulatory slides and market sizing for fragmented markets.",
    topic_tags: ["Fundraising", "Pitch Deck", "Strategy"],
    reading_time_minutes: 15,
    content: `## Introduction

Most pitch deck advice originates from Silicon Valley. While the fundamentals of storytelling and clarity are universal, European fundraising has distinct nuances that founders must understand. This guide is built from reviewing 100+ pitch decks across European deep-tech, SaaS, and climate-tech verticals.

## The Optimal Deck Structure

European VCs typically expect 12–15 slides. Here is the structure that consistently performs well:

### Slide 1: Title Slide
Company name, one-line description, and your ask. Keep it clean.

### Slide 2: The Problem
Define the problem with specificity. European VCs are allergic to vague statements. Quantify the pain point with real data.

### Slide 3: The Solution
Your product in clear, jargon-free language. Include a screenshot or architecture diagram where appropriate.

### Slide 4: Why Now
Market timing evidence. Regulatory changes (GDPR, EU AI Act, NIS2), technology inflection points, or behavioral shifts that create the window.

### Slide 5: Market Size
This is where European decks often fail. Do NOT use top-down TAM/SAM/SOM with arbitrary percentages. Build bottom-up: number of target customers × average contract value × expansion potential.

### Slide 6: Business Model
How you charge, your pricing tiers, and unit economics if available. European VCs appreciate capital efficiency narratives more than US VCs.

### Slide 7: Traction
Metrics that matter for your stage. Pre-seed: design partners, LOIs, waitlist. Seed: revenue, growth rate, retention. Series A: ARR, NDR, CAC/LTV.

### Slide 8: Competitive Landscape
Use a 2x2 matrix, but make it genuine. European VCs see through performative competitive analysis.

### Slide 9: Team
Founder backgrounds, relevant experience, and why this team is uniquely positioned.

### Slide 10: Go-to-Market Strategy
How you will acquire customers. European GTM is inherently cross-border, so address this directly.

### Slide 11: Financials
3-year projections with clear assumptions. Include runway analysis and path to next milestone.

### Slide 12: The Ask
Round size, use of funds, and target close date.

## European-Specific Considerations

### Regulatory Slides
If you operate in a regulated industry (fintech, healthtech, AI), include a dedicated slide on regulatory strategy. European VCs need to understand your approach to compliance across multiple jurisdictions.

### Multi-Market GTM
Europe is not one market. Address which countries you will target first and why. The "land and expand" strategy across European markets is critical.

### Currency and Valuation
Present financials in EUR. Be prepared to discuss valuation expectations — European rounds are typically valued 20–30% below equivalent US rounds.

## Common Mistakes

1. **Copy-pasting US market data**: European market dynamics are different
2. **Ignoring fragmentation**: A €50B European market across 27 regulatory regimes is different from a $50B US market
3. **Overselling the team**: European investors value substance over credential signalling
4. **No ask slide**: Always be clear about what you need
5. **Deck too long**: 15 slides maximum, detailed appendix is fine`,
  },
  {
    id: "pb-2",
    slug: "fundraising-process",
    title: "The European Fundraising Process: A Step-by-Step Guide",
    description: "From pre-seed to Series A, covering timelines, expectations, and how European rounds differ from US rounds.",
    topic_tags: ["Fundraising", "Process", "Strategy"],
    reading_time_minutes: 20,
    content: `## Introduction

European fundraising operates differently from the US. Timelines are longer, processes are more structured, and cross-border dynamics add complexity. This guide walks through each stage based on direct experience running a $20M+ Series A end-to-end.

## Pre-Fundraising Preparation (4–8 Weeks Before)

### Build Your Target List
Research European VCs systematically. Create a tiered list: Tier 1 (dream investors), Tier 2 (strong fit), Tier 3 (backup options). Use Nucleus's VC Landscape Map to filter by stage, sector, and geography.

### Prepare Your Materials
- Pitch deck (12–15 slides)
- Financial model (3-year projection with clear assumptions)
- One-pager (for warm introductions)
- Data room (corporate docs, customer references, technical documentation)

### Warm Introductions
European VC is relationship-driven. Cold emails have a 2–5% response rate. Warm intros through portfolio founders, angels, or mutual connections convert at 30–50%.

## The Fundraising Timeline

### Pre-Seed (€250K–€1M)
- **Timeline**: 4–8 weeks
- **Process**: Often angel-led or micro-VC. Less formal diligence.
- **Key players**: Angel syndicates, pre-seed funds (Antler, Seedcamp, firstminute)

### Seed (€1M–€4M)
- **Timeline**: 6–12 weeks
- **Process**: Lead investor identification is critical. Expect 2–3 partner meetings.
- **Key players**: Seed specialists (Cherry Ventures, Peak Capital, Stride.VC)

### Series A (€5M–€20M)
- **Timeline**: 8–16 weeks
- **Process**: Full diligence including customer calls, technical review, financial audit
- **Key players**: Multi-stage funds (Atomico, Balderton, EQT Ventures, Index)

## The Process Step by Step

### Step 1: First Meeting
Usually a 30-minute video call with an associate or principal. They evaluate: problem understanding, market size, team quality, and traction.

### Step 2: Partner Meeting
If the first meeting goes well, you meet a partner. This is where the real evaluation happens.

### Step 3: Diligence
European diligence is thorough. Expect: customer reference calls (3–5), technical review, financial model scrutiny, market analysis, and legal review.

### Step 4: Investment Committee
The partner presents your case to their IC. Ensure your champion partner has all the ammunition they need.

### Step 5: Term Sheet
European term sheets are generally founder-friendly but include provisions uncommon in US deals: drag-along rights, anti-dilution protection, and board observer seats.

### Step 6: Legal and Close
Expect 4–6 weeks from term sheet to close. European legal processes involve multiple jurisdictions.

## How European Rounds Differ from US Rounds

1. **Valuations**: 20–30% lower than equivalent US rounds
2. **Timeline**: 2–3x longer from first meeting to close
3. **Diligence depth**: More thorough, especially on unit economics
4. **Syndication**: European rounds often have 2–3 co-investors
5. **Follow-on**: European VCs have smaller reserves, making follow-on less automatic`,
  },
  {
    id: "pb-3",
    slug: "vc-evaluation-criteria",
    title: "How VCs Evaluate Startups: An Insider's Framework",
    description: "Scoring rubrics, red flags, and what actually matters at each stage — informed by 100+ deal screenings.",
    topic_tags: ["VC", "Evaluation", "Investment"],
    reading_time_minutes: 18,
    content: `## Introduction

Having screened 100+ deep-tech and digital infrastructure opportunities, I have developed a clear framework for how institutional investors evaluate startups. This guide reveals the actual criteria used in investment decisions.

## The Evaluation Framework

### Stage 1: Initial Screen (30 seconds)
VCs see hundreds of decks per week. The initial screen is brutal:
- Is the market large enough? (€1B+ TAM for institutional VC)
- Is the team credible? (relevant domain expertise)
- Is there evidence of traction? (any signal of product-market pull)

### Stage 2: Deep Dive (2–4 hours)

**1. Market (25% weight)**
- Market size and growth rate
- Timing: Why now?
- Regulatory tailwinds or headwinds
- Competitive intensity

**2. Team (30% weight)**
- Founder-market fit: Why is THIS team building THIS product?
- Technical depth: Can they actually build what they claim?
- Execution evidence: What have they shipped?
- Resilience signals: Have they navigated adversity?

**3. Product (20% weight)**
- Technical differentiation and defensibility
- Product-market fit evidence
- Technical architecture scalability

**4. Business Model (15% weight)**
- Unit economics (even if early-stage projections)
- Pricing strategy and willingness to pay
- Path to profitability

**5. Deal Dynamics (10% weight)**
- Valuation reasonableness
- Cap table cleanliness
- Round structure and syndicate quality

## Red Flags That Kill Deals

1. **Founder conflict**: Any sign of co-founder tension
2. **Inflated metrics**: Presenting GMV as revenue
3. **No customer evidence**: Even at seed, LOIs matter
4. **Cap table issues**: Dead equity, excessive advisor shares
5. **Market delusion**: Claiming niche markets are €50B opportunities
6. **Technical risk denial**: Not acknowledging genuine challenges

## What Changes by Stage

### Pre-Seed
- 90% team, 10% idea
- Looking for: exceptional founders with a credible insight

### Seed
- 50% team, 30% product, 20% market
- Looking for: early product with initial customer signal

### Series A
- 30% team, 30% product, 30% traction, 10% market
- Required: €500K–€2M ARR with strong growth and retention`,
  },
  {
    id: "pb-4",
    slug: "cross-border-fundraising",
    title: "Navigating Cross-Border Fundraising in Europe",
    description: "Legal structures, holding jurisdictions, and working with investors across European borders.",
    topic_tags: ["Legal", "Fundraising", "Cross-border"],
    reading_time_minutes: 16,
    content: `## Introduction

Europe's venture ecosystem is inherently cross-border. A Dutch founder might raise from a London-based VC, a Berlin-based angel, and a Paris-based corporate venture arm — all in the same round. This guide addresses the practical challenges.

## Choosing Your Holding Jurisdiction

### The Netherlands (Dutch BV)
- **Pros**: Flexible corporate law, strong investor protection, EU hub location, tax treaty network
- **Cons**: Higher accounting costs, complexity of Dutch GAAP
- **Best for**: B2B SaaS, deep-tech, companies targeting pan-European markets

### United Kingdom (UK Ltd)
- **Pros**: Well-understood by global VCs, SEIS/EIS tax reliefs for UK investors, Common law system
- **Cons**: Post-Brexit complexity for EU operations
- **Best for**: Companies targeting UK+US markets, fintech (FCA regulation)

### Estonia (e-Residency)
- **Pros**: Low cost, digital-first incorporation, 0% corporate tax on retained earnings
- **Cons**: Less understood by institutional VCs
- **Best for**: Very early-stage, bootstrapped companies

### Ireland
- **Pros**: EU membership, English-speaking, strong IP regime, 12.5% corporate tax
- **Best for**: US-focused European companies, companies with significant IP

## Employee Stock Options Across Europe

ESOP structures vary dramatically:
- **Netherlands**: Stock Appreciation Rights (SARs) are tax-efficient
- **Germany**: Virtual stock options (VSOPs) are standard
- **France**: BSPCE scheme offers favourable tax treatment
- **UK**: EMI options provide the best employee tax treatment globally

## Working with Cross-Border Investors

### Due Diligence Differences
- **UK VCs**: Focus on governance, board composition, financial controls
- **German VCs**: Deep technical diligence, often involve external advisors
- **Nordic VCs**: Emphasis on team dynamics and cultural fit
- **French VCs**: Thorough market analysis, interest in regulatory moats

### Term Sheet Variations
- Liquidation preferences: 1x non-participating is standard in Europe
- Anti-dilution: Broad-based weighted average is most common
- Board seats: Observer seats typical at seed, not full board seats
- Information rights: Monthly reporting standard from Series A onwards

## Common Cross-Border Mistakes

1. **Incorporating in the wrong jurisdiction**: Hard to fix post-investment
2. **Ignoring tax implications**: Founder share vesting can trigger tax events
3. **Single-market focus**: European VCs want cross-border expansion plans
4. **Underestimating legal costs**: Budget €30–50K for seed, €50–100K for Series A
5. **Neglecting local compliance**: Each country has specific requirements`,
  },
];

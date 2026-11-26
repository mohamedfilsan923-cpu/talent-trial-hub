# Talent Trial Hub
live link=https://id-preview--981dd9ca-eb5b-5673-9043-cae1afc827ef.lovable.app/?__lovable_receipt=mat_2th93cb75d81c9zzbxa2efgqrr
Build a modern, high-trust web application called "TalentSandbox" — an Employer Trial-to-Hire & Risk-Free Sandbox platform designed to help employers test skilled refugee talent through structured, co-funded 2-week paid trials (aligned with UN SDGs 8, 10, and 17).

### Design & Aesthetic

- Style: Clean, modern B2B SaaS & social-impact aesthetic (inspired by Linear, Stripe, and Gusto).

- Color Palette: Deep Slate/Navy (#0F172A) primary text, Emerald Green (#059669) for verified badges and stipend savings, Warm Amber (#D97706) for SDG highlights, and crisp off-white/slate backgrounds (#F8FAFC).

- Typography: Inter or Plus Jakarta Sans, clean cards with subtle borders, clear data visualizations, and responsive layout.

### Navigation & Pages (Single-Page App with Smooth Tabs/Views)

Include a sticky top navbar with the TalentSandbox logo, SDG 8 / 10 / 17 badges, navigation tabs ("Overview", "Stipend Calculator", "10-Day Rubric", "Candidate Sandbox"), and a primary CTA button ("Launch a 2-Week Trial").

#### 1. Hero & Value Proposition Section

- Headline: "Hire Proven Talent Without the Local-Experience Guesswork."

- Subheadline: "Test vetted refugee professionals in a structured, 10-day paid work trial—subsidized up to 80% by NGO & cohort grants. Zero onboarding friction, objective scorecards, and one-click hiring."

- Dual CTAs: "Calculate Your Trial Cost" (scrolls to calculator) and "Explore Vetted Talent" (opens talent directory).

- Impact Metrics Bar: "80% Grant Subsidy Available", "10-Day Structured Evaluation", "74% Trial-to-Hire Conversion Rate", "Aligned with SDGs 8, 10 & 17".

#### 2. Interactive Co-Funded Stipend Calculator (Core Feature 1)

Build a live, interactive calculator widget where employers can adjust:

- Role Tier (Dropdown: Junior/Associate, Mid-Level Specialist, Senior Technical/Lead)

- Hourly or Daily Stipend Rate (Slider: $15/hr – $60/hr, default $25/hr for 80 hours over 2 weeks)

- Grant / Cohort Subsidy Tier (Selector: Standard NGO Co-Fund 60%, ILO Cohort Partner Grant 80%, Full Impact Fellowship 100%)

- Real-Time Output Card:

  - Total 2-Week Trial Value (e.g., $2,000)

  - Partner Grant Coverage (highlighted in green, e.g., -$1,600)

  - Net Employer Out-of-Pocket Cost (bold, e.g., $400)

  - Cost-per-day breakdown & "Reserve Subsidized Seat" button that triggers a confirmation modal.

#### 3. Standardized 10-Day Trial Rubric & Evaluation Engine (Core Feature 2)

Create an interactive employer evaluation dashboard showing a sample active trial candidate (e.g., "Amina Hassan — Full-Stack Developer" or "Tariq Al-Mansoor — Financial Data Analyst"):

- Day 1–10 Milestone Timeline (Day 1: Onboarding & Scope, Day 3: First Deliverable Check-in, Day 7: Mid-Trial Review, Day 10: Final Demo & Sign-off).

- Interactive Bias-Free Scorecard with 1–5 star/slider ratings across 4 standardized criteria:

  1. Technical & Tool Proficiency

  2. Structured Problem-Solving

  3. Workplace Communication & Async Updates

  4. Adaptability & Deadline Reliability

- Live Weighted Readiness Score (auto-calculates percentage and readiness tier, e.g., "94% — Hire Ready").

#### 4. One-Click Conversion & Portable Scorecard (Core Feature 3)

At the bottom of the evaluation dashboard, include two distinct action cards:

- Card A ("Extend Full-Time Offer"): One-click workflow that generates an instant offer summary with pre-filled role details and zero placement fees.

- Card B ("Issue Verified Portable Scorecard"): For employers who cannot hire immediately, clicking this generates a sleek, shareable "Verified Local Experience Certificate & Portable Scorecard" modal/card with a unique verification ID, employer sign-off badge, rubric scores, and downloadable/shareable link so the candidate can prove local work experience to future employers.

#### 5. Vetted Talent Sandbox Directory

- Filterable grid of 4 realistic refugee talent profiles (with prior international credentials, verified skills, languages, and "Grant Eligible" badges) where employers can click "Start 10-Day Trial" to load that candidate into the calculator and rubric.

### Footer

Include a clean footer highlighting the public-private partnership model: "Built for the ILO Cohort Mini-Hackathon • Advancing SDG 8 (Decent Work), SDG 10 (Reduced Inequalities), and SDG 17 (Partnerships for the Goals)."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/981dd9ca-eb5b-5673-9043-cae1afc827ef).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

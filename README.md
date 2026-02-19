# Project Context

**Domain:** B2B sales scheduling tool
**Last updated:** 2026-02-18

---

# Product Vision

## One-liner
> **The scheduling layer built for complex B2B sales — so both sides of a deal show up prepared, coordinated, and ready to move.**

## Extended Vision
B2B deals don't fail because the product isn't good enough. They fail because the buying process is slow, disjointed, and full of friction that neither side knows how to fix. A rep sends a Calendly link. The client forwards it to three colleagues. The SE finds out the morning of the demo. The IT manager joins cold with no agenda. And somewhere in that chaos, momentum dies.

This product exists to eliminate that friction entirely. Not by making scheduling slightly easier — but by making multi-stakeholder B2B meetings feel effortless and professional for everyone involved: the rep who needs to bring the right internal people, the SE who deserves enough notice to prep, the buyer who wants to loop in colleagues without back-and-forth, and the late-added stakeholder who needs context before she can meaningfully evaluate.

The vision is a single coordination layer that sits across the entire sales meeting lifecycle — from first booking through rescheduling — and makes every person in the room feel like someone thought about them in advance.

---

# Product–Market Fit

## The Problem (synthesised from personas)

Current tools address one side of the problem at a time. Calendly solves 1:1 availability. Email handles communication. Slack fills the gaps. CRMs log what happened after. Nothing coordinates the full picture: two teams, multiple roles, mismatched availability, and the need for context to flow in all directions before anyone shows up.

The result is a predictable failure mode:
- **AEs** lose 30–60 mins per deal just aligning calendars, and deals go cold in the gap
- **SEs** are double-booked, under-briefed, and treated as a commodity rather than a strategic asset
- **Buyers** experience the vendor's disorganisation as a signal about the product itself
- **Late-added stakeholders** disengage or veto deals they were never properly onboarded into

This isn't a workflow inconvenience. It's a revenue problem.

## Why Existing Solutions Fall Short

| Tool | What it does | Where it fails for B2B sales |
|------|-------------|-------------------------------|
| Calendly | 1:1 or round-robin booking | No multi-person seller-side coordination; no buyer-side team invites |
| Google Calendar | Scheduling + invites | No availability logic; no context automation; no CRM link |
| Chili Piper | Inbound lead routing | Designed for SDR handoffs, not complex multi-stakeholder demos |
| Email / Slack | Ad hoc coordination | Manual, lossy, slow — the very thing causing the problem |

## The PMF Signal (by persona)

**Marcus (AE)** — willing to pay to get time back. The cost of scheduling overhead across 15–25 active deals is measurable in hours per week. Any tool that books multi-person meetings faster with less chasing is immediately valuable.

**Priya (SE)** — a champion if consulted, a blocker if ignored. SEs are the hidden swing vote in sales tool adoption. A product that gives them advance notice, client context, and control over their own calendar will earn fierce advocacy. Right now, no tool speaks to them.

**Derek (Buyer)** — the trust signal. When a vendor makes it easy to loop in his team via a single link, Derek reads it as organisational maturity. Scheduling UX directly shapes his perception of the vendor's product. This means our tool creates PMF not just for the seller — it creates value for the buyer too, which is unusual and defensible.

**Sophie (Stakeholder)** — the veto risk. She can kill a deal she barely joined. A product that auto-sends her a brief, an agenda, and context about who's attending reduces the risk of a cold technical stakeholder derailing an otherwise strong evaluation.

## Who We're For (ICP)

**Primary:** B2B SaaS companies with a solution-sales or enterprise motion — 50–500 employees, 5+ AEs, shared SE team, average deal cycles of 30–90 days.

**Secondary:** RevOps and Sales Enablement leaders at those companies who are already measuring demo-to-close rates and looking for levers.

**Not yet:** PLG companies, transactional sales, or inbound-only motions where meetings are simple and solo.

## Why Now

- The rise of buying committees: average enterprise deal now involves 6–10 stakeholders on the buyer side (Gartner, 2024)
- SEs are increasingly scarce and expensive — wasted demo capacity is a real P&L issue
- Buyers have higher expectations of vendor professionalism post-pandemic remote selling
- CRM and calendar data are now rich enough to power automated context-sharing at the point of booking

## Success Metrics (Internal)

| Metric | Target | Signal |
|--------|--------|--------|
| Time to book a multi-person meeting | < 5 min (vs. 30–60 min today) | Core efficiency win for Marcus |
| SE lead time before demo | > 24 hrs average | Quality and burnout signal for Priya |
| Buyer no-show / drop-out rate | −30% vs. baseline | Trust and engagement signal for Derek |
| Stakeholder context score (self-reported) | 4+/5 pre-call prep rating | Deal risk reduction for Sophie |
| Demo-to-next-step conversion | Measurable lift vs. control | Revenue outcome for the company |

---

# Use Cases

Use cases are written from the perspective of a specific persona in a real scenario. Priority tiers: **P0** = MVP must-have · **P1** = early release · **P2** = differentiating · **P3** = future.

---

## P0 — MVP (Core value proposition; product is worthless without these)

### UC-01 · Book a multi-person internal meeting via one link
**Persona:** Marcus (AE)
**Scenario:** Marcus is advancing a mid-market deal and needs to bring his SE and optionally a VP for a strategic demo. Today he spends 30–60 minutes checking Slack, eyeballing calendars, and firing off manual invites — all before he's confirmed a single time with the client.
**What the product does:** Marcus selects the roles he needs (e.g. SE + VP), the system checks real-time availability across all internal attendees, and generates a single booking link showing only times when everyone is free. The client picks a slot; all invites go out automatically.
**Why it matters:** Removes the primary time drain for AEs. Every minute saved here is a minute back in the sales cycle.

---

### UC-02 · SE controls her own bookable windows
**Persona:** Priya (SE)
**Scenario:** Priya supports six AEs and has no say over when she's booked. She finds out about demos with little to no notice, often the morning of.
**What the product does:** Priya configures windows when she's available for demos (e.g. Mon–Wed, 10am–3pm). AEs can only offer buyers times within those windows. She gets a notification the moment a booking is confirmed, with the meeting details and client context.
**Why it matters:** Solves Priya's core pain and turns her from a potential blocker into a product champion. SE adoption drives AE adoption.

---

### UC-03 · Buyer adds their own colleagues without back-and-forth
**Persona:** Derek (Buyer)
**Scenario:** Derek wants his IT lead and CFO on the next demo but doesn't want to coordinate two separate email threads with the vendor to make it happen.
**What the product does:** The booking confirmation includes an "Add your colleagues" link. Derek enters email addresses; each colleague receives their own personalised invite with meeting context, agenda, and their role — no vendor involvement needed.
**Why it matters:** Eliminates the most common buyer complaint. Derek reads this as vendor organisational maturity, which directly influences his trust in the product.

---

## P1 — Early Release (Needed quickly; these make the product sticky)

### UC-04 · Late-added stakeholder receives an automatic pre-call brief
**Persona:** Sophie (Stakeholder)
**Scenario:** Derek adds Sophie to a demo 48 hours before it happens. She arrives cold, googles the vendor for 5 minutes, and spends the call asking basic questions that derail the technical evaluation.
**What the product does:** The moment Sophie is added to the meeting, she automatically receives a pre-call email containing: a product one-pager, the meeting agenda, an attendee list with roles on both sides, and a note on what she's specifically being asked to evaluate.
**Why it matters:** Reduces the single biggest veto risk in enterprise deals. A prepared Sophie is an asset; an unprepared Sophie is a deal-killer.

---

### UC-05 · SE receives an automated pre-call brief from CRM data
**Persona:** Priya (SE)
**Scenario:** Priya gets booked for a demo with 24+ hours notice — progress — but still has no client context. She has to chase the AE on Slack or walk in blind.
**What the product does:** At booking confirmation, the system auto-generates a brief for Priya pulled from CRM: company name and size, deal stage, pain points discussed in discovery, key buyer stakeholders attending, and what the AE wants her to focus on in the demo.
**Why it matters:** Directly solves Priya's second-biggest pain. Turns her from reactive to prepared without requiring the AE to do extra work.

---

### UC-06 · Multi-party rescheduling without restarting the process
**Persona:** Marcus + Priya + Derek
**Scenario:** One person drops out of a five-person meeting two days before the call. Marcus currently has to go back to square one — re-checking availability, resending links, re-confirming everyone.
**What the product does:** Any attendee can trigger a reschedule request. The system automatically finds the next slot where all confirmed attendees are free, proposes it to the group for approval, and sends updated invites once accepted.
**Why it matters:** Prevents momentum death at a critical point in the deal cycle. Rescheduling friction is often where deals go quiet.

---

## P2 — Differentiation (Builds moat and stickiness after initial traction)

### UC-07 · CRM meeting log created automatically at booking
**Persona:** Marcus (AE)
**Scenario:** Marcus has to manually log every meeting in the CRM after it happens. Under pressure, he skips it or logs it days later with no detail.
**What the product does:** When a meeting is created, the system auto-generates a CRM activity record with attendees, agenda, and a post-meeting prompt to log outcome and next steps. No manual entry required.
**Why it matters:** Keeps CRM data clean without relying on AE discipline. Makes RevOps happy and gives leadership accurate pipeline visibility.

---

### UC-08 · Prep time automatically blocked in SE's calendar
**Persona:** Priya (SE)
**Scenario:** Priya gets booked for a 10am demo but has back-to-back meetings until 9:55am. She has no prep time and it shows.
**What the product does:** When Priya is booked for a demo, the system automatically blocks a configurable buffer (default: 30 minutes) before the meeting in her calendar, labelled "Prep — [Client Name]."
**Why it matters:** A small, high-impact SE quality-of-life feature. Signals that the product was built by someone who actually talked to SEs.

---

### UC-09 · AE meeting pipeline view across all active deals
**Persona:** Marcus (AE)
**Scenario:** Marcus has 15–25 active deals at any time and no clear view of which have meetings scheduled, which are awaiting client confirmation, and which have stalled in the scheduling step.
**What the product does:** A dashboard view surfaces all upcoming meetings by deal, showing attendee confirmation status, SE assignment, whether pre-call materials have been sent, and days since last meeting activity.
**Why it matters:** Gives Marcus visibility over his pipeline without having to open CRM records one by one. Flags deals at risk of going cold before they actually do.

---

## P3 — Future (High value; build after traction and validated demand)

### UC-10 · Automated no-show recovery
**Persona:** Marcus + Derek
**Scenario:** A buyer no-shows. Marcus eventually sends a follow-up email — often hours later, manually, with no booking link attached.
**What the product does:** If a meeting has fewer than the minimum confirmed attendees at start time, the system waits 10 minutes then automatically sends a recovery message to the buyer with a fresh booking link and a brief, empathetic note. Marcus is notified and can customise or suppress the message.
**Why it matters:** Recovers revenue from one of the most common deal-killers without adding manual work for the AE.

---

### UC-11 · Buying committee map built from meeting history
**Persona:** Marcus (AE)
**Scenario:** Marcus doesn't know who else is in the buying committee beyond his main contact. He finds out about influencers and blockers late — sometimes after the deal is already at risk.
**What the product does:** As buyers add colleagues to meetings over time, the system builds a visual map of the buying committee — names, roles, attendance patterns, and engagement signals (opened brief, added questions, attended on time).
**Why it matters:** Pipeline intelligence that gets smarter over time. Helps AEs navigate multi-threaded enterprise deals and spot the Sophie risk before it becomes a problem.

---

### UC-12 · Demo quality analytics for RevOps
**Persona:** RevOps / Sales leadership
**Scenario:** RevOps suspects that demos with insufficient SE lead time are converting to next steps at a lower rate, but has no data to prove it or act on it.
**What the product does:** Aggregate reporting on SE lead time, stakeholder count, context score (did everyone get a brief?), and outcome — segmented by deal size, industry, AE, or time period. Exportable and CRM-linkable.
**Why it matters:** Proves the ROI of the product internally and creates a feedback loop for continuous improvement. Turns the scheduling layer into a revenue intelligence layer.

---

## Priority Summary

| ID | Use Case | Tier | Primary Persona | Core Value |
|----|----------|------|-----------------|------------|
| UC-01 | Multi-person internal booking via one link | **P0** | Marcus | Time saved per deal |
| UC-02 | SE controls bookable availability windows | **P0** | Priya | SE adoption + quality |
| UC-03 | Buyer adds own colleagues | **P0** | Derek | Buyer trust signal |
| UC-04 | Late stakeholder auto-brief | **P1** | Sophie | Veto risk reduction |
| UC-05 | SE pre-call brief from CRM | **P1** | Priya | Demo quality |
| UC-06 | Multi-party rescheduling | **P1** | Marcus + all | Deal momentum |
| UC-07 | CRM auto-log at booking | **P2** | Marcus / RevOps | Data hygiene |
| UC-08 | SE prep time auto-block | **P2** | Priya | SE satisfaction |
| UC-09 | AE meeting pipeline view | **P2** | Marcus | Pipeline visibility |
| UC-10 | No-show recovery flow | **P3** | Marcus | Revenue recovery |
| UC-11 | Buying committee map | **P3** | Marcus | Deal intelligence |
| UC-12 | Demo quality analytics | **P3** | RevOps | ROI proof + feedback loop |

---

---

# MVP Definition

## Scope
The MVP covers the three P0 use cases only — the minimum needed for the product to deliver its core value proposition. Everything else is post-launch.

**In scope (MVP):**
- UC-01 · Multi-person internal booking via one link
- UC-02 · SE availability window management
- UC-03 · Buyer adds own colleagues via confirmation link

**Out of scope (post-MVP):**
- CRM integration (briefs will use manually entered context for now)
- Rescheduling flow (manual fallback for MVP)
- Automated pre-call briefs (P1)
- Dashboard analytics (P2+)

## User Flows

### Flow A — AE Books a Demo (UC-01)
1. AE opens app and clicks "Book a Demo"
2. Selects the deal / account name and meeting type
3. Selects roles needed: SE (required) + optional VP
4. System checks SE's available windows + AE's calendar
5. System generates a booking link showing only mutually free times
6. AE copies link and shares with buyer (email, Slack, CRM)
7. Buyer picks a slot → all invites sent automatically

### Flow B — SE Sets Availability (UC-02)
1. SE logs in and opens Availability Settings
2. Configures bookable windows per weekday (e.g. Mon–Wed, 10am–3pm)
3. Sets minimum notice required (default: 24 hrs)
4. Sets prep buffer (default: 30 min before each meeting)
5. Saves — AEs can now only book her within these windows
6. When a booking lands, SE receives instant notification with meeting details

### Flow C — Buyer Books + Adds Colleagues (UC-03)
1. Buyer opens the AE's link → sees clean booking page
2. Selects a date and available time slot
3. Enters name, email, and company (pre-filled if known)
4. Sees confirmation page with meeting summary
5. Clicks "Add your colleagues" → enters colleague email(s)
6. Colleagues receive personalised calendar invites with agenda + attendee list

## MVP Screen List

| # | Screen | Who sees it | Flow |
|---|--------|-------------|------|
| 1 | AE Dashboard | AE | Entry point |
| 2 | New Meeting — Deal & Type | AE | Flow A |
| 3 | New Meeting — Select Team | AE | Flow A |
| 4 | Booking Link Generated | AE | Flow A |
| 5 | SE Availability Settings | SE | Flow B |
| 6 | SE Upcoming Demos | SE | Flow B |
| 7 | Buyer Booking Page | Buyer (Derek) | Flow C |
| 8 | Booking Confirmation + Add Colleagues | Buyer (Derek) | Flow C |

---

## Assets Created

| File | Description | Date |
|------|-------------|------|
| `persona_marcus.png` | Marcus — Account Executive persona card (blue) | 2026-02-18 |
| `persona_priya.png` | Priya — Sales Engineer persona card (purple) | 2026-02-18 |
| `persona_derek.png` | Derek — VP Sales / Client Buyer persona card (green) | 2026-02-18 |
| `persona_sophie.png` | Sophie — IT Manager / Late Stakeholder persona card (red) | 2026-02-18 |
| `wireframes_mvp.html` | Interactive 8-screen wireframe covering all three MVP flows (AE, SE, Buyer) | 2026-02-18 |

---

# User Personas

These personas represent key users in a B2B sales scheduling context. Reference them when designing features, writing copy, or evaluating product decisions.

---

## Marcus — Account Executive

> "Getting everyone in the same room shouldn't be a full-time job. By the time we've aligned internally, the client's gone cold."

### At a Glance
| Attribute       | Detail                        |
|-----------------|-------------------------------|
| Company size    | 200–800 employees             |
| Experience      | 5–10 years                    |
| Deals active    | 15–25 at a time               |
| Avg. meetings   | 2–4 internal + 2–5 client     |
| Tools used      | CRM, Slack, Calendar          |

### Pain Points
- Back-and-forth emails to align 3+ internal calendars
- Clients go dark while awaiting a confirmed time
- No visibility into when colleagues are free
- Rescheduling chaos when someone drops out

### Goals
- Book qualified meetings faster to protect momentum
- Bring in the right people without scheduling overhead
- Look organised and responsive to clients
- Spend more time selling, less on logistics

### Scheduling Behaviours
`Shares Calendly links` · `Manually checks SE calendars` · `Uses Slack to coordinate internally` · `Sends 3+ emails before booking` · `Manually logs meetings in CRM` · `Books without confirming SE availability`

---

## Priya — Sales Engineer / SE

> "I find out about demos the morning they happen. I can't prep properly and it makes us look unprepared in front of the client."

### At a Glance
| Attribute       | Detail                        |
|-----------------|-------------------------------|
| Company size    | 200–800 employees             |
| Supports        | 4–8 AEs                       |
| Meetings/week   | 8–14 demos                    |
| Booked by       | AEs, not herself              |
| Tools used      | Calendar, Slack, Demo env     |

### Pain Points
- Gets booked without being consulted first
- No client context ahead of meetings
- Double-booked or conflicted regularly
- Prep time is squeezed or nonexistent

### Goals
- Visibility into upcoming demos with lead time
- Client context shared automatically before each call
- Control over which slots AEs can book her into
- Be seen as a strategic partner, not a resource pool

### Scheduling Behaviours
`Reactive — others book her` · `Checks Slack for last-minute pulls` · `Manually blocks prep time post-booking` · `Shares availability informally via Slack` · `Builds demo envs from verbal briefings`

---

## Derek — VP Sales (Client Buyer)

> "I need to bring my IT lead and CFO to the next call. Don't make me send you three more emails to make that happen."

### At a Glance
| Attribute          | Detail               |
|--------------------|----------------------|
| Role               | VP Sales or RevOps   |
| Company size       | 150–600 employees    |
| Decision role      | Economic buyer       |
| Brings to demos    | 1–3 colleagues       |
| Patience for friction | Very low          |

### Pain Points
- Has to forward meeting links manually to colleagues
- Scheduling friction slows down his evaluation
- Unsure who from vendor side will attend
- Can't easily reschedule with multi-stakeholder groups

### Goals
- Loop in colleagues without back-and-forth
- Know who's attending and why before showing up
- Run an efficient evaluation on his timeline
- Signal to his team he's running a tight process

### Scheduling Behaviours
`Forwards calendar invites manually` · `Relies on EA for complex scheduling` · `Prefers a single booking link for his team` · `Drops out if rescheduling is too complex` · `Appreciates confirmation emails with agenda`

---

## Sophie — IT Manager (Late Stakeholder)

> "My manager just added me to this demo. I have no idea what this product does or what I'm supposed to evaluate."

### At a Glance
| Attribute       | Detail                  |
|-----------------|-------------------------|
| Role            | IT Manager / Ops Lead   |
| Added by        | Derek (her boss)        |
| Context she has | Minimal at first        |
| Decision role   | Technical validator     |
| Influence       | Can veto a deal         |

### Pain Points
- Joins calls with no background or agenda
- Calendar invite arrives with no context about the tool
- Uncertain what her role is in the evaluation
- Asked to validate things she hasn't had time to review

### Goals
- Get a clear briefing before she joins a call
- Know exactly who will be on the vendor side
- Have her technical questions anticipated
- Contribute meaningfully without looking uninformed

### Scheduling Behaviours
`Accepts invites forwarded by manager` · `Googles the vendor before the call` · `May decline if invite looks unclear` · `Prefers prep docs in the calendar invite` · `Reschedules if notice is too short`

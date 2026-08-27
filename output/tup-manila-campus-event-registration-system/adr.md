---
title: TUP Manila Campus Event Registration System — ADR
version: 0.1
date: 2026-08-27
status: draft
source: prd.md, mvp-scope.md
---

## 1. Metadata
This ADR selects a beginner-friendly web stack that can deliver the protected student registration journey in six hours while leaving a credible path to organizer tools and realtime updates.

## 2. Context & Requirements Summary
The system serves TUP Manila students and organizers. MVP priorities are school-email access, event capacity, duplicate-safe registration, unique QR tickets, and a 24-hour cancellation rule. The five-person beginner team has an effective 18 person-hour budget. Phase 2 adds scanning, exports, announcements, and realtime tracking.

## 3. Decision Drivers
- Fast setup and approachable JavaScript for beginners.
- Auth, relational constraints, realtime subscriptions, and file storage in one service.
- Server-authoritative capacity and duplicate prevention.
- Mobile-first accessibility and low operating cost.
- A clear local development fallback for UI and API work.

## 4. Recommended Technology Stack
| Layer | Choice | Why | Alternatives considered | Tradeoff |
|---|---|---|---|---|
| Frontend framework | React 19 + Vite | familiar component model and fast dev server | Next.js, plain HTML | separate API deployment; less built-in routing |
| Styling/UI | CSS Modules or plain CSS tokens | easy to learn and keeps design tokens visible | Tailwind, component library | more manual component styling |
| State/data fetching | React state + Supabase JS | small MVP has limited client state | Redux, TanStack Query | less caching sophistication |
| Backend/API | Node.js + Express | simple protected API boundary and export home | Supabase-only, NestJS | two local processes |
| Database | Supabase Postgres | constraints, RPC transactions, RLS, Realtime | JSON file, Firebase | hosted setup and service dependency |
| Auth | Supabase Auth magic link | school-email login without password handling | custom JWT, campus SSO | exact domain and email delivery need confirmation |
| File/storage | Supabase Storage; server-generated CSV/PDF | role-protected exports and future assets | local filesystem | requires storage policies |
| Hosting/deploy | Vercel frontend + Render API + Supabase | low-friction deployment for a code camp | single VPS, Azure App Service | multiple deployment surfaces |
| Background jobs | none in MVP; Supabase Edge Function later | no scheduled work is needed for the protected path | cron worker | reminders and email are deferred |
| Critical services | QR library such as `qrcode.react`; browser scanner later | proven UI primitives reduce implementation risk | hand-built QR, native app | scanner needs camera permission testing |

## 5. System Design
React renders the student and organizer surfaces. Supabase Auth establishes the user session. Supabase Postgres stores events and registrations with RLS and a registration RPC that checks capacity and inserts under a unique `(event_id, user_id)` constraint. Express provides a stable API boundary for future exports and scanning. The QR contains only an opaque registration token.

**Registration sequence:**
1. React requests a magic link through Supabase Auth.
2. After callback, React loads published events and counts.
3. The student invokes the registration RPC with event ID and current session.
4. Postgres locks/checks the event capacity, rejects duplicates, or creates the registration and token atomically.
5. React loads the ticket and displays the QR.

**Cancellation sequence:**
1. React loads the registration and event start time.
2. The server compares current time with `starts_at - 24 hours` and checks status.
3. A confirmed eligible cancellation changes status to `cancelled`; the active ticket is rejected by future check-in logic.

## 6. Data Architecture
Use Supabase migrations for `profiles`, `events`, `registrations`, `attendance`, and `announcements`. Use enums for role, event status, registration status, and attendance result. Add unique indexes for `(event_id, user_id)`, `ticket_token`, and one attendance row per registration. RLS policies expose a student’s own registration, published events, and organizer-owned event records. Counts should be derived from active registrations or maintained by a transaction, never trusted from the client.

## 7. Long-term Engineering Decisions
- Test the capacity RPC, duplicate constraint, deadline boundary, and token invalidation first.
- Run lint, unit tests, and a browser smoke test in CI on every pull request.
- Log registration outcome codes without logging email contents or QR tokens.
- Use database migrations and seed data checked into the repository.
- Add observability for failed writes, auth failures, and realtime disconnects before production launch.
- Keep role checks in both the UI and database policies.

## 8. Key Decisions (ADR entries)
### ADR-001 — Supabase as the shared platform
**Context:** The team needs Auth, relational data, realtime, and storage quickly. **Decision:** use Supabase for those managed capabilities. **Alternatives:** custom Express/Postgres or Firebase. **Consequences:** rapid MVP delivery and strong constraints, with hosted-service coupling.

### ADR-002 — Server-authoritative registration RPC
**Context:** UI counts can be stale when two students register at once. **Decision:** perform capacity and duplicate checks atomically in Postgres. **Alternatives:** client-only check or sequential API checks. **Consequences:** correct seat limits, with a small SQL function to learn and test.

### ADR-003 — Opaque QR token
**Context:** tickets need to be unique without exposing personal details. **Decision:** generate a random server-side token and encode only that token. **Alternatives:** encode email/event JSON or sequential IDs. **Consequences:** better privacy and revocation, requiring a token lookup.

### ADR-004 — React/Vite plus Express starter
**Context:** beginners need quick feedback and a simple API boundary. **Decision:** use React/Vite and Express, with Supabase as the production data layer. **Alternatives:** Next.js full-stack or plain HTML. **Consequences:** clear separation and easy onboarding, with two processes to run locally.

## 9. Implementation Blueprint
### Phase 1 — MVP / Build Now
Implement exactly the scoped Build Now list: **FR-01 School Email Login; FR-02 Event Listings & Capacity; FR-03 One-Click Registration & Duplicate Prevention; FR-04 Unique QR Ticket; FR-08 Cancellation Window.** This is the 15.75h commitment against the 18h effective budget.

### Phase 2 — Organizer operations
Implement **FR-05 Organizer Check-in, Registrants & Exports**, including camera permissions, role policies, CSV/PDF generation, and single-use verification.

### Phase 3 — Communication and live state
Implement **FR-06 Announcements to Registered Attendees** and **FR-07 Real-time Capacity Tracker**, then add email delivery and reconnect testing if required.

## 10. Risks & Mitigations
- Confirm the official school domain before configuring Auth; use a demo allowlist while waiting.
- Keep scanner and export work out of the MVP so the registration transaction gets tested properly.
- Add a local seeded event and a documented Supabase setup checklist to reduce dependency on a live organizer workflow.
- Treat realtime counts as advisory; the RPC remains authoritative.

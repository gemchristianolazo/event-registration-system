---
title: TUP Manila Campus Event Registration System — MVP Scope
version: 0.1
date: 2026-08-27
status: draft
source: prd.md
---

## 1. Inputs
- **Time budget:** `6h` wall-clock, `5` people, skill level: `beginner`
- **Computed build budget:** `18 person-hours` (`6 × 5 × 0.6`)
- Estimates below apply the beginner multiplier of 1.5 to a mid-level estimate.

## 2. Critical Path (never cut)
The smallest connected chain that demonstrates a student reserving a seat and receiving a ticket.

| Order | FR | Name | Effort (h) | Running total |
|---|---|---|---:|---:|
| 1 | FR-01 | School Email Login | 3.0 | 3.0 |
| 2 | FR-02 | Event Listings & Capacity | 3.0 | 6.0 |
| 3 | FR-03 | One-Click Registration & Duplicate Prevention | 4.5 | 10.5 |
| 4 | FR-04 | Unique QR Ticket | 3.0 | 13.5 |

## 3. Build Now
| FR | Name | Effort (h) | Reason for estimate | Assigned to |
|---|---|---:|---|---|
| FR-01 | School Email Login | 3.0 | Supabase Auth setup, domain check, login states | Person A |
| FR-02 | Event Listings & Capacity | 3.0 | Seeded event query, card/list UI, full state | Person B |
| FR-03 | One-Click Registration & Duplicate Prevention | 4.5 | transaction/RPC, unique constraint, feedback states | Person C |
| FR-04 | Unique QR Ticket | 3.0 | token creation, QR rendering, ticket view | Person D |
| FR-08 | Cancellation Window | 2.25 | deadline calculation, confirmation, status update | Person E |

**Total committed:** `15.75h` against an `18h` budget. The remaining `2.25h` is integration, testing, and demo preparation.

## 4. Parked for Phase 2
| FR | Name | Why parked |
|---|---|---|
| FR-05 | Organizer Check-in, Registrants & Exports | camera permissions, role policies, CSV/PDF generation exceed the remaining slice |
| FR-06 | Announcements to Registered Attendees | requires organizer authoring UI and notification delivery decisions |
| FR-07 | Real-time Capacity Tracker | requires subscription lifecycle testing and conflict handling after the core write path |

## 5. Task Split
- **Person A:** FR-01, unblocked from the start; publishes the auth contract for the other UI tasks.
- **Person B:** FR-02, starts with seeded data; depends on the event schema from the shared setup.
- **Person C:** FR-03, blocked on the event/user schema; owns the capacity-safe registration RPC.
- **Person D:** FR-04, blocked on the registration record shape from Person C.
- **Person E:** FR-08 and integration checklist; blocked on FR-03 status fields, then verifies the complete student journey.

## 6. Risks
- The critical path is 13.5h, leaving only 4.5h for cancellation, integration, tests, and demo prep.
- Supabase project setup or school-domain confirmation can consume setup time; use a configured test domain for the demo.
- QR scanning, organizer exports, announcements, and realtime tracking are intentionally not demo commitments in this sprint.

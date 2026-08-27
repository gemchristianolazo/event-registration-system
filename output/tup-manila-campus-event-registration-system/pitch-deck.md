---
title: TUP Manila Campus Event Registration System - Pitch Deck
version: 0.3
date: 2026-08-28
status: draft
source: prd.md, adr.md, mvp-scope.md
---

## Slide 1 - The Problem
**Slide content:** `Campus registration should not depend on paper lists.`
- Students cannot reliably see remaining seats.
- Organizers risk duplicate registrations and overbooking.
- Manual check-in creates long lines and fragmented records.

**Speaker notes:** A TUP Manila student hears about an event, but registration can still depend on paper forms or scattered links. Organizers face the opposite problem: they cannot confidently see capacity, prevent repeat submissions, or prepare a clean attendance record. The result is friction before the event and confusion at the door.

## Slide 2 - The Solution (live demo cue)
**Slide content:** `Discover. Reserve. Show your pass.`
- School email and student ID login.
- Event details show capacity before registration.
- One click produces a unique QR ticket.

**Speaker notes:** TUP Events gives students one focused path from campus identity to a confirmed seat. I will log in, open an event, check the available capacity, register once, and show the QR ticket. I stop when the ticket appears: that is the protected MVP journey and the clearest proof of value.

## Slide 3 - How It Works
**Slide content:** `A simple interface with a reliable seat check`
- React and Vite power the responsive frontend.
- Supabase provides planned authentication and PostgreSQL storage.
- The registration transaction prevents duplicates and overbooking.

**Speaker notes:** The prototype uses React and Vite for a fast, mobile-friendly interface. The planned production data layer is Supabase, with Express as a small API boundary. Our key technical decision is making the database authoritative: capacity and duplicate checks happen together, so two students cannot both claim the same last seat.

## Slide 4 - What We Built (honestly)
**Slide content:** `A focused student registration prototype`
- MVP path: FR-01, FR-02, FR-03, FR-04, and FR-08.
- Login, event browsing, registration, QR ticket, and cancellation.
- Frontend interactions currently run on mock data.

**Speaker notes:** We protected one complete student experience for a six-hour, five-person beginner sprint. The frontend prototype demonstrates school login, capacity-aware event browsing, duplicate-safe interaction states, QR ticket presentation, and the 24-hour cancellation flow. It is intentionally frontend-only today, so real persistence and role enforcement remain implementation work.

## Slide 5 - What's Next
**Slide content:** `From student pass to event operations`
- FR-05: scan QR tickets and verify attendance.
- FR-09: send announcements and reminders to attendees.
- FR-10: export attendance as CSV or PDF.

**Speaker notes:** The next phase completes the organizer loop. Check-in staff can verify tickets at the door, organizers can keep registered attendees informed, and administration can receive standardized reports. These capabilities build on the same registration record; realtime capacity updates and production Supabase policies follow as the system moves beyond the prototype.

> Open question: `mvp-scope.md` and the ADR use older identifiers for some parked features, while the current PRD identifies announcements as FR-09 and attendance export as FR-10. Confirm the canonical numbering before presenting or implementing Phase 2.

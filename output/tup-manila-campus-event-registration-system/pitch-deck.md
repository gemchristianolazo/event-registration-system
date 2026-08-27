---
title: TUP Manila Campus Event Registration System - Pitch Deck
version: 0.2
date: 2026-08-27
status: draft
source: prd.md, adr.md, mvp-scope.md
---

## Slide 1 - The Problem
**Slide content:** `A campus seat should not depend on a paper list.`
- Students cannot trust event availability.
- Organizers risk duplicate registrations and overbooking.
- Manual check-in creates long lines and fragmented records.

**Speaker notes:** A TUP Manila student hears about an event, but registration may still depend on paper forms or scattered links. At the same time, organizers cannot confidently see remaining capacity, prevent repeat submissions, or prepare a clean attendance record. The result is friction before the event and confusion at the door.

## Slide 2 - The Solution (live demo cue)
**Slide content:** `Sign in. Reserve a seat. Show one QR ticket.`
- Demo: school email -> event details -> Register -> QR ticket.
- Show the available capacity before registration.
- Stop clicking when the QR ticket appears.

**Speaker notes:** TUP Manila Campus Event Registration gives students a short, phone-friendly path from school identity to a confirmed seat. I will sign in with a school email, choose an event with visible capacity, register once, and open the unique QR ticket. I stop at the ticket because that is the complete protected MVP journey.

## Slide 3 - How It Works
**Slide content:** `React + Supabase + one authoritative seat check`
- Supabase handles school-email authentication and Postgres data.
- A database transaction prevents duplicates and overbooking.
- The QR contains an opaque token rather than personal data.

**Speaker notes:** The interface uses React and Vite, with Express providing a simple API boundary. Supabase supplies authentication and PostgreSQL storage. The most important technical decision is placing the final capacity and duplicate checks in one database transaction. A screen can be briefly stale, but the server will not sell the same last seat twice.

## Slide 4 - What We Built (honestly)
**Slide content:** `A focused six-hour beginner MVP`
- Build now: FR-01, FR-02, FR-03, FR-04, and FR-08.
- 15.75 hours committed against an 18-hour effective budget.
- The student path includes login, capacity, registration, QR ticket, and cancellation.

**Speaker notes:** With five beginner builders and six hours, the team protected one complete journey instead of presenting a collection of disconnected screens. The MVP covers school-email login, event browsing, duplicate-safe registration, a unique QR ticket, and the 24-hour cancellation window. The remaining time is reserved for integration, testing, and demo preparation.

## Slide 5 - What's Next
**Slide content:** `Complete the organizer operations loop`
- FR-05: QR scanning and attendance verification.
- FR-09: announcements and reminders for registered attendees.
- FR-10: CSV and PDF attendance exports.

**Speaker notes:** The next phase turns the student ticket into a complete event operations tool. Staff can scan and verify attendance, organizers can send updates and reminders, and administration can receive standardized attendance reports. These features build on the same registration record, while realtime capacity tracking can follow once the core write path is proven.

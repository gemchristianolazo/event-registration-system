---
title: TUP Manila Campus Event Registration System - Design System
version: 0.2
date: 2026-08-27
status: draft
source: prd.md, adr.md, mvp-scope.md
---

## 1. Metadata
This system defines a mobile-first campus utility for student registration, event capacity, QR tickets, and cancellation. It fully specifies the MVP Build Now features: FR-01, FR-02, FR-03, FR-04, and FR-08.

## 2. UX Character & Rationale
Reference archetype: **campus operations dashboard** with a student-facing booking flow. Students may be checking a phone between classes, so event facts, seat availability, and the next action must be scannable in seconds. Organizer and administration views can later reuse the same components at higher information density.

## 3. Design Principles
- Show availability before asking for commitment.
- Make one next action obvious on every student screen.
- Treat confirmation, cancellation, and ticket status as explicit facts.
- Keep the QR ticket uncluttered and readable at arm's length.
- Provide a keyboard and non-color path for every important action.

## 4. Foundations
### Color

| Token | Value | Role |
|---|---|---|
| `--color-ink` | `#17212B` | primary text and headings |
| `--color-canvas` | `#F7F9F8` | page background |
| `--color-surface` | `#FFFFFF` | cards, fields, dialogs |
| `--color-primary` | `#006B63` | primary actions and focus |
| `--color-primary-dark` | `#004A45` | hover and active primary action |
| `--color-success` | `#176B3A` | confirmed and available states |
| `--color-warning` | `#8A4B00` | deadline and caution states |
| `--color-danger` | `#A12622` | cancellation errors and destructive actions |
| `--color-border` | `#71808A` | field and card boundaries |

Contrast pairs used by the MVP: ink on canvas is 15.1:1; ink on surface is 16.8:1; white on primary is 6.2:1; primary on surface is 6.2:1; warning on `#FFF1D6` is 6.1:1; danger on `#FDE8E7` is 5.7:1. Body pairs meet 4.5:1 and large text/UI pairs meet 3:1. Status always includes text and an icon, never color alone.

### Typography
Use `Atkinson Hyperlegible` for UI text and `Source Serif 4` for page titles, loaded locally or from an approved font source. Use 14px supporting text, 16px body text, 18px card titles, 24px section titles, and 34px page titles. Use 1.5 line-height for body text and 1.2 for headings. Do not use all-caps for important status or error messages.

### Spacing and layout
Use a 4px base scale: 4, 8, 12, 16, 24, 32, and 48px. Use one column below 760px, a two-column event grid from 760px, and a maximum content width of 1120px. Keep card and QR dimensions stable with CSS grid, minimum heights, and `aspect-ratio`.

### Radius, elevation, and iconography
Use 8px card and field radius, 4px status radius, and one soft shadow for dialogs only. Use Lucide icons with accessible names. Use a stable square QR container with a white quiet zone and no decorative overlay.

## 5. Components
### CMP-button
Purpose: execute registration, ticket, sign-out, retry, and cancellation actions.

Variants: primary teal, secondary outlined, and destructive red. Default has a clear text label. Hover darkens the fill without changing dimensions. Focus uses the global focus ring. Active uses the darker fill and a pressed state. Disabled uses reduced contrast plus `aria-disabled` where appropriate. Loading preserves width, disables repeat submission, and shows a text alternative such as `Registering...`. Error keeps the action available and places the error beside it. Empty is not applicable.

### CMP-school-email-input
Purpose: collect the school email required by FR-01.

Variants: email input with domain hint and submit action. Default has a visible label and example format. Hover changes only the border. Focus shows the global focus ring. Active is the submitted state. Disabled is used while the magic-link request is pending. Loading preserves the field and shows `Sending link...`. Error names the invalid domain, malformed address, expired link, or network failure and explains recovery. Empty shows the domain hint before entry.

### CMP-event-card
Purpose: present FR-02 event details and the FR-03 registration action.

Variants: available, registered, full, and loading. Default shows title, date, time, venue, description, capacity text, and action. Hover adds a subtle border emphasis. Focus applies a visible card outline when the card is interactive. Active shows the selected event state. Disabled is used for full or unpublished events and must retain readable text. Loading uses fixed-height skeleton blocks. Error shows a retry action for failed event data. Empty is represented by the event-list empty state rather than a blank card.

### CMP-capacity-status
Purpose: make FR-02 and FR-07 capacity understandable.

Variants: `12 seats left`, `1 seat left`, `Full`, and `Capacity unavailable`. Default combines text, a meter, and an icon. Hover and active do not change meaning. Focus is inherited when the status is inside an interactive card. Disabled is used for a stale/disconnected count and adds `Possibly stale`. Loading uses a fixed-width placeholder. Error says the count could not be refreshed. Empty is not valid for a published event and instead shows an unavailable state.

### CMP-registration-confirmation
Purpose: confirm FR-03 without making the student interpret a toast.

Variants: registered and already registered. Default replaces Register with `Registered` and a `View QR ticket` action. Hover, focus, and active follow CMP-button. Disabled is used while the registration write is pending. Loading says `Confirming your seat...`. Error distinguishes full, duplicate, and temporary failure and offers retry or return to events. Empty is not applicable.

### CMP-qr-ticket
Purpose: display the unique FR-04 ticket and FR-08 cancellation state.

Variants: active, cancelled, and generating. Default includes the QR, event title, date, venue, ticket status, and a short fallback token label. Hover is not used on the QR itself. Focus is applied to ticket actions, not the image. Active indicates the ticket can be presented. Disabled/cancelled shows `Ticket cancelled` and prevents check-in use. Loading reserves a square QR area. Error explains that the ticket could not be generated and offers retry. Empty is replaced by a ticket-not-found error.

### CMP-cancellation-dialog
Purpose: confirm FR-08 cancellation and communicate the 24-hour deadline.

Variants: eligible, deadline passed, and already checked in. Default states the exact cutoff date/time and the seat-release effect. Hover and active follow dialog buttons. Focus traps inside the open dialog and returns to the invoking control after close. Disabled disables confirmation after the deadline or check-in. Loading says `Cancelling...` and prevents duplicate requests. Error keeps the dialog open with retry guidance. Empty is not applicable.

### CMP-nav
Purpose: provide stable navigation between events, the student's ticket, and sign-out.

Variants: signed out and signed in. Default uses a compact header with the portal title and text links. Hover and active identify the destination without color alone. Focus is visible on every link. Disabled is used only while auth state is loading. Loading preserves header height. Error provides a sign-in retry or sign-out recovery. Empty is the signed-out state.

### CMP-modal-dialog
Purpose: shared accessible container for cancellation and future confirmations.

Variants: confirmation and error. Default has a title, labelled content region, close action, and action order. Hover and active follow button rules. Focus traps while open and closes with Escape. Disabled is not applicable to the container; actions may be disabled. Loading preserves dialog dimensions. Error keeps the cause and recovery visible. Empty is not applicable.

### CMP-empty-loading-error
Purpose: consistent asynchronous states for authentication, event listings, ticket generation, and capacity refresh.

Variants: empty, loading, and error. Each state preserves the surrounding layout, names what happened, and presents one recovery or next action. Error messages never rely on a color change alone.

### CMP-select (Phase 2 stub)
Purpose: organizer and administration filters for event/report views.

### CMP-checkbox-radio (Phase 2 stub)
Purpose: organizer settings and report filters.

### CMP-table-list (Phase 2 stub)
Purpose: dense registrant, attendance, and event-summary lists.

### CMP-toast (Phase 2 stub)
Purpose: secondary confirmation for announcements, exports, and organizer actions; primary registration feedback stays attached to the event or ticket.

### CMP-scanner (Phase 2 stub)
Purpose: camera-based QR attendance verification for FR-05.

### CMP-announcement (Phase 2 stub)
Purpose: event announcements, reminders, and registered-attendee notifications for FR-09.

## 6. Accessibility Specifications
- **WCAG 1.3.1 Structure:** use landmarks, one page heading, ordered heading levels, visible labels, semantic lists for event cards, and table headers in Phase 2 reports.
- **WCAG 1.4.3 Contrast:** use the documented color pairs; body text must meet 4.5:1 and large text/UI boundaries 3:1.
- **WCAG 2.1.1 Keyboard:** login, event selection, registration, ticket actions, and dialogs are fully operable without a pointer.
- **WCAG 2.4.7 Focus Visible:** use a 2px `--color-primary` outline with 2px offset on every interactive control.
- **WCAG 2.5.8 Target Size:** primary touch controls are at least 44x44 CSS px; no essential action is icon-only.
- **WCAG 3.3.1 Error Identification:** place errors beside the failed action, identify the cause, and provide recovery text.
- **WCAG 3.3.2 Labels:** give every input a visible label; cancellation dialogs state the exact deadline and consequence.
- **WCAG 2.3.3 Reduced Motion:** honor `prefers-reduced-motion`; capacity updates use no essential animation.
- Capacity meters, registration status, and ticket validity always include text and an icon so color is not the only signal.
- QR tickets provide an alternate text status and a visible ticket identifier; camera scanning remains a later feature with a non-camera fallback planned.

## 7. Patterns
**Authentication:** show the allowed school domain before submission, retain the entered email after an error, and return the student to the event list after authentication.

**Event browsing:** place capacity text directly beside the event action. Full events remain discoverable but replace Register with Full.

**Registration:** use one primary action, disable it during submission, and show the confirmed state on the event itself before linking to the ticket.

**Cancellation:** show the exact 24-hour cutoff before opening confirmation. After cancellation, show the released-seat result and an inactive ticket state.

**Feedback:** attach important feedback to the changed object. Use a toast only for secondary information in Phase 2.

## 8. Implementation Notes
Use CSS custom properties aligned to React/Vite:

`--color-ink`, `--color-canvas`, `--color-surface`, `--color-primary`, `--color-primary-dark`, `--color-success`, `--color-warning`, `--color-danger`, `--color-border`, `--space-1` through `--space-7`, `--radius-card`, `--focus-ring`, and `--content-max`.

Use semantic HTML, CSS grid for event listings, `aspect-ratio: 1` for QR containers, and fixed skeleton dimensions to prevent layout shift. Keep registration and cancellation writes server-authoritative even when the UI displays a realtime or cached count later.

## 9. Content & Voice
Use direct, respectful, campus-specific language: `3 seats left`, `Registration confirmed`, `View QR ticket`, and `Cancellation closes August 28 at 2:00 PM`. Avoid vague labels such as `Success`, `Available`, or `Process`. Explain errors in terms of the next action the student can take.

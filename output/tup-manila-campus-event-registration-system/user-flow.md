# User Flow — TUP Manila Campus Event Registration

> A TUP Manila student signs in, selects an available event, registers once, and receives a QR ticket.

**Legend:** `1.` step in sequence · `→` leads to · `⤷` decision branch


## Stage: Access

1. **Open event portal** _(entry)_ — The student opens the campus event portal and chooses to sign in.
   → **Enter school email**
2. **Enter school email** — The student enters a TUP Manila school email address.
   → **Email domain allowed?**
3. **Email domain allowed?** — The system checks whether the email belongs to the configured TUP Manila domain.
   - ⤷ *yes* → **View event listings** — Continue to the published event list
   - ⤷ *no* → **Show sign-in error** — Access is restricted to the configured school domain
4. **Show sign-in error** _(exit)_ — The system explains that only an allowed school email can continue.

## Stage: Discover

5. **View event listings** — The authenticated student sees published events, dates, venues, and remaining capacity.
   → **Seat available?**
6. **Seat available?** — The system checks whether the selected event still has capacity.
   - ⤷ *yes* → **Register with one click** — The Register action is enabled
   - ⤷ *no* → **Show event full** — The event is labeled Full
7. **Show event full** _(exit)_ — The student sees that registration is closed because the event has reached capacity.

## Stage: Reserve

8. **Register with one click** — The student selects Register and the server creates one registration with a capacity-safe check.
   → **Registration accepted?**
9. **Registration accepted?** — The system reports whether the write succeeded, was a duplicate, or lost a capacity race.
   - ⤷ *new registration accepted* → **Display unique QR ticket**
   - ⤷ *already registered* → **Display unique QR ticket** — Reuse the existing registration and ticket
   - ⤷ *full or temporary failure* → **Explain registration result**
10. **Explain registration result** _(exit)_ — The system explains duplicate, full, or temporary failure and offers the correct next action.

## Stage: Ticket

11. **Display unique QR ticket** — The system shows the confirmed event ticket with its unique opaque QR token.
   → **Cancel before deadline?**
12. **Cancel before deadline?** — The student may choose to cancel only while more than 24 hours remain and check-in has not happened.
   - ⤷ *student confirms cancellation in time* → **Cancel registration**
   - ⤷ *student keeps registration* → **Ticket ready for check-in**
   - ⤷ *deadline passed or already checked in* → **Keep active ticket**
13. **Cancel registration** — The system marks the registration cancelled, invalidates the ticket, and releases the seat.
   → **Keep active ticket** — The exit label explains the cancelled state
14. **Ticket ready for check-in** _(exit)_ — The student keeps the active QR ticket for future attendance verification.
15. **Keep active ticket** _(exit)_ — The system explains that the cancellation window has closed and leaves the active ticket unchanged.

## Decision points

- **Email domain allowed?** — yes / no
- **Seat available?** — yes / no
- **Registration accepted?** — new registration accepted / already registered / full or temporary failure
- **Cancel before deadline?** — student confirms cancellation in time / student keeps registration / deadline passed or already checked in

## Exit points

- **Show sign-in error** — The system explains that only an allowed school email can continue.
- **Show event full** — The student sees that registration is closed because the event has reached capacity.
- **Explain registration result** — The system explains duplicate, full, or temporary failure and offers the correct next action.
- **Ticket ready for check-in** — The student keeps the active QR ticket for future attendance verification.
- **Keep active ticket** — The system explains that the cancellation window has closed and leaves the active ticket unchanged.

## Edge cases & error paths

- The email domain is not an allowed TUP Manila domain.
- The event becomes full while the student is submitting registration.
- The student already has a registration for the event.
- The student tries to cancel inside the 24-hour window.
- The QR ticket is cancelled and must not be accepted at check-in.

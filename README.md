# TUP Events

TUP Events is a campus event registration platform for TUP Manila students, organizers, and check-in staff. It gives students one place to discover events, see remaining capacity, reserve a seat, manage registrations, and present a QR ticket at the venue.

## Prototype capabilities

The current frontend prototype includes:

- School email and student ID login
- Event listings with dates, venues, capacity, available slots, and progress bars
- Event detail pages with one-click registration
- Duplicate registration and full-event prevention using mock state
- Registration confirmation with a unique QR ticket
- My Events with QR ticket access and 24-hour cancellation messaging
- Organizer dashboard with registrants, attendance status, exports, and announcements
- QR check-in screen with ticket ID verification
- Announcement modal for registered attendees

## Frontend routes

- `/login` - student login
- `/` - event discovery
- `/events/:eventId` - event details and registration
- `/confirmation/:eventId` - registration confirmation and QR ticket
- `/my-events` - registered events and cancellation
- `/organizer` - organizer dashboard
- `/check-in` - attendance verification

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Build for deployment

```bash
cd frontend
npm run build
```

The production files are generated in `frontend/dist`. The included `vercel.json` configures client-side routes for Vercel deployment.

## Current scope

This is a frontend-only prototype using mock event, registration, attendance, and announcement data. It does not yet persist accounts or registrations, send real notifications, scan from a device camera, or generate downloadable CSV/PDF files. Supabase integration can be added when the backend and database schema are implemented.

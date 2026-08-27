# Software Engineering 1: Activity 2
## EVENT REGISTRATION SYSTEM

**Group #3**
- Lazo, Gem Christian
- Andam, Jamir Dwayne
- Rivera, John Lloyd
- Bata-anon, Klarence
- Salgado, Marty

---

## Table of Contents
1. [Event Registration System Overview](#event-registration-system-overview)
2. [Problem Statement](#problem-statement)
3. [Target Users](#target-users)
4. [Functional Requirements](#functional-requirements)
5. [Non-Functional Requirements](#non-functional-requirements)
6. [Proposed Features](#proposed-features)
7. [System Context Diagram](#system-context-diagram)

---

## Event Registration System Overview
- **Platform Scope:** A digital platform designed to streamline event registration, check-in, and attendance tracking at TUP Manila.
- **Purpose:** Helps event organizers manage registrations, monitor attendance, and communicate with participants efficiently.
- **Key Capabilities:** QR code check-in, real-time registration visibility, automated confirmations, reminders, and structured attendance reports.

---

## Problem Statement
Event registration on campus is fragmented and inefficient, relying on manual paper forms, Google Forms, and walk-in registrations, resulting in:
- **No real-time headcount:** Difficult to determine room capacity and remaining slots dynamically.
- **Duplicate or fake registrations:** No identity checks or prevention mechanisms.
- **Long check-in lines:** Manual verification slows down event entry.
- **Fragmented post-event data:** Attendance records scattered across multiple spreadsheets or paper logs.
- **Weak communication:** Difficulty sending timely updates or reminders to registered participants.

---

## Target Users

| User Group | Description | Access / Permissions |
| :--- | :--- | :--- |
| **Event Organizers** | Student organization officers, event heads, and faculty coordinators. | Create and manage events, view registrant lists, handle check-ins, and broadcast announcements. |
| **Student Attendees** | University students looking to participate in campus events. | Browse events, register, cancel registration, and receive QR codes/confirmations. |
| **Check-in Staff** | Volunteers or ushers assigned at event venue entrances. | Scan attendee QR codes and verify live attendance. |
| **School Administration** | Deans, Office of Student Affairs (OSA) staff, and event auditors. | View-only access to attendance reports and event summaries for accreditation and evaluation. |

> *Note: Administrators have view-only access to reports; they cannot modify event details.*

---

## Functional Requirements

| ID | Requirement | Description |
| :--- | :--- | :--- |
| **FR-01** | **User Registration & Login** | Students must register and log in using their school email and ID before accessing the system. |
| **FR-02** | **Event Browsing** | Users can view a list of upcoming events with full details (date, time, venue, capacity, description). |
| **FR-03** | **Event Registration** | Users can register for an event with one click; system automatically checks if slots are available. |
| **FR-04** | **QR Code Generation** | Upon registration, attendees receive a unique QR code for entry verification. |
| **FR-05** | **Check-in via QR Scanning** | Check-in staff scan attendee QR codes to instantly validate and log attendance. |
| **FR-06** | **Duplicate Prevention** | System prevents a single user from registering multiple times for the same event. |
| **FR-07** | **Capacity Control** | System automatically closes registration once maximum event capacity is reached. |
| **FR-08** | **Registration Cancellation** | Users can cancel their registration up to 24 hours before the scheduled event start. |
| **FR-09** | **Event Announcements** | Organizers can broadcast event-wide announcements and reminders to all registered attendees. |
| **FR-10** | **Attendance Export** | Organizers can export final attendance records as CSV or PDF documents. |

---

## Non-Functional Requirements
*(Adapted from ISO 25010:2011 Systems and Software Engineering - Product Quality)*

| Quality Attribute | Requirement Specification |
| :--- | :--- |
| **Performance** | Registration processing, QR scanning, and check-in confirmation shall complete within 2–3 seconds. |
| **Security** | User accounts, credentials, and event data shall be protected; only authorized roles may access registration data. |
| **Reliability** | The system shall maintain high availability during peak traffic windows and prevent data loss. |
| **Usability** | Clear, intuitive reporting and navigation for non-technical users (e.g., Deans, OSA staff, auditors). |
| **Scalability** | The system shall support up to 1,000 concurrent users during high-traffic events (e.g., freshmen orientation). |

---

## Proposed Features

| Feature | Description |
| :--- | :--- |
| **Event Listings** | Displays upcoming campus events with date, time, venue, and available capacity. |
| **One-Click Registration** | Attendees can register with a single click after system validates open availability. |
| **QR Code Check-in** | Generates a unique QR pass per attendee; staff scan to mark attendance instantly. |
| **Real-time Capacity Tracker** | Dynamically tracks remaining slots and auto-locks registration upon full capacity. |
| **Duplicate Prevention** | Hard blocks repeat submissions from the same student ID/account. |
| **Reminder Notifications** | Dispatches automated notifications 24 hours and 1 hour prior to event start. |
| **Cancellation Window** | Permits cancellation up to 24 hours before the event, automatically returning slots to the pool. |
| **Organizer Dashboard** | Unified dashboard showing live metrics on registrants, attendance rates, and event logs. |
| **Attendance Export** | Generates exportable attendance sheets in standardized CSV and PDF formats. |
| **Announcement System** | Direct messaging conduit enabling organizers to broadcast updates to all participants. |

---

## System Context Diagram

### Context Breakdown:
- **Central Process (`0`):** `Event Registration System`
- **External Entities & Data Exchanges:**
  1. **Event Organizers:**
     - *To System:* Create Event, Manage Registration, Send Announcement
     - *From System:* Event List, Registration Data
  2. **Student Attendees:**
     - *To System:* Register, Browse Event, Cancel
     - *From System:* Confirmation, Reminder, QR Code
  3. **Check-in Staff:**
     - *To System:* Scan QR Code, Verify Attendance
     - *From System:* Attendance List, Validation Result
  4. **School Administration:**
     - *To System:* Request Attendance Report
     - *From System:* Attendance Report, Event Summary
  5. **Email Notification Service (External System):**
     - *From System:* Email Notification Request
     - *To System:* Delivery Status *(ERS issues notification requests; delivery is handled externally)*
import { useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, CircleAlert, Clock3, Mail, MapPin, MoreHorizontal, Plus, ScanLine, Square, Sparkles, X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

const initialEvents = [
  { id: 'devcon', title: 'TUP DevCon 2026', category: 'Technology', date: 'Sep 12, 2026', time: '9:00 AM - 4:30 PM', venue: 'TUP Manila Auditorium', description: 'A full day of talks, demos, and hands-on sessions for the campus developer community.', capacity: 250, registered: 187, accent: 'teal', organizer: 'TUP Tech Guild' },
  { id: 'freshie', title: 'Freshmen Welcome Rally', category: 'Student Life', date: 'Sep 05, 2026', time: '1:00 PM - 5:00 PM', venue: 'TUP Manila Gymnasium', description: 'Meet your campus community, discover organizations, and start the year with energy.', capacity: 500, registered: 472, accent: 'coral', organizer: 'Student Affairs Office' },
  { id: 'design', title: 'Design Thinking Workshop', category: 'Workshop', date: 'Sep 18, 2026', time: '10:00 AM - 12:30 PM', venue: 'Innovation Hub, Building C', description: 'Learn a practical framework for turning campus problems into better solutions.', capacity: 60, registered: 60, accent: 'yellow', organizer: 'Innovation Council' },
  { id: 'sports', title: 'Intramurals Opening Day', category: 'Sports', date: 'Oct 03, 2026', time: '8:00 AM - 3:00 PM', venue: 'TUP Manila Oval', description: 'Cheer for your college and celebrate the opening of this year\'s intramural season.', capacity: 300, registered: 96, accent: 'blue', organizer: 'University Sports Committee' },
]

const currentUser = { name: 'Cleo Jane Torres', email: 'cleojane.torres@tup.edu.ph', id: 'TUPM-23-0142' }
const iconProps = { size: 16, strokeWidth: 2, 'aria-hidden': true }

function App() {
  const [events, setEvents] = useState(initialEvents)
  const [registeredIds, setRegisteredIds] = useState(['devcon'])
  const [announcements, setAnnouncements] = useState([])
  const [toast, setToast] = useState('')

  const register = (eventId) => {
    if (registeredIds.includes(eventId)) { setToast('You are already registered for this event.'); return false }
    const event = events.find((item) => item.id === eventId)
    if (event.registered >= event.capacity) { setToast('Registration is closed because this event is full.'); return false }
    setEvents((items) => items.map((item) => item.id === eventId ? { ...item, registered: item.registered + 1 } : item))
    setRegisteredIds((ids) => [...ids, eventId])
    setToast('Registration confirmed. Your QR ticket is ready.')
    return true
  }

  const cancel = (eventId) => {
    setEvents((items) => items.map((item) => item.id === eventId ? { ...item, registered: Math.max(0, item.registered - 1) } : item))
    setRegisteredIds((ids) => ids.filter((id) => id !== eventId))
    setToast('Registration cancelled. The seat is available again.')
  }

  const addAnnouncement = (eventId, message) => {
    setAnnouncements((items) => [{ eventId, message, date: 'Just now' }, ...items])
    setToast('Announcement sent to registered attendees.')
  }

  return <BrowserRouter><div className="app-shell"><Header /><Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<EventsPage events={events} registeredIds={registeredIds} />} />
    <Route path="/events/:eventId" element={<EventDetail events={events} registeredIds={registeredIds} onRegister={register} />} />
    <Route path="/confirmation/:eventId" element={<ConfirmationPage events={events} />} />
    <Route path="/my-events" element={<MyEvents events={events} registeredIds={registeredIds} onCancel={cancel} />} />
    <Route path="/organizer" element={<OrganizerDashboard events={events} announcements={announcements} onAnnouncement={addAnnouncement} />} />
    <Route path="/check-in" element={<CheckInPage />} />
  </Routes>{toast && <button className="toast" onClick={() => setToast('')} aria-label="Dismiss notification">{toast}<X {...iconProps} /></button>}</div></BrowserRouter>
}

function Header() {
  return <header className="site-header"><Link className="brand" to="/"><span className="brand-mark">T</span><span><strong>TUP</strong> EVENTS</span></Link><nav className="main-nav"><NavLink to="/">Discover</NavLink><NavLink to="/my-events">My events</NavLink><NavLink to="/organizer">Organizer</NavLink><NavLink to="/check-in">Check-in</NavLink></nav><Link className="profile-chip" to="/my-events"><span className="avatar">MS</span><span className="profile-name">Cleo Jane Torres</span><ChevronDown className="chevron" {...iconProps} /></Link></header>
}

function LoginPage() {
  const [email, setEmail] = useState(''); const [studentId, setStudentId] = useState(''); const [error, setError] = useState(''); const navigate = useNavigate()
  const submit = (event) => { event.preventDefault(); if (!email.endsWith('@tup.edu.ph')) { setError('Use your TUP Manila school email, ending in @tup.edu.ph.'); return } navigate('/') }
  return <main className="login-page"><div className="login-art"><div className="art-sticker">YOUR<br /><b>CAMPUS.</b><br />YOUR<br /><b>EVENTS.</b></div><div className="art-lines" /><span className="art-note">TUP MANILA / 2026</span></div><section className="login-panel"><div className="eyebrow">WELCOME TO TUP EVENTS</div><h1>Show up for<br /><em>what matters.</em></h1><p className="lead">Your campus calendar, registration pass, and event community in one place.</p><form onSubmit={submit} className="login-form"><label htmlFor="email">School email</label><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@tup.edu.ph" required /><label htmlFor="student-id">Student ID</label><input id="student-id" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="e.g. 2023-00142" required />{error && <p className="form-error">{error}</p>}<button className="button button-primary full-width" type="submit">Continue to events <ArrowRight {...iconProps} /></button></form><p className="login-foot">By continuing, you agree to TUP Manila's event participation guidelines.</p></section></main>
}

function PageIntro({ eyebrow, title, children }) { return <div className="page-intro"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{children}</div></div> }

function EventsPage({ events, registeredIds }) {
  const [filter, setFilter] = useState('All events'); const categories = ['All events', ...new Set(events.map((event) => event.category))]; const shown = filter === 'All events' ? events : events.filter((event) => event.category === filter)
  return <main className="page"><PageIntro eyebrow="TUP MANILA / DISCOVER" title={<>Find your next <em>campus moment.</em></>}><p>Events made for the people who make TUP Manila feel like home.</p></PageIntro><div className="toolbar"><div className="filter-tabs">{categories.map((category) => <button key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div><span className="event-count">{shown.length} upcoming events <span className="green-dot" /></span></div><section className="event-grid">{shown.map((event) => <EventCard key={event.id} event={event} registered={registeredIds.includes(event.id)} />)}</section></main>
}

function EventCard({ event, registered }) {
  const percent = Math.round((event.registered / event.capacity) * 100)
  return <Link className={`event-card accent-${event.accent}`} to={`/events/${event.id}`}><div className="card-top"><span className="category-tag">{event.category}</span><ArrowUpRight className="arrow-icon" {...iconProps} /></div><div className="card-content"><h2>{event.title}</h2><p>{event.description}</p><div className="event-meta"><span><Square {...iconProps} /> {event.date}</span><span><Clock3 {...iconProps} /> {event.time}</span><span><MapPin {...iconProps} /> {event.venue}</span></div></div><div className="capacity"><div className="capacity-label"><span>{event.registered >= event.capacity ? 'Registration closed' : `${event.capacity - event.registered} seats available`}</span><b>{percent}%</b></div><div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }} /></div><div className="card-footer"><span>{registered ? <><Check {...iconProps} /> Registered</> : event.registered >= event.capacity ? 'Full' : 'Open for registration'}</span><span>{event.registered} / {event.capacity}</span></div></div></Link>
}

function EventDetail({ events, registeredIds, onRegister }) {
  const { eventId } = useParams(); const event = events.find((item) => item.id === eventId); const registered = registeredIds.includes(eventId); const navigate = useNavigate()
  if (!event) return <NotFound />
  const canRegister = event.registered < event.capacity && !registered; const handleRegister = () => { if (onRegister(event.id)) navigate(`/confirmation/${event.id}`) }
  return <main className="detail-page"><Link className="back-link" to="/"><ArrowLeft {...iconProps} /> Back to discover</Link><div className={`detail-hero accent-${event.accent}`}><span className="category-tag">{event.category}</span><div className="detail-number">EVENT / 0{events.indexOf(event) + 1}</div><h1>{event.title}</h1><p>{event.description}</p></div><div className="detail-layout"><section><div className="detail-facts"><div><small>DATE & TIME</small><strong>{event.date}<br />{event.time}</strong></div><div><small>VENUE</small><strong>{event.venue}</strong></div><div><small>ORGANIZED BY</small><strong>{event.organizer}</strong></div></div><article className="about-event"><div className="eyebrow">ABOUT THIS EVENT</div><h2>Come curious.<br /><em>Leave inspired.</em></h2><p>{event.description} Bring your student ID and arrive 15 minutes early for a smooth check-in experience.</p></article></section><aside className="register-box"><div className="eyebrow">YOUR SPOT</div><h2>{event.registered >= event.capacity ? 'This one is full.' : registered ? 'You\'re on the list.' : 'Save your seat.'}</h2><div className="mini-capacity"><div className="progress-track"><div className="progress-fill" style={{ width: `${(event.registered / event.capacity) * 100}%` }} /></div><span>{event.registered} of {event.capacity} seats taken</span></div><button className="button button-primary full-width" disabled={!canRegister} onClick={handleRegister}><RegisterLabel registered={registered} available={event.registered < event.capacity} /></button><p className="box-note">Free event / Cancellation available until 24 hours before start</p></aside></div></main>
}

function RegisterLabel({ registered, available }) {
  if (registered) return <><span>Registered</span> <Check {...iconProps} /></>
  if (available) return <><span>Register in one click</span> <ArrowRight {...iconProps} /></>
  return 'Registration closed'
}

function ConfirmationPage({ events }) {
  const { eventId } = useParams(); const event = events.find((item) => item.id === eventId) || events[0]
  return <main className="confirmation-page"><div className="success-mark"><Check {...iconProps} /></div><div className="eyebrow">REGISTRATION CONFIRMED</div><h1>You're going to<br /><em>{event.title}.</em></h1><p className="confirmation-lead">Your spot is saved, Cleo. Keep this pass handy for check-in.</p><div className="ticket"><div className="ticket-info"><span className="category-tag">{event.category}</span><h2>{event.title}</h2><p>{event.date} / {event.time}</p><p>{event.venue}</p><div className="ticket-id">TICKET ID <b>TE-2026-00142</b></div></div><div className="qr-wrap"><QRCodeSVG value={`tup-events:${event.id}:TE-2026-00142`} size={156} bgColor="#fffdf8" fgColor="#14251f" level="M" /><small>Scan at check-in</small></div></div><div className="confirmation-actions"><Link className="button button-primary" to="/my-events">View my events <ArrowRight {...iconProps} /></Link><Link className="text-link" to="/">Browse more events</Link></div></main>
}

function MyEvents({ events, registeredIds, onCancel }) {
  const [showCancel, setShowCancel] = useState(null); const registered = events.filter((event) => registeredIds.includes(event.id))
  return <main className="page"><PageIntro eyebrow="MY TUP EVENTS" title={<>Your plans, <em>in one place.</em></>}><p>Keep your passes close and your calendar full.</p></PageIntro><div className="my-events-layout"><section><div className="section-heading"><h2>Upcoming for you</h2><span>{registered.length} registered</span></div>{registered.length ? registered.map((event) => <div className="my-event-row" key={event.id}><div className={`date-block accent-${event.accent}`}><b>{event.date.split(' ')[0]}</b><strong>{event.date.split(' ')[1].replace(',', '')}</strong></div><div className="row-info"><span className="category-tag">{event.category}</span><h3>{event.title}</h3><p>{event.date} / {event.venue}</p></div><Link className="button button-small" to={`/confirmation/${event.id}`}>View QR</Link><button className="icon-button" title="Cancel registration" onClick={() => setShowCancel(event.id)}><MoreHorizontal {...iconProps} /></button></div>) : <div className="empty-state"><Sparkles {...iconProps} /><h3>No events yet</h3><p>Find something that sparks your curiosity.</p><Link className="text-link" to="/">Explore events <ArrowRight {...iconProps} /></Link></div>}</section><aside className="profile-card"><div className="avatar large">MS</div><div className="eyebrow">SIGNED IN AS</div><h2>{currentUser.name}</h2><p>{currentUser.email}</p><span className="student-id">ID / {currentUser.id}</span><Link className="text-link" to="/login">Sign out</Link></aside></div>{showCancel && <CancelModal event={events.find((item) => item.id === showCancel)} onClose={() => setShowCancel(null)} onConfirm={() => { onCancel(showCancel); setShowCancel(null) }} />}</main>
}

function CancelModal({ event, onClose, onConfirm }) { return <div className="modal-backdrop"><div className="modal"><button className="modal-close" onClick={onClose} aria-label="Close dialog"><X {...iconProps} /></button><div className="eyebrow">CANCEL REGISTRATION</div><h2>Let this seat go?</h2><p>You can cancel <b>{event.title}</b> because the event is more than 24 hours away. Your spot will become available to another student.</p><div className="modal-actions"><button className="button button-secondary" onClick={onClose}>Keep my spot</button><button className="button button-danger" onClick={onConfirm}>Cancel registration</button></div></div></div> }

function OrganizerDashboard({ events, announcements, onAnnouncement }) {
  const [modal, setModal] = useState(false); const event = events[0]
  return <main className="page dashboard-page"><PageIntro eyebrow="ORGANIZER SPACE / TUP TECH GUILD" title={<>Make every seat<br /><em>count.</em></>}><p>Your event command center for registrations, check-in, and updates.</p></PageIntro><div className="dashboard-stats"><Stat label="Total registrations" value="187" note="12% this week" icon={<ArrowUpRight {...iconProps} />} /><Stat label="Checked in" value="64" note="34% attendance rate" icon={<Check {...iconProps} />} /><Stat label="Seats remaining" value={event.capacity - event.registered} note={`of ${event.capacity} total capacity`} /><Stat label="Event status" value="OPEN" note="Registration is live" /></div><div className="dashboard-toolbar"><div><div className="eyebrow">ACTIVE EVENT</div><h2>{event.title}</h2></div><div className="toolbar-actions"><button className="button button-secondary" onClick={() => setModal(true)}><Plus {...iconProps} /> Announcement</button><button className="button button-primary">Export attendance <ArrowDown {...iconProps} /></button></div></div><div className="dashboard-grid"><section className="registrants-panel"><div className="panel-header"><h2>Registrant list</h2><span className="live-pill"><i /> Live</span><button className="filter-button">All status <ChevronDown {...iconProps} /></button></div><table><thead><tr><th>Attendee</th><th>Student ID</th><th>Registered</th><th>Status</th></tr></thead><tbody>{[['Cleo Jane Torres','TUPM-23-0142','Aug 27, 2026','Checked in'],['Janelle Cruz','TUPM-22-1498','Aug 27, 2026','Registered'],['Paolo Reyes','TUPM-23-0821','Aug 26, 2026','Registered'],['Aira Mendoza','TUPM-24-0211','Aug 26, 2026','Checked in'],['Luis Garcia','TUPM-23-0567','Aug 25, 2026','Registered']].map((person) => <tr key={person[0]}><td><span className="table-avatar">{person[0].split(' ').map((part) => part[0]).join('')}</span>{person[0]}</td><td>{person[1]}</td><td>{person[2]}</td><td><span className={`status ${person[3] === 'Checked in' ? 'status-green' : 'status-yellow'}`}>{person[3]}</span></td></tr>)}</tbody></table><button className="load-more">Load more registrants <ArrowDown {...iconProps} /></button></section><aside className="announcement-panel"><div className="panel-header"><h2>Announcements</h2><span>For attendees</span></div>{announcements.length === 0 ? <div className="announcement-empty"><Mail {...iconProps} /><p>No announcements yet.</p><button className="text-link" onClick={() => setModal(true)}>Send your first update <ArrowRight {...iconProps} /></button></div> : announcements.map((item, index) => <div className="announcement-item" key={`${item.date}-${index}`}><span className="announcement-dot" /><div><b>{item.message}</b><small>{item.date}</small></div></div>)}<button className="button button-secondary full-width" onClick={() => setModal(true)}><Plus {...iconProps} /> New announcement</button></aside></div>{modal && <AnnouncementModal event={event} onClose={() => setModal(false)} onSend={(message) => { onAnnouncement(event.id, message); setModal(false) }} />}</main>
}

function Stat({ label, value, note, icon }) { return <div className="stat"><span>{label}</span><strong>{value}</strong><small>{icon}{note}</small></div> }

function AnnouncementModal({ event, onClose, onSend }) { const [message, setMessage] = useState(''); return <div className="modal-backdrop"><div className="modal announcement-modal"><button className="modal-close" onClick={onClose} aria-label="Close dialog"><X {...iconProps} /></button><div className="eyebrow">NEW ANNOUNCEMENT</div><h2>Keep your attendees<br /><em>in the loop.</em></h2><p>This will be sent to everyone registered for {event.title}.</p><label htmlFor="announcement">Message</label><textarea id="announcement" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Share an update about the event..." rows="4" /><div className="modal-actions"><button className="button button-secondary" onClick={onClose}>Cancel</button><button className="button button-primary" disabled={!message.trim()} onClick={() => onSend(message)}>Send announcement <ArrowRight {...iconProps} /></button></div></div></div> }

function CheckInPage() {
  const [code, setCode] = useState(''); const [result, setResult] = useState(null)
  return <main className="scanner-page"><div className="scanner-heading"><div className="eyebrow">TUP EVENTS / ATTENDANCE</div><h1>Make an entrance.</h1><p>Scan a QR ticket or enter its ticket ID to verify attendance.</p></div><div className="scanner-layout"><div className="scanner-frame"><ScanLine className="scan-crosshair" size={42} aria-label="Scanning area" /><span className="scanner-hint">Position QR code inside the frame</span></div><div className="scanner-or"><span>or enter ticket ID</span></div><div className="scanner-input"><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. TE-2026-00142" /><button className="button button-primary" onClick={() => setResult(code ? 'valid' : 'invalid')}>Verify ticket</button></div>{result === 'valid' && <div className="scan-result valid-result"><Check {...iconProps} /><div><b>Ticket verified</b><p>Cleo Jane Torres / TUP DevCon 2026</p></div><strong>CHECKED IN</strong></div>}{result === 'invalid' && <div className="scan-result invalid-result"><CircleAlert {...iconProps} /><div><b>Ticket not found</b><p>Check the ticket ID and try again.</p></div></div>}</div></main>
}

function NotFound() { return <main className="page empty-state"><h1>Event not found.</h1><Link className="text-link" to="/"><ArrowLeft {...iconProps} /> Return to events</Link></main> }

export default App

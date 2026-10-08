import { useEffect, useRef, useState } from 'react'
import './Calendar.css'

const CALENDAR_SOURCES = [
  { src: 'YXlvbWlkZXZhbmVzc2FAZ21haWwuY29t', color: '#ceb8e1' },
  { src: 'N2FhZmVjM2JkYWEzNGYwZWQzN2M3ZmQxMzk1MTZlMWFmY2IyYWEyZDNlODAwYmI5NzM3ZjgxNjJmYmVkMjVlM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#d99aae' },
  { src: 'ODljMTNjOTBmMTBkMjc2MWQ1OGRhMmFkMmE4YTdiZTRiM2RmZDI3ZWFlMTI1ZWYxM2Q3N2M4MjM0MmIzMjQ0YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#db90be' },
  { src: 'OGUwYzYxNTA5ZjExNGI4ODBiY2FjNTZkMTVjOWVhNDlkZDI4ZjIyYzJjZjhmY2I2MWNlMzg0MDIyMDA3Y2EwYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#ffcfec' },
  { src: 'NTlmN2JlNDQ2YTkwNjdkOWE1NTA2N2JlODA1ODMzOTRlMDM0ZTk2ZGE1MDYwNmIxMTkyOWZjOTM0Zjc2YzJiZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#ad1457' },
  { src: 'NjVjM2Y2NTBhMzY4NGZhMzUxMTY5MmQxOGExYmUwNDdkZGEzNDg2ODI4NzMyNmMzOTRjMzllZDJiNGQ0ZjQzZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#cfb0cb' },
  { src: 'ZWZiODgzNTYxNDEwNTRjOTdiODk2ZTE1ODA3YzkyMWIzODU0YjE2Yzg4NDdmY2U1MTU4MTQ3YjNmMjQwMjZiYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#99065e' },
  { src: 'NWNkNTE1OWYyMGUzMDVlYTkwYWQzNzkwNzhhYzYyMDZkNzhkMzBjN2VmOTg1ZGUxNTk5ZmY4ZDg5MmZhZDI0MUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#7e2a53' },
  { src: 'ZDIzZjVhNzk5YTI5MDY3MjBjNTljYjkyYjA4NjliYWZjNmMyMGE5NWM1MWM3OTQxYWE1NmRhODI5M2EwYWYxOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', color: '#a390be' },
  { src: 'NGY0MDJ1MjZjcmdjbW1nNGdkNWlxMDdsaWgxc2pwYjVAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20', color: '#3f51b5' },
  { src: 'ZWs4cmU1NzA2c2Y2M2NvczYxNmx0YnNha2E2cGlmNnBAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20', color: '#b39ddb' },
  { src: 'ajQ0bTB1djdpY2VpcWZhYXUxYTVjY2FycGY3ajVhYmlAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20', color: '#ef6c00' },
]

const buildCalendarUrl = (mode) => {
  const params = new URLSearchParams({
    height: '800',
    wkst: '1',
    ctz: 'America/Chicago',
    showPrint: '0',
    mode,
    title: "Ayo's Calendar",
  })
  CALENDAR_SOURCES.forEach(({ src }) => params.append('src', src))
  CALENDAR_SOURCES.forEach(({ color }) => params.append('color', color))
  return `https://calendar.google.com/calendar/embed?${params.toString()}`
}

const MOBILE_QUERY = '(max-width: 768px)'

const Calendar = () => {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY)
    const handleChange = (e) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // The week view is too cramped on phones, so show the agenda list instead
  const calendarUrl = buildCalendarUrl(isMobile ? 'AGENDA' : 'WEEK')

  return (
    <section id="calendar" className="calendar-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">08.</span>
          <span className="title-text">My Calendar</span>
        </h2>
        <div className="calendar-wrapper">
          <iframe
            src={calendarUrl}
            title="Ayo's Calendar"
            className="calendar-frame"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default Calendar

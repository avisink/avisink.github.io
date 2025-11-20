import { useEffect, useRef } from 'react'
import { FaTrophy, FaAward, FaMedal, FaStar, FaApple } from 'react-icons/fa'
import './Awards.css'

const Awards = () => {
  const sectionRef = useRef(null)

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

  const awards = [
    {
      title: 'Apple Coding Club Competition Winner',
      issuer: 'Huston-Tillotson University',
      year: '2025',
      level: 'Competition',
      icon: <FaApple />,
      sortYear: 2025
    },
    {
      title: "Dean's List",
      issuer: 'Huston-Tillotson University',
      year: '2024-2025',
      level: 'Academic Year',
      icon: <FaStar />,
      sortYear: 2025
    },
    {
      title: 'Honor Roll',
      issuer: 'Huston-Tillotson University',
      year: '2024-2025',
      level: 'Academic Year',
      icon: <FaMedal />,
      sortYear: 2025
    },
    {
      title: 'W.E.B. DuBois Honors Scholarship',
      issuer: 'Huston-Tillotson University',
      year: '2023',
      level: 'College',
      icon: <FaAward />,
      sortYear: 2023
    },
    {
      title: 'Premium Award for Academic and Behavioral Excellence',
      issuer: 'Preston-International School',
      year: '2021',
      level: 'High School',
      icon: <FaTrophy />,
      sortYear: 2021
    }
  ].sort((a, b) => b.sortYear - a.sortYear)

  return (
    <section id="awards" className="awards-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">06.</span>
          <span className="title-text">Awards</span>
        </h2>
        <div className="awards-grid">
          {awards.map((award, index) => (
            <div key={index} className="award-card">
              <div className="award-icon">{award.icon}</div>
              <h3 className="award-title">{award.title}</h3>
              <p className="award-issuer">{award.issuer}</p>
              <div className="award-meta">
                <span className="award-year">{award.year}</span>
                <span className="award-level">{award.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Awards

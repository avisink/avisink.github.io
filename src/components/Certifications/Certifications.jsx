import { useEffect, useRef } from 'react'
import { FaCertificate } from 'react-icons/fa'
import './Certifications.css'

const Certifications = () => {
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

  return (
    <section id="certifications" className="certifications-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">07.</span>
          <span className="title-text">Certifications</span>
        </h2>
        <div className="certifications-content">
          <div className="certification-card">
            <FaCertificate className="cert-icon" />
            <p>
              View all certifications on{' '}
              <a 
                href="https://www.linkedin.com/in/avisinkaye/details/certifications/" 
                target="_blank"
                rel="noopener noreferrer"
                className="cert-link"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certifications

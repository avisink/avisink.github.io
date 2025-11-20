import { useEffect, useRef } from 'react'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
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

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'ayomidevanessa@gmail.com',
      link: 'mailto:ayomidevanessa@gmail.com',
      color: '#EA4335'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'avisinkaye',
      link: 'https://www.linkedin.com/in/avisinkaye',
      color: '#0077B5'
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      value: 'avisink',
      link: 'https://github.com/avisink',
      color: '#333'
    }
  ]

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">08.</span>
          <span className="title-text">Get in Touch 😊</span>
        </h2>
        <div className="contact-grid">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target={method.link.startsWith('mailto:') ? undefined : '_blank'}
              rel={method.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="contact-card"
              style={{ '--accent-color': method.color }}
            >
              <div className="contact-icon">{method.icon}</div>
              <h3 className="contact-label">{method.label}</h3>
              <p className="contact-value">{method.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact

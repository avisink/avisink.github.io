import { useEffect, useRef } from 'react'
import { FaUsers, FaCalculator, FaCode, FaLaptopCode, FaGavel, FaBook, FaMicrophone } from 'react-icons/fa'
import './Extracurricular.css'

const Extracurricular = () => {
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

  // Organizations with timeline/progression
  const organizations = [
    {
      name: 'SBT SPEAK Series',
      roles: [
        {
          title: 'Speaker',
          period: '2025',
          description: 'Spoke at the Inaugural SBT SPEAK series about "Computer Vision: How do Machines See?" - a foundational presentation exploring how machines interpret the world, from self-driving cars to medical diagnostics.',
          icon: <FaMicrophone />,
          link: 'https://youtu.be/-R655k2DFoo?si=dLRZRHAtlDRheCAJ'
        }
      ]
    },
    {
      name: 'Collegiate 100, HT Chapter',
      roles: [
        {
          title: 'President',
          period: 'Current',
          description: "Oversee the chapter's operations, lead initiatives, and represent the organization at campus and community events.",
          icon: <FaUsers />
        },
        {
          title: 'Treasurer',
          period: 'Previous',
          description: 'Managed budgets and finances for the organization, supporting various initiatives.',
          icon: <FaCalculator />
        }
      ]
    },
    {
      name: 'Women in Tech, HT Chapter',
      roles: [
        {
          title: 'President',
          period: 'Current',
          description: 'Lead initiatives to empower and support women pursuing careers in technology.',
          icon: <FaUsers />
        }
      ]
    },
    {
      name: 'Math & Data Science Club (NSDC)',
      roles: [
        {
          title: 'President',
          period: 'Current',
          description: 'Lead efforts to engage students, provide personal and professional growth opportunities, and demystify the challenges of STEM through workshops, mentoring, and hands-on projects.',
          icon: <FaCode />
        }
      ]
    },
    {
      name: 'National Society of Black Engineers (NSBE)',
      roles: [
        {
          title: 'Parliamentarian',
          period: 'Current',
          description: 'Ensure meetings follow proper parliamentary procedure and support chapter activities.',
          icon: <FaGavel />
        }
      ]
    },
    {
      name: 'Campus Technology & Library Learning Resources Committee',
      roles: [
        {
          title: 'SGA Appointed Student Member',
          period: 'Current',
          description: 'Help improve library resources based on student input.',
          icon: <FaBook />
        }
      ]
    },
    {
      name: 'Apple Coding Club, HTU',
      roles: [
        {
          title: 'Member',
          period: 'Current',
          description: "Collaborating on building Swift-based applications, focusing on Apple's technology and software.",
          icon: <FaLaptopCode />
        }
      ]
    }
  ]

  return (
    <section id="extracurricular" className="extracurricular-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">04.</span>
          <span className="title-text">Extracurricular Activities</span>
        </h2>
        <div className="organizations-container">
          {organizations.map((org, orgIndex) => (
            <div key={orgIndex} className="organization-card">
              <h3 className="organization-name">{org.name}</h3>
              <div className="roles-timeline">
                {org.roles.map((role, roleIndex) => (
                  <div 
                    key={roleIndex} 
                    className={`role-item ${role.period === 'Current' ? 'current' : 'previous'}`}
                  >
                    <div className="role-header">
                      <div className="role-icon">{role.icon}</div>
                      <div className="role-info">
                        <h4 className="role-title">{role.title}</h4>
                        <span className={`role-period ${role.period === 'Current' ? 'current-badge' : 'previous-badge'}`}>
                          {role.period}
                        </span>
                      </div>
                    </div>
                    <p className="role-description">{role.description}</p>
                    {role.link && (
                      <a
                        href={role.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="role-link"
                      >
                        Watch Presentation →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Extracurricular

import { useEffect, useRef } from 'react'
import { FaBriefcase } from 'react-icons/fa'
import './Experience.css'

const Experience = () => {
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

  const experiences = [
    {
      title: 'Python Instructor',
      company: 'Huston-Tillotson University',
      period: 'October 2025 – November 2025',
      location: 'Austin, TX',
      description: [
        'Taught foundational Python programming to a group of 10 students, covering core concepts from variables and input/output to advanced data structures',
        'Delivered comprehensive curriculum including conditionals, logic operators, string methods, data structures (lists, sets, tuples, dictionaries), loops, and functions',
        'Guided students through hands-on learning and practical application, enabling them to successfully implement all concepts in their capstone projects of choice'
      ]
    },
    {
      title: 'Intern',
      company: 'Salesforce',
      period: 'June 2025 – August 2025',
      location: 'San Francisco, CA',
      description: [
        'Selected for the competitive Futureforce Tech Launchpad program (Salesforce & CodePath), completing 5 weeks of intensive technical training',
        'Collaborated in a team of three to design, build, and deploy VolunteerGo, a full-stack web application, in 3.5 weeks',
        'Applied agile development practices, integrated APIs, and delivered user-focused features under tight deadlines, enhancing technical and teamwork skills'
      ],
      highlight: 'Futureforce Tech Launchpad'
    },
    {
      title: 'Student Academic Success & Peer Learning Coach',
      company: 'Huston-Tillotson University',
      period: 'January 2024 – August 2025',
      location: 'Austin, TX',
      description: [
        'Mentor 5 students, improving academic success through proactive outreach, communication, and tailored support',
        'Utilize critical thinking to address challenges and provide solutions for student progress',
        'Tutor students in Computer Science, Mathematics, French, and Writing, achieving a 97% homework completion rate',
        'Model problem-solving approaches, demonstrating effective communication and leadership'
      ]
    },
    {
      title: 'Computer Vision Developer',
      company: 'Primeberry Team (ASABE Competition)',
      period: 'January 2024 – June 2024',
      location: 'Anaheim, CA',
      description: [
        'Developed a high-accuracy object detection and classification algorithm using OpenCV, demonstrating strong problem-solving and attention to detail',
        'Integrated RTSP video streaming, CSV data logging, and custom launch files to optimize functionality and ensure seamless operation',
        'Enhanced robot performance for ASABE Competition through advanced computer vision techniques'
      ],
      highlight: 'ASABE Competition'
    },
    {
      title: 'Volunteer Data Clerk',
      company: 'ACETS Nigeria',
      period: 'April 2022 – August 2022',
      location: 'Jos, Plateau, Nigeria',
      description: [
        'Collaborated with staff to enroll over 2,000 households into the OVC project',
        'Maintained confidential records and filing systems',
        'Ensured compliance with strict deadlines while managing sensitive information'
      ]
    }
  ]

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">03.</span>
          <span className="title-text">Experience</span>
        </h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-icon">
                <FaBriefcase />
              </div>
              <div className="experience-content">
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-company">{exp.company}</p>
                <p className="experience-meta">
                  <span className="highlight">{exp.highlight || exp.period}</span>
                  {exp.highlight && <span className="period"> • {exp.period}</span>}
                  <span className="location"> • {exp.location}</span>
                </p>
                <ul className="experience-description">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

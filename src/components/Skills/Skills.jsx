import { useEffect, useRef } from 'react'
import SkillsCarousel from './SkillsCarousel'
import './Skills.css'

const Skills = () => {
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

  // Combined skills array
  const skills = [
    'HTML/CSS', 'Business Analytics', 'Python', 'Excel, Numbers, Sheets', 'Data Analysis', 
    'NumPy', 'Pandas', 'Seaborn', 'Bash', 'Data Structures & Algorithms', 'Firebase', 
    'OpenCV', 'PowerPoint, Keynote, Slides', 'PowerShell', 'Public Speaking', 
    'Web Development', 'CSI Camera Integration', 'Github', 'Version Control', 
    'Word, Pages, Docs', 'Matplotlib', 'React.js', 'Node.js', 'Postman', 'PostgreSQL', 'Web Scraping',
    'Data Science', 'Tableau', 'JavaScript', 'Natural Language Processing (NLP)', 
    'Tensorflow', 'GPU', 'Jupyter', 'Machine Learning', 'R', 'Pytorch', 'CUDA', 
    'iOS/Swift', 'Salesforce', 'AWS', 'Postgres', 'Linux/Unix', 'Cryptography', 
    'Java', 'Access', 'Computer Vision', 'C/C++'
  ]

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">05.</span>
          <span className="title-text">Skills</span>
        </h2>
        <SkillsCarousel skills={skills} />
      </div>
    </section>
  )
}

export default Skills

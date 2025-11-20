import { useEffect, useRef } from 'react'
import ShuffleText from '../ShuffleText/ShuffleText'
import LanyardIDCard from '../LanyardIDCard/LanyardIDCard'
import './About.css'

const About = () => {
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
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="animated-background"></div>
      <div className="container">
        <div className="about-content">
          <div className="about-lanyard-wrapper">
            <LanyardIDCard imageUrl="/Futureforce Day Goated Headshot.jpg" />
            <div className="about-text">
              <h1 className="about-title">
                <span className="greeting">Hey there!</span>
                <span className="name">
                  I'm <ShuffleText text="Ayomide Isinkaye" />
                </span>
              </h1>
              <p className="pronunciation">Pronounced "Ah-yaw-mee-day"</p>
              <div className="about-description">
                <p>
                  I am a third year Computer Science and Mathematics student at{' '}
                  <a 
                    href="https://htu.edu/" 
                    className="school-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Huston-Tillotson University</span>
                  </a>, and my major interests lie in software engineering, specifically machine learning, 
                  data science, artificial intelligence - you know the drill!
                </p>
                <p>
                  While working towards being skilled enough to pursue my interests successfully, I've 
                  learned to use cool technologies like <strong>Python</strong>, <strong>React</strong>,  <strong>Javascript</strong>, 
                  <strong>Swift</strong>, <strong>Java</strong>, <strong>OpenCV</strong>, 
                  <strong>Linux Systems</strong>, <strong>GitHub</strong>, 
                  and <strong>GPUs</strong> like the Jetson Nano. I have also worked on projects that 
                  have helped me build data visualization skills, data analysis skills, a lot of data 
                  stuff 😄.
                </p>
                <p>
                  I've learnt a lot from extraordinary people around me, leading up to building cool 
                  stuff with cool people, which has also helped me develop my leadership, teamwork, 
                  communication, and critical thinking skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
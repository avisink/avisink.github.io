import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import './Projects.css'

const Projects = () => {
  const sectionRef = useRef(null)
  const [expandedCards, setExpandedCards] = useState(new Set())

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

  const projects = [
    {
      title: 'VolunteerGo',
      description: 'Collaborated in a team to develop VolunteerGo, a gamified web platform addressing the challenge of low long-term volunteer engagement. Designed and implemented core features to boost user interaction, aiming to improve volunteer retention through rewards-based participation tracking and community-building tools.',
      icon: '/images/data_analysis_icon.png',
      link: 'https://github.com/ftl-pod/VolunteerGo',
      demoLink: 'https://www.loom.com/share/5354b615e44840668194fdd97f940cff',
      type: 'github',
      period: 'June 2025 – August 2025',
      location: 'San Francisco, CA'
    },
    {
      title: 'RamCore',
      description: 'Taking 1st place with my teammate, RamCore was built for the 2025 HBCU Apple Coding Club competition at Huston-Tillotson\'s Inaugural AiCON. A comprehensive campus app featuring a real-time shuttle tracker with rideshare feature, Rammy (AI chatbot powered by Gemini LLM for advisor assistance), and tutoring schedule feature. Designed to address unique HBCU campus challenges.',
      icon: '/images/machine_learning_icon.png',
      link: 'https://github.com/avisink/RamCore',
      demoLink: 'https://drive.google.com/file/d/1wdEnz3cOgaMzlHpZaIJewbC0z0g3_YiL/view?usp=sharing',
      type: 'github',
      period: '2025',
      location: 'Huston-Tillotson University'
    },
    {
      title: 'Health Risk Intelligence Platform',
      description: 'An exploratory analysis of health datasets with dashboard creation. Analyzes different age groups from US states and territories to form a prediction dashboard where users can input their health info (age group, state, BMI, lifestyle) to see risk levels for diseases like diabetes, heart attack, COPD, etc. Features ML clustering with KMeans, PCA, and comprehensive health persona discovery.',
      icon: '/images/data_analysis_icon.png',
      link: 'https://github.com/avisink/Health_ML_Project',
      type: 'github',
      period: 'Ongoing',
      location: 'Remote'
    },
    {
      title: 'StudyBuddy',
      description: 'An innovative AI-powered learning platform that automatically converts notes into interactive quizzes. Features multiple study modes (Multiple Choice, Fill-in-the-Blanks, True/False), adaptive learning, progress tracking, dark/light mode, file organization, and mobile-responsive design.',
      icon: '/images/data_analysis_icon.png',
      link: '#',
      type: 'github',
      period: 'Ongoing',
      location: 'Remote'
    },
    {
      title: 'ireNet',
      description: 'A group project to practice making databases. Irenet is a simplified full-stack service that matches donors (who want to give items like canned food, clothes, or supplies) with organizations that help distribute them.',
      icon: '/images/data_analysis_icon.png',
      link: 'https://github.com/avisink/irenet',
      type: 'github',
      period: '2025',
      location: 'Remote'
    },
    {
      title: 'Object Detection Algorithm for Robotics Competition (ASABE)',
      description: 'Developed a high-accuracy object detection and classification algorithm using OpenCV, demonstrating strong problem-solving and attention to detail to enhance robot performance. Integrated RTSP video streaming, CSV data logging, and custom launch files.',
      icon: '/images/machine_learning_icon.png',
      link: 'https://github.com/A-wakil/src/tree/main/jetson_ayo',
      type: 'github',
      period: 'January 2024 – June 2024',
      location: 'Anaheim, CA'
    },
    {
      title: 'Data Analysis Projects (DataCamp & NSDC)',
      description: 'Currently processing and analyzing large datasets (NYC transportation data) using Python and geospatial mapping to identify trends, patterns, and anomalies. Developed dashboards summarizing key insights and supported data cleansing and quality assurance processes.',
      icon: '/images/data_analysis_icon.png',
      link: 'https://www.datacamp.com/datalab/w/f11c19b8-2486-47d6-84a9-d6f3c43d746b/edit',
      type: 'external',
      period: '2022 – 2025',
      location: 'Remote'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, sophisticated React portfolio website with smooth animations, responsive design, and elegant UI. Built with React, Vite, and modern CSS. Features component-based architecture, intersection observer animations, and a professional design.',
      icon: '/images/data_analysis_icon.png',
      link: 'https://github.com/avisink/avisink.github.io',
      demoLink: 'https://avisink.github.io',
      type: 'github',
      period: '2025',
      location: 'Remote'
    },
    {
      title: 'KudosBoard',
      description: 'A full-stack group project to practice collaboration. Features include board creation and management, card posting with GIPHY integration, upvoting system, search and filter functionality, and category-based organization. Built with modern web technologies.',
      icon: '/images/data_analysis_icon.png',
      link: 'https://github.com/avisink/kudosboard',
      demoLink: 'https://www.loom.com/share/51c1bf5f61914477a2510b309a476ee6',
      type: 'github',
      period: '2025',
      location: 'Remote'
    },
    {
      title: 'Sudoku Puzzle Solver',
      description: 'A fully-featured Sudoku game built with Python and Pygame featuring an interactive GUI with an auto-solve algorithm, multiple difficulty levels that progressively increase in complexity, and built-in timers to track solving performance. The game includes a clean, user-friendly interface with intuitive controls for number placement and puzzle navigation.',
      icon: '/images/sudoku_icon.png',
      link: 'https://github.com/avisink/sudoku',
      type: 'github',
      period: '2024 - 2025',
      location: 'Remote'
    },
    {
      title: 'Student Store',
      description: 'A practice project focused on taking over existing code and resuming development using agile methodologies. Built a full-stack e-commerce application with Prisma and PostgreSQL. Features product and order management, CRUD operations, transaction handling, and a complete frontend integration with shopping cart functionality.',
      icon: '/images/data_analysis_icon.png',
      link: 'https://github.com/avisink/student-store',
      demoLink: 'https://www.canva.com/design/DAGrgZQ-u84/1NDTPZcoLyDEMX-8wcW4XA/watch?utm_content=DAGrgZQ-u84&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1fc28febb4',
      type: 'github',
      period: '2025',
      location: 'Remote'
    },
    {
      title: 'Flixster',
      description: 'A movie database application using The Movie Database API. Features include movie grid display, search functionality, sorting options, modal pop-ups with detailed movie information, embedded trailers, favorite and watched tracking, responsive design, and accessibility features. Deployed on Render.',
      icon: '/images/data_analysis_icon.png',
      link: 'https://github.com/avisink/flixster-unit3',
      demoLink: 'https://avisink-flixster.onrender.com/',
      type: 'github',
      period: '2025',
      location: 'Remote'
    },
    {
      title: 'Music Playlist Explorer',
      description: 'An interactive music playlist application with dynamic rendering, playlist details modal, like functionality, shuffle songs feature, and a featured page with random playlist selection. Includes responsive design and smooth user interactions.',
      icon: '/images/data_analysis_icon.png',
      link: 'https://github.com/avisink/music-playlist-explorer',
      demoLink: 'https://music-playlist-explorer-by-ayo.netlify.app/',
      type: 'github',
      period: '2025',
      location: 'Remote'
    },
    {
      title: 'Globetrotter',
      description: 'A travel website featuring destination information, top attractions, photo gallery, and guide pages (Food/Accommodations/Events). Built with Flexbox and CSS Grid, includes responsive design, interactive navigation with dropdown menus, travel newsletter form, and custom styling with Google Fonts.',
      icon: '/images/data_analysis_icon.png',
      link: 'https://github.com/avisink/globetrotter',
      demoLink: 'https://drive.google.com/file/d/1Lnk492MH19kasvn8ZKx0cqiTdUCg00NJ/preview',
      type: 'github',
      period: '2025',
      location: 'Remote'
    }
  ]

  const toggleCard = (index) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">02.</span>
          <span className="title-text">Projects</span>
        </h2>
        <div className="projects-grid">
          {projects.map((project, index) => {
            const isExpanded = expandedCards.has(index)
            return (
              <div 
                key={index} 
                className={`project-card ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleCard(index)}
              >
                <div className="project-card-inner">
                  <div className="project-header">
                    <div className="project-icon-wrapper">
                      <img 
                        src={project.icon} 
                        alt={`${project.title} icon`} 
                        className="project-icon"
                      />
                    </div>
                    <div className="project-links" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label={`View ${project.title} on ${project.type === 'github' ? 'GitHub' : 'external site'}`}
                      >
                        {project.type === 'github' ? (
                          <FaGithub className="link-icon" />
                        ) : (
                          <FaExternalLinkAlt className="link-icon" />
                        )}
                      </a>
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link demo-link"
                          aria-label={`View ${project.title} demo`}
                          title="View Demo"
                        >
                          <FaExternalLinkAlt className="link-icon" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  {project.period && (
                    <p className="project-meta">
                      <span className="project-period">{project.period}</span>
                      {project.location && <span className="project-location"> • {project.location}</span>}
                    </p>
                  )}
                  <div className={`project-description-wrapper ${isExpanded ? 'expanded' : ''}`}>
                    <div className="project-description-content">
                      <p className="project-description">{project.description}</p>
                    </div>
                  </div>
                  <div className="project-expand-hint">
                    {isExpanded ? 'Click to collapse' : 'Click to see more'}
                  </div>
                </div>
                <div className="project-reveal-effect"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects

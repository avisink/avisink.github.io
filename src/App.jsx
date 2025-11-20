import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Extracurricular from './components/Extracurricular/Extracurricular'
import Skills from './components/Skills/Skills'
import Awards from './components/Awards/Awards'
import Certifications from './components/Certifications/Certifications'
import Contact from './components/Contact/Contact'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'experience', 'extracurricular', 'skills', 'awards', 'certifications', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ThemeProvider>
      <div className="App">
        <Navbar activeSection={activeSection} />
        <main>
          <About />
          <Projects />
          <Experience />
          <Extracurricular />
          <Skills />
          <Awards />
          <Certifications />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App

import { useEffect, useRef, useState } from 'react'
import './SkillsCarousel.css'

const SkillsCarousel = ({ skills }) => {
  const carouselRef = useRef(null)
  const animationFrameRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [hoveredCard, setHoveredCard] = useState(null)

  // Ensure skills is an array (handle both flat arrays and nested arrays)
  const allSkills = Array.isArray(skills) 
    ? (skills.length > 0 && Array.isArray(skills[0]) ? skills.flat() : skills)
    : []

  // Duplicate skills for seamless infinite scroll
  const duplicatedSkills = [...allSkills, ...allSkills, ...allSkills]

  // Drag scroll functionality
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
    carouselRef.current.style.cursor = 'grabbing'
  }

  const handleCarouselMouseLeave = () => {
    setIsDragging(false)
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  // Touch support for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !carouselRef.current) return
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Infinite auto-scroll animation
  useEffect(() => {
    if (!carouselRef.current || isDragging || isPaused) return

    const scrollSpeed = 0.5 // Slow and steady (pixels per frame)
    let scrollPosition = 0

    const animate = () => {
      if (!carouselRef.current || isDragging || isPaused) return

      scrollPosition += scrollSpeed
      carouselRef.current.scrollLeft = scrollPosition

      // Reset scroll position when reaching halfway point (seamless loop)
      const maxScroll = carouselRef.current.scrollWidth / 3 // Since we tripled the content
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0
        carouselRef.current.scrollLeft = 0
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isDragging, isPaused, allSkills.length])

  // Pause on hover
  const handleWrapperMouseEnter = () => {
    setIsPaused(true)
  }

  const handleWrapperMouseLeave = () => {
    setIsPaused(false)
  }

  return (
    <div 
      className="skills-carousel-wrapper"
      onMouseEnter={handleWrapperMouseEnter}
      onMouseLeave={handleWrapperMouseLeave}
    >
      <div
        ref={carouselRef}
        className="skills-carousel"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleCarouselMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {duplicatedSkills.map((skill, index) => (
          <SkillCard
            key={`${skill}-${index}`}
            skill={skill}
            index={index}
            isHovered={hoveredCard === index}
            onHover={() => setHoveredCard(index)}
            onLeave={() => setHoveredCard(null)}
          />
        ))}
      </div>
    </div>
  )
}

const SkillCard = ({ skill, index, isHovered, onHover, onLeave }) => {
  const cardRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      setMousePosition({ x, y })
    }

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered])

  const magneticX = isHovered ? mousePosition.x * 0.2 : 0
  const magneticY = isHovered ? mousePosition.y * 0.2 : 0

  return (
    <div
      ref={cardRef}
      className={`skill-card ${isHovered ? 'hovered' : ''}`}
      style={{
        transform: `translate(${magneticX}px, ${magneticY}px)`,
        animationDelay: `${index * 0.05}s`
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="skill-card-content">
        <span className="skill-name">{skill}</span>
      </div>
    </div>
  )
}

export default SkillsCarousel


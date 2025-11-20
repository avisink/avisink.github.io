import { useEffect, useRef, useState } from 'react'
import './ShuffleText.css'

const ShuffleText = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState('')
  const elementRef = useRef(null)
  const intervalRef = useRef(null)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*() '
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let iteration = 0
    const originalText = text
    const duration = 3000 // 3 seconds

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)

      // Calculate how many characters should be revealed
      const revealCount = Math.floor(easeOut * originalText.length)
      
      // Shuffle the remaining characters
      const shuffled = originalText
        .split('')
        .map((char, index) => {
          if (index < revealCount) {
            return originalText[index]
          }
          if (char === ' ') {
            return ' '
          }
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')

      setDisplayText(shuffled)

      if (progress < 1) {
        intervalRef.current = setTimeout(animate, 30)
      } else {
        setDisplayText(originalText)
      }
    }

    // Start animation when element is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(element)

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
      }
      observer.disconnect()
    }
  }, [text])

  return (
    <span ref={elementRef} className={`shuffle-text ${className}`}>
      {displayText || text}
    </span>
  )
}

export default ShuffleText


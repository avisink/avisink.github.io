import { useRef, useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './InteractiveCard.css';

export default function InteractiveCard({ imageUrl = '/Futureforce Day Goated Headshot.jpg' }) {
  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);
  const { theme } = useTheme();
  
  const animationFrameRef = useRef(null);
  const particleAnimationRef = useRef(null);
  const targetRotateX = useRef(0);
  const targetRotateY = useRef(0);
  const targetTranslateZ = useRef(0);
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const velocityZ = useRef(0);

  // Initialize particles
  useEffect(() => {
    const colors = theme === 'dark' 
      ? ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b']
      : ['#667eea', '#764ba2', '#f093fb', '#a78bfa', '#c084fc'];
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 280 + 10,
        y: Math.random() * 280 + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setParticles(newParticles);
  }, [theme]);

  // Smooth physics-based rotation animation
  useEffect(() => {
    if (!isHovered) {
      // When not hovering, smoothly return to center
      targetRotateX.current = 0;
      targetRotateY.current = 0;
      targetTranslateZ.current = 0;
    }

    // spring physics constants
    const spring = 0.15; // spring strength
    const damping = 0.8; // damping factor
    const maxRotation = 35; // max rotation 
    const maxTranslateZ = 30; // max depth in px 

    const animate = () => {
      if (!cardInnerRef.current) return;

      // spring forces
      const forceX = (targetRotateX.current - rotateX) * spring;
      const forceY = (targetRotateY.current - rotateY) * spring;
      const forceZ = (targetTranslateZ.current - translateZ) * spring;

      // Update velocities with damping
      velocityX.current = (velocityX.current + forceX) * damping;
      velocityY.current = (velocityY.current + forceY) * damping;
      velocityZ.current = (velocityZ.current + forceZ) * damping;

      // Update positions
      const newRotateX = Math.max(-maxRotation, Math.min(maxRotation, rotateX + velocityX.current));
      const newRotateY = Math.max(-maxRotation, Math.min(maxRotation, rotateY + velocityY.current));
      const newTranslateZ = Math.max(0, Math.min(maxTranslateZ, translateZ + velocityZ.current));

      setRotateX(newRotateX);
      setRotateY(newRotateY);
      setTranslateZ(newTranslateZ);

      // Apply transforms
      cardInnerRef.current.style.setProperty('--rotate-x', `${newRotateX}deg`);
      cardInnerRef.current.style.setProperty('--rotate-y', `${newRotateY}deg`);
      cardInnerRef.current.style.setProperty('--translate-z', `${newTranslateZ}px`);

      // Continue animation if there's movement or we're hovering
      const isMoving = Math.abs(velocityX.current) > 0.01 || 
                       Math.abs(velocityY.current) > 0.01 || 
                       Math.abs(velocityZ.current) > 0.01;
      const notAtTarget = Math.abs(targetRotateX.current - rotateX) > 0.1 ||
                          Math.abs(targetRotateY.current - rotateY) > 0.1 ||
                          Math.abs(targetTranslateZ.current - translateZ) > 0.1;
      
      // Keep animating if moving, hovering (always animate when hovering), or not at target
      if (isMoving || isHovered || notAtTarget) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Always start animation when component mounts or dependencies change
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [rotateX, rotateY, translateZ, isHovered, isFlipped]);

  // Animate particles
  useEffect(() => {
    if (!isHovered || isFlipped) return;
    
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        let newVx = particle.vx;
        let newVy = particle.vy;

        // Bounce off walls
        if (newX <= 0 || newX >= 300) {
          newVx = -particle.vx;
          newX = Math.max(0, Math.min(300, newX));
        }
        if (newY <= 0 || newY >= 300) {
          newVy = -particle.vy;
          newY = Math.max(0, Math.min(300, newY));
        }

        // Magnetic effect towards mouse
        const dx = mousePos.x - newX;
        const dy = mousePos.y - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 80 && distance > 0) {
          const force = (80 - distance) / 80;
          newVx += (dx / distance) * force * 0.2;
          newVy += (dy / distance) * force * 0.2;
        }

        // Limit velocity
        const speed = Math.sqrt(newVx * newVx + newVy * newVy);
        if (speed > 2) {
          newVx = (newVx / speed) * 2;
          newVy = (newVy / speed) * 2;
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx * 0.98,
          vy: newVy * 0.98
        };
      }));
      particleAnimationRef.current = requestAnimationFrame(animateParticles);
    };

    particleAnimationRef.current = requestAnimationFrame(animateParticles);
    return () => {
      if (particleAnimationRef.current) {
        cancelAnimationFrame(particleAnimationRef.current);
      }
    };
  }, [isHovered, mousePos, isFlipped]);

  const updateTilt = (clientX, clientY) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    
    // Calculate target rotations (more pronounced)
    // Invert Y so up = rotate up (more intuitive)
    targetRotateX.current = -y * 35; // Increased for more tilt
    targetRotateY.current = x * 35;  // Increased for more tilt
    targetTranslateZ.current = Math.abs(x) * 15 + Math.abs(y) * 15; // Increased depth based on tilt
    
    setMousePos({
      x: (clientX - rect.left),
      y: (clientY - rect.top)
    });
  };

  const handleMouseMove = (e) => {
    updateTilt(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent scrolling
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updateTilt(touch.clientX, touch.clientY);
    }
  };

  const handleMouseLeave = () => {
    // Smoothly return to center
    targetRotateX.current = 0;
    targetRotateY.current = 0;
    targetTranslateZ.current = 0;
    setIsHovered(false);
  };

  const handleTouchEnd = () => {
    // Smoothly return to center
    targetRotateX.current = 0;
    targetRotateY.current = 0;
    targetTranslateZ.current = 0;
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="interactive-card-wrapper">
      <div
        ref={cardRef}
        className={`interactive-card ${isHovered ? 'hovered' : ''} ${isFlipped ? 'flipped' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setIsHovered(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        <div ref={cardInnerRef} className="interactive-card-inner">
          {/* Front Side */}
          <div className="interactive-card-face interactive-card-front">
            {/* Animated gradient background */}
            <div className={`interactive-card-gradient ${isHovered ? 'animated' : ''}`} />

            {/* Glassmorphism overlay */}
            <div className="interactive-card-glass" />

            {/* Floating particles */}
            {!isFlipped && particles.map((particle) => (
              <div key={particle.id} className="particle-container">
                {/* Particle glow effect */}
                <div
                  className="particle-glow"
                  style={{
                    width: `${particle.size * 2}px`,
                    height: `${particle.size * 2}px`,
                    left: `${particle.x - particle.size}px`,
                    top: `${particle.y - particle.size}px`,
                    background: `radial-gradient(circle, ${particle.color}80 0%, ${particle.color}40 40%, transparent 70%)`,
                    filter: 'blur(8px)',
                  }}
                />
                {/* Main particle */}
                <div
                  className="particle-main"
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    left: `${particle.x}px`,
                    top: `${particle.y}px`,
                    background: `linear-gradient(135deg, ${particle.color} 0%, ${particle.color}cc 100%)`,
                    boxShadow: `0 0 ${particle.size}px ${particle.color}80, 0 0 ${particle.size * 2}px ${particle.color}40`,
                  }}
                />
              </div>
            ))}

            {/* Interactive glow that follows mouse */}
            <div
              className="interactive-glow"
              style={{
                left: `${mousePos.x - 64}px`,
                top: `${mousePos.y - 64}px`,
                opacity: isHovered ? 0.6 : 0,
              }}
            />

            {/* Content */}
            <div className="interactive-card-content">
              {/* Photo area */}
              <div className="interactive-card-photo">
                <div className="interactive-card-photo-frame">
                  <img 
                    src={imageUrl}
                    alt="Profile"
                    className="interactive-card-image"
                  />
                </div>
              </div>

              {/* Bottom info section */}
              <div className="interactive-card-info">
                <div className="interactive-card-name">
                  <h3>Ayomide Isinkaye</h3>
                </div>
                
                <div className="interactive-card-subtitle">
                  Junior @ Huston-Tillotson University
                </div>

                <p className="interactive-card-hint">
                  Click/Tap to see more!
                </p>
              </div>
            </div>

            {/* Ripple effect on hover */}
            {isHovered && (
              <div className="interactive-card-ripple" />
            )}
          </div>

          {/* Back Side */}
          <div className="interactive-card-face interactive-card-back">
            {/* Back gradient */}
            <div className="interactive-card-back-gradient" />

            {/* Back content */}
            <div className="interactive-card-content interactive-card-back-content">
              {/* Header */}
              <div className="interactive-card-header">
                <span>About Me</span>
                <span>2026</span>
              </div>

              {/* Majors Section */}
              <div className="interactive-card-majors">
                <h4>Majors</h4>
                <div className="interactive-card-grid">
                  <div className="interactive-card-major-card major-cs">
                    <div className="major-icon">💻</div>
                    <span>Computer Science</span>
                  </div>
                  <div className="interactive-card-major-card major-math">
                    <div className="major-icon">📐</div>
                    <span>Math</span>
                  </div>
                </div>
              </div>

              {/* Hobbies Section */}
              <div className="interactive-card-hobbies">
                <h4>Hobbies & Interests</h4>
                <div className="interactive-card-grid">
                  <div className="interactive-card-hobby-card hobby-photo">
                    <span className="hobby-icon">📸</span>
                    <span>Photography</span>
                  </div>
                  <div className="interactive-card-hobby-card hobby-read">
                    <span className="hobby-icon">📚</span>
                    <span>Reading</span>
                  </div>
                  <div className="interactive-card-hobby-card hobby-robot">
                    <span className="hobby-icon">🤖</span>
                    <span>Robotics</span>
                  </div>
                  <div className="interactive-card-hobby-card hobby-lang">
                    <span className="hobby-icon">🌍</span>
                    <span>Languages & More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div className={`interactive-card-shadow ${isFlipped ? 'flipped' : ''}`} />
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { User, MapPin, Code } from 'lucide-react';
import './LanyardIDCard.css';

export default function LanyardIDCard({ imageUrl = null }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const cardRef = useRef(null);
  const animationRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  const LANYARD_LENGTH = 150;
  const SPRING_STRENGTH = 0.03;
  const DAMPING = 0.92;
  const GRAVITY = 0.3;

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;

      const rect = aboutSection.getBoundingClientRect();
      
      if (rect.bottom < 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDragging) return;

    const animate = () => {
      setPosition(prev => {
        const distance = Math.sqrt(prev.x * prev.x + prev.y * prev.y);
        
        const springForceX = -prev.x * SPRING_STRENGTH;
        const springForceY = -prev.y * SPRING_STRENGTH;
        
        let newVelX = velocity.x + springForceX;
        let newVelY = velocity.y + springForceY + GRAVITY;
        
        newVelX *= DAMPING;
        newVelY *= DAMPING;
        
        setVelocity({ x: newVelX, y: newVelY });
        
        let newX = prev.x + newVelX;
        let newY = prev.y + newVelY;
        
        const newDistance = Math.sqrt(newX * newX + newY * newY);
        if (newDistance > LANYARD_LENGTH) {
          const angle = Math.atan2(newY, newX);
          newX = Math.cos(angle) * LANYARD_LENGTH;
          newY = Math.sin(angle) * LANYARD_LENGTH;
          
          setVelocity(v => ({
            x: v.x * -0.5,
            y: v.y * -0.5
          }));
        }
        
        setRotation(newVelX * 0.5);
        
        return { x: newX, y: newY };
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, velocity]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = Date.now();
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime.current;
    
    const deltaX = e.clientX - lastPos.current.x;
    const deltaY = e.clientY - lastPos.current.y;
    
    setPosition(prev => {
      const newX = prev.x + deltaX;
      const newY = prev.y + deltaY;
      
      const distance = Math.sqrt(newX * newX + newY * newY);
      
      if (distance > LANYARD_LENGTH) {
        const angle = Math.atan2(newY, newX);
        return {
          x: Math.cos(angle) * LANYARD_LENGTH,
          y: Math.sin(angle) * LANYARD_LENGTH
        };
      }
      
      return { x: newX, y: newY };
    });
    
    if (deltaTime > 0) {
      setVelocity({
        x: deltaX / deltaTime * 16,
        y: deltaY / deltaTime * 16
      });
    }
    
    lastPos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = currentTime;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const containerRef = useRef(null);
  const [anchorPoint, setAnchorPoint] = useState({ x: 150, y: 0 });

  useEffect(() => {
    const calculateAnchorPosition = () => {
      if (!containerRef.current) return;
      
      // Get navbar and its position
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      
      const navbarRect = navbar.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Get the "About" link position in the navbar
      const aboutLink = navbar.querySelector('a[href="#about"]');
      let anchorX = containerRect.width / 2; // Default to center
      
      if (aboutLink) {
        const linkRect = aboutLink.getBoundingClientRect();
        // Position anchor horizontally aligned with the About link
        // Relative to the container (accounting for container's extended area)
        anchorX = linkRect.left + (linkRect.width / 2) - containerRect.left;
      }
      
      // Position anchor at the navbar level
      // Container extends upward with negative margin, so anchor is at top of extended area
      // navbarRect.bottom is where navbar ends, containerRect.top is where container starts
      // Since container has negative margin-top, we need to account for that
      const anchorY = navbarRect.bottom - containerRect.top;
      
      setAnchorPoint({ x: anchorX, y: anchorY });
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(calculateAnchorPosition, 100);
    
    // Calculate on mount, resize, and scroll
    calculateAnchorPosition();
    window.addEventListener('resize', calculateAnchorPosition);
    window.addEventListener('scroll', calculateAnchorPosition);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateAnchorPosition);
      window.removeEventListener('scroll', calculateAnchorPosition);
    };
  }, []);

  const anchorX = anchorPoint.x;
  const anchorY = anchorPoint.y;

  return (
    <div ref={containerRef} className="lanyard-container">
      <div className={`lanyard-wrapper ${isVisible ? 'lanyard-visible' : 'lanyard-hidden'}`}>
        <svg className="lanyard-svg">
          <defs>
            <linearGradient id="lanyardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            
            <pattern id="stitching" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
              <line x1="10" y1="2" x2="10" y2="8" stroke="#e9d5ff" strokeWidth="0.5" strokeDasharray="2,2" />
            </pattern>
          </defs>
          
          <path
            d={`M ${anchorX} ${anchorY} 
                Q ${anchorX + position.x * 0.3} ${anchorY + position.y * 0.3 - 20},
                ${anchorX + position.x} ${anchorY + position.y}`}
            stroke="url(#lanyardGradient)"
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
          />
          
          <path
            d={`M ${anchorX} ${anchorY} 
                Q ${anchorX + position.x * 0.3} ${anchorY + position.y * 0.3 - 20},
                ${anchorX + position.x} ${anchorY + position.y}`}
            stroke="#7c3aed"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          <path
            d={`M ${anchorX} ${anchorY} 
                Q ${anchorX + position.x * 0.3} ${anchorY + position.y * 0.3 - 20},
                ${anchorX + position.x} ${anchorY + position.y}`}
            stroke="url(#stitching)"
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
          />
          
          <circle cx={anchorX} cy={anchorY} r="6" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
          <circle cx={anchorX} cy={anchorY} r="3" fill="#475569" />
        </svg>

        <div 
          ref={cardRef}
          onMouseDown={handleMouseDown}
          className={`lanyard-card-wrapper ${isDragging ? 'dragging' : ''}`}
          style={{
            left: `${anchorX + position.x}px`,
            top: `${anchorY + position.y}px`,
            transform: `translate(-50%, 0) rotate(${rotation}deg)`,
          }}
        >
          <div className="lanyard-hole">
            <div className="lanyard-hole-inner"></div>
          </div>

          <div className="lanyard-card">
            <div className="lanyard-header">
              <div className="lanyard-header-content">
                <div className="lanyard-header-text">
                  <span className="lanyard-header-title">STUDENT ID</span>
                  <span className="lanyard-header-subtitle">Academic Year 2025-26</span>
                </div>
                <div className="lanyard-icon-circle">
                  <Code className="lanyard-icon" />
                </div>
              </div>
            </div>

            <div className="lanyard-avatar-container">
              <div className="lanyard-avatar">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="Profile" 
                    draggable="false"
                  />
                ) : (
                  <User className="lanyard-avatar-icon" />
                )}
              </div>
            </div>

            <div className="lanyard-content">
              <div className="lanyard-info">
                <h3 className="lanyard-name">Ayomide Isinkaye</h3>
                <p className="lanyard-major">Computer Science & Mathematics</p>
                <p className="lanyard-major-sub">Double Major</p>
              </div>

              <div className="lanyard-details">
                <div className="lanyard-detail-item">
                  <MapPin className="lanyard-detail-icon" />
                  <span>Huston-Tillotson University</span>
                </div>
                <div className="lanyard-detail-item">
                  <Code className="lanyard-detail-icon" />
                  <span>Year 3 • AI/ML Focus</span>
                </div>
              </div>

              <div className="lanyard-footer">
                <div className="lanyard-barcode">
                  {[3, 6, 2, 8, 4, 7, 2, 5, 8, 3, 6, 4, 7, 2].map((height, i) => (
                    <div 
                      key={i} 
                      className="lanyard-barcode-bar" 
                      style={{ height: `${height * 2 + 8}px` }}
                    ></div>
                  ))}
                </div>
                <p className="lanyard-barcode-text">
                  AVI-2025-CSMATH-001
                </p>
              </div>
            </div>

            <div className="lanyard-stripe"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
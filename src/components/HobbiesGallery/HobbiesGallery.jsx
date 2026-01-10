import { useEffect, useState } from 'react'
import './HobbiesGallery.css'

// Giphy API helper function
const fetchGiphyGif = async (searchTerm, apiKey) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=1&rating=g&lang=en`
    )
    const data = await response.json()
    if (data.data && data.data.length > 0) {
      return data.data[0].images.original.url
    }
    return null
  } catch (error) {
    console.error(`Error fetching GIF for ${searchTerm}:`, error)
    return null
  }
}

const HobbiesGallery = () => {
  const [hobbies, setHobbies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const hobbyData = [
    { text: 'Matcha & Boba Adventures', search: 'matcha bubble tea', emoji: '🧋' },
    { text: 'Photography', search: 'photography camera', emoji: '📸' },
    { text: 'Reading', search: 'reading books cozy', emoji: '📚' },
    { text: 'Karaoke', search: 'karaoke singing fun', emoji: '🎤' },
    { text: 'Exploring Cafes', search: 'nationa coffee day', emoji: '☕' },
    { text: 'Taking Walks', search: 'walking alone', emoji: '🚶‍♀️' },
    { text: 'Jewelry', search: 'jewelry accessories sparkle', emoji: '💎' },
    { text: 'Skincare', search: 'skincare routine self care', emoji: '✨' },
    { text: 'Embroidery & Sewing', search: 'embroidery sewing craft', emoji: '🧵' },
    { text: 'Arcade', search: 'arcade games fun', emoji: '🎮' },
    { text: 'Rollercoasters', search: 'rollercoaster theme park', emoji: '🎢' },
    { text: 'Skydiving', search: 'skydiving adventure', emoji: '🪂' },
    { text: 'Bungee Jumping', search: 'bungee jumping extreme', emoji: '🏔️' },
    { text: 'Perfumes & Scents', search: 'perfume fragrance aesthetic', emoji: '🌸' },
    { text: 'Concerts & Live Music', search: 'concert live music show', emoji: '🎵' },
    { text: 'Hiking', search: 'hiking nature trail', emoji: '🥾' }
  ]

  useEffect(() => {
    const loadGifs = async () => {
      const apiKey = import.meta.env.VITE_GIPHY_API_KEY
      
      setIsLoading(true)
      
      if (!apiKey) {
        console.warn('Giphy API key not found. Using placeholder images.')
        setHobbies(hobbyData.map(hobby => ({
          ...hobby,
          image: null
        })))
        setIsLoading(false)
        return
      }

      try {
        const hobbiesWithGifs = await Promise.all(
          hobbyData.map(async (hobby) => {
            const gifUrl = await fetchGiphyGif(hobby.search, apiKey)
            return {
              ...hobby,
              image: gifUrl
            }
          })
        )
        setHobbies(hobbiesWithGifs)
      } catch (error) {
        console.error('Error loading GIFs:', error)
        setHobbies(hobbyData.map(hobby => ({
          ...hobby,
          image: null
        })))
      } finally {
        setIsLoading(false)
      }
    }

    loadGifs()
  }, [])

  if (isLoading) {
    return (
      <div className="hobbies-gallery-loading">
        <div className="loading-spinner"></div>
        <p>Loading fun GIFs...</p>
      </div>
    )
  }

  return (
    <div className="hobbies-gallery">
      {hobbies.map((hobby, index) => (
        <div 
          key={index} 
          className="hobby-card"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="hobby-card-inner">
            {hobby.image ? (
              <div className="hobby-gif-container">
                <img 
                  src={hobby.image} 
                  alt={hobby.text}
                  className="hobby-gif"
                  loading="lazy"
                />
                <div className="hobby-overlay"></div>
              </div>
            ) : (
              <div className="hobby-placeholder">
                <span className="hobby-emoji-large">{hobby.emoji}</span>
              </div>
            )}
            <div className="hobby-caption">
              <span className="hobby-emoji">{hobby.emoji}</span>
              <h3 className="hobby-title">{hobby.text}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HobbiesGallery

import './HobbiesGallery.css'

const HobbiesGallery = () => {
  // Manually set GIF URLs - you can replace these with your favorite GIFs from Giphy or anywhere else!
  // Just right-click on a GIF on Giphy and "Copy GIF Link" or use the direct URL
  // Format: { text: 'Hobby Name', image: 'GIF_URL_HERE', emoji: '🎯' }
  const hobbies = [
    { text: 'Matcha & Boba Adventures', image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm92ZW9haGI2aXR1Y2UwMmhvajNlcmU2bjdqcjU2ZThtZjI4OGxlMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mBmtzfK6Iwyv4ZUaIY/giphy.gif', emoji: '🧋' },
    { text: 'Photography', image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmR6czVuc2ZrbGJiczI2eXRpa2M1OWxmc3BvYXpwdGZwM2hqbXo4NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xhX1qFxqmDNHG/giphy.gif', emoji: '📸' },
    { text: 'Reading', image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTAwZ2xuc3p4bHl4aGRuczZzZDFoOXBobGk0dHc1emUwanZqYmc1ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BwStBxZnY7wkr8xltb/giphy.gif', emoji: '📚' },
    { text: 'Karaoke', image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHpmZjFlN296NXN6dmRnMTk1czY0YjZhNWZ6ZDF6bXBiOHFycnZ1YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/143qWPF33HtSTK/giphy.gif', emoji: '🎤' },
    { text: 'Exploring Cafes', image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG1ocjVnYmN0NzMzY2FmODRtNDJ6a2lzMWI3MjFhdGI2Zmx2dnFpaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M4ecx9P2jI4tq/giphy.gif', emoji: '☕' },
    { text: 'Taking Walks', image: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Y3VyZGEycHZheHFteW9iOWo2aHFvYXFnbjNkeDhzcWN4NzgzOThldSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/os35W3MqeIoRVNMhL9/giphy.gif', emoji: '🚶‍♀️' },
    { text: 'Jewelry', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnluaGFxcjl0amIyd2FvZmF3ZHU4aXVkdWNydmY5NnczcGJoczE4ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ojgdxoHHinrAk/giphy.gif', emoji: '💎' },
    { text: 'Skincare', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXdhZ3M2d2MzdXk5YXU3M2hldXhpY3Vhc28xem9hODd5b3dlN2g4YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUA7bhMcvSkSoJDsis/giphy.gif', emoji: '✨' },
    { text: 'Embroidery & Sewing', image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWY2ZnRxeWJidXBwYnN4andyMTExZmxma3NvNTZhaG0xc3gwczZsciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ine8PGgmMa3iYGEstv/giphy.gif', emoji: '🧵' },
    { text: 'Arcade', image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmprOG5kMmFocmhlYnJlMG45bW10ZmpmcGxndnZ5M3NhaGJzNjg5MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vtN0pqbjNojx6/giphy.gif', emoji: '🎮' },
    { text: 'Rollercoasters', image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTA4dzZ4c2R0bHI2d2h2MHFmMGh6bmFrMnU4OW9zczZkMWY0ejU2NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V8PO3o4IIPgCiIMnme/giphy.gif', emoji: '🎢' },
    { text: 'Skydiving', image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzhpZmNhNWkxMDl4dWZ0M2tlanMwYmx1YjNxbTI1M2o0N3BkcHdvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Aa194ry9GKAppGCLE5/giphy.gif', emoji: '🪂' },
    { text: 'Bungee Jumping', image: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHI4cno3NzllOWxqaTl3dWo0cTQ1bzJ1ZGJxNmgxbnk5ZjQzNG8zeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/126zLyY8WlTNIY/giphy.gif', emoji: '🏔️' },
    { text: 'Perfumes & Scents', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzZoY2t3dXpseWpvZXc1bnYyem5tZzdxZTl2aDlvMDVyMTlsdDAyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/FAWjcnH16E276/giphy.gif', emoji: '🌸' },
    { text: 'Concerts & Live Music', image: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NXpibWRybHpscGk2a3hndTlzc3hkNzVia3lod3V2MTN2MGM5dmIybCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/e9CiQSgEeoOQHWc3Lc/giphy.gif', emoji: '🎵' },
    { text: 'Hiking', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzRzNGpwZHBhamJtOWMzcXFoOWQ2ZGl3bWdiYTdtMmk4YWI3OGpkcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oxRmGNqKwCzJ0AwPC/giphy.gif', emoji: '🥾' }
  ]

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

import React from 'react'
import { useNavigate } from 'react-router-dom'
import './WelcomePage.css'

function WelcomePage() {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/chat')
  }

  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1 className="welcome-heading">Welcome</h1>
        <p className="welcome-subheading">Your Personal Law-Buddy</p>
        <button className="start-button" onClick={handleStart}>
          Start
        </button>
        {/* === NEW LINE ADDED START === */}
        <p className="welcome-note">
          ⚠️ It takes Only one night to build a whole working bot after all ig ⚠️
        </p>
        {/* === NEW LINE ADDED END === */}
      </div>
    </div>
  )
}

export default WelcomePage
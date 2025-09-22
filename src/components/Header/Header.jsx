import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">⚖️</span>
          <span className="logo-text">Law Bot</span>
        </Link>
        
        <Link to="/profile" className="account-circle">
          <span className="account-initial">A</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
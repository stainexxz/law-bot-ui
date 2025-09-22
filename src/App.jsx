import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import WelcomePage from './pages/WelcomePage/WelcomePage'
import ChatPage from './pages/ChatPage/ChatPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App
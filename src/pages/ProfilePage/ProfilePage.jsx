import React from 'react'
import './ProfilePage.css'

function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <span className="avatar-text">A</span>
            </div>
            <h1 className="profile-title">User Profile</h1>
          </div>
          
          <div className="profile-content">
            <div className="profile-field">
              <label className="field-label">Username</label>
              <div className="field-value">admin_user</div>
            </div>
            
            <div className="profile-field">
              <label className="field-label">Name</label>
              <div className="field-value">Melvin</div>
            </div>
            
            <div className="profile-field">
              <label className="field-label">Email</label>
              <div className="field-value">admin@lawbot.com</div>
            </div>
            
            <div className="profile-field">
              <label className="field-label">Role</label>
              <div className="field-value">
                <span className="role-badge">Administrator</span>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="edit-button">Edit Profile</button>
            <button className="settings-button">Settings</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
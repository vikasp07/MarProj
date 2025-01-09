import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../axios';

const ProfilePage = () => {
  const { auth, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(auth.user);
  const [editMode, setEditMode] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({
    firstName: '',
    lastName: '',
    preferences: { lifestyle: '', personality: '' },
    familyBackground: { familyValues: '', preferredMatchFamily: '' },
  });

  useEffect(() => {
    if (auth.user) {
      setProfile(auth.user);
      setUpdatedInfo({
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
        preferences: auth.user.preferences,
        familyBackground: auth.user.familyBackground,
      });
    }
  }, [auth.user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/users/profile/${profile._id}`, updatedInfo, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setProfile(response.data);
      setEditMode(false); // exit edit mode
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {editMode ? (
        <form onSubmit={handleUpdateProfile}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={updatedInfo.firstName}
              onChange={(e) => setUpdatedInfo({ ...updatedInfo, firstName: e.target.value })}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={updatedInfo.lastName}
              onChange={(e) => setUpdatedInfo({ ...updatedInfo, lastName: e.target.value })}
            />
          </div>
          <div>
            <label>Lifestyle Preferences:</label>
            <input
              type="text"
              value={updatedInfo.preferences.lifestyle}
              onChange={(e) =>
                setUpdatedInfo({ ...updatedInfo, preferences: { ...updatedInfo.preferences, lifestyle: e.target.value } })
              }
            />
          </div>
          <div>
            <label>Personality Preferences:</label>
            <input
              type="text"
              value={updatedInfo.preferences.personality}
              onChange={(e) =>
                setUpdatedInfo({ ...updatedInfo, preferences: { ...updatedInfo.preferences, personality: e.target.value } })
              }
            />
          </div>
          <div>
            <label>Family Values:</label>
            <input
              type="text"
              value={updatedInfo.familyBackground.familyValues}
              onChange={(e) =>
                setUpdatedInfo({ ...updatedInfo, familyBackground: { ...updatedInfo.familyBackground, familyValues: e.target.value } })
              }
            />
          </div>
          <div>
            <label>Preferred Match Family:</label>
            <input
              type="text"
              value={updatedInfo.familyBackground.preferredMatchFamily}
              onChange={(e) =>
                setUpdatedInfo({ ...updatedInfo, familyBackground: { ...updatedInfo.familyBackground, preferredMatchFamily: e.target.value } })
              }
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div>
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
          <p><strong>Lifestyle Preferences:</strong> {profile.preferences.lifestyle}</p>
          <p><strong>Personality Preferences:</strong> {profile.preferences.personality}</p>
          <p><strong>Family Values:</strong> {profile.familyBackground.familyValues}</p>
          <p><strong>Preferred Match Family:</strong> {profile.familyBackground.preferredMatchFamily}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;

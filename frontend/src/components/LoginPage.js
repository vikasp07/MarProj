import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';  // Replace useHistory with useNavigate
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Using useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, userId } = response.data;

      // Fetch user profile after login
      const userResponse = await axios.get(`/users/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Store token and user data in global state
      login(token, userResponse.data);

      // Redirect to profile page
      navigate('/profile');  // Use navigate instead of history.push
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

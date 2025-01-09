import React, { createContext, useState, useEffect } from 'react';

// Create a context for global state
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      // Fetch user data using the token
      fetchUserProfile();
    }
  }, [auth.token]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/users/profile', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setAuth({ ...auth, user: response.data });
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const login = (token, user) => {
    setAuth({ token, user });
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

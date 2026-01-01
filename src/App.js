import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Portal from './pages/Portal';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignIn = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleSignUp = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page (Public - No Auth Required) */}
        <Route path="/" element={<Landing />} />

        {/* Sign In Route */}
        <Route
          path="/signin"
          element={
            isAuthenticated ? (
              <Navigate to="/portal" replace />
            ) : (
              <SignIn onSignIn={handleSignIn} />
            )
          }
        />

        {/* Sign Up Route */}
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/portal" replace />
            ) : (
              <SignUp onSignUp={handleSignUp} />
            )
          }
        />

        {/* Portal Route (Protected) */}
        <Route
          path="/portal"
          element={
            isAuthenticated ? (
              <Portal user={user} onSignOut={handleSignOut} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCookie = Cookies.get('auth');
    if (authCookie) {
      setCurrentUser(JSON.parse(authCookie));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const user = { id: 1, email };
    setCurrentUser(user);
    Cookies.set('auth', JSON.stringify(user), { expires: 7 });
  };

  const logout = () => {
    setCurrentUser(null);
    Cookies.remove('auth');
  };

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

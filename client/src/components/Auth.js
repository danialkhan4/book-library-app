import React, { useState, useContext, useEffect } from 'react'; 
import firebase, { auth } from '../firebase';

const AuthContext = React.createContext(); 

export function useAuth() {
  return useContext(AuthContext); // export context for authentication 
}

export function AuthProvider( {children} ) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  function login() {
    const googleAuth = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(googleAuth);
  }
  
  
  function logout() {
    return auth.signOut();
  }
  
  useEffect(() => {
    const unsub = auth.onAuthStateChanged (newUser => {
      setUser(newUser);
      setLoading(false)
    })
    
    return unsub; 
  }, [])
  

  const value = {   // object to export 
    user,
    login,
    logout
  }

  return (
    
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>

  );
}
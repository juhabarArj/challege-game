import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { onAuthChange, registerUser, loginUser, logoutUser } from '../services/firebase';
import { getUserProfile, createUserProfile } from '../services/supabase';

// Subscribes to Firebase auth state changes. Must be mounted exactly once
// (in App.jsx) - onAuthStateChanged fires its callback immediately on every
// new subscription, so calling this from more than one component (e.g. also
// from PrivateRoute) flips the shared `loading` flag back to true on every
// mount, which unmounts/remounts the subscriber and loops forever.
export const useAuthListener = () => {
  const { setUser, setUserProfile, setLoading, setError } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          // Get profile from Supabase
          const profile = await getUserProfile(firebaseUser.uid);
          setUserProfile(profile);
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (err) {
        console.error('Auth change error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useAuth = () => {
  const { user, userProfile, loading, error, setUser, setUserProfile, setLoading, setError } = useAuthStore();

  const register = async (email, password, username, ageGroup) => {
    try {
      setError(null);
      setLoading(true);
      
      const { user: firebaseUser } = await registerUser(email, password);
      
      // Create profile in Supabase
      await createUserProfile(firebaseUser.uid, email, username, ageGroup);
      
      setUser(firebaseUser);
      return firebaseUser;
    } catch (err) {
      const message = err.code === 'auth/email-already-in-use' 
        ? 'Este email ya está registrado'
        : err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const { user: firebaseUser } = await loginUser(email, password);
      const profile = await getUserProfile(firebaseUser.uid);
      
      setUser(firebaseUser);
      setUserProfile(profile);
      return firebaseUser;
    } catch (err) {
      const message = err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
        ? 'Email o contraseña incorrectos'
        : err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await logoutUser();
      useAuthStore.getState().logout();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    userProfile,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };
};

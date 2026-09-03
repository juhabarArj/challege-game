import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  userProfile: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  logout: () => set({ user: null, userProfile: null }),

  clearError: () => set({ error: null }),
}));

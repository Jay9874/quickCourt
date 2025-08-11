import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData }),
    isAuthenticating: true,
    setAuthenticating: (state) => set({ isAuthenticating: state }),
    isAuthenticated: false,
    setAuthenticated: (state) => set({ isAuthenticated: state }),
    clearUser: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore
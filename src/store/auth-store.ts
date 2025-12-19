import { create } from 'zustand';
import Cookies from 'js-cookie';
import { api } from '@/lib/api';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthState = {
  user: User | null;
  initialized: boolean;
    token?: string;  
  setAuth: (user: User) => void;
  initializeAuth: () => Promise<void>;
  isAuthenticated: boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialized: false,
    token: undefined,
  isAuthenticated: false,

  // setInitialized: () => set({ initialized: true }),

  setAuth: (user) => {
    Cookies.set('user', JSON.stringify(user)); // JS-readable
    set({ user });
    set({ isAuthenticated: true })
  },

  initializeAuth: async () => {
    const userCookie = Cookies.get('user');

    if (userCookie) {
      const parsedUser = JSON.parse(userCookie);
      set({
        user: parsedUser,
        isAuthenticated: true,   // restore auth
        initialized: true,
      });
    } else {
      try {
        // optional: validate with backend if you want
        // const res = await api.get('/users/me');
        // set({ user: res.data, isAuthenticated: true });
      } catch (err) {
        console.error('User not logged in or session expired', err);
        set({ user: null, isAuthenticated: false });
      } finally {
        set({ initialized: true });
      }
    }
  },
   logout: async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
          Cookies.remove("user"); 
      set({ user: null, isAuthenticated: false });
    }
  },


}));


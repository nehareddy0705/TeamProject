import axios from "axios";
import { create } from "zustand";

import { API_BASE_URL } from "../config/api";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  login: async (userCred) => {
    //const { role, ...userCredObj } = userCredWithRole;
    try {
      //set loading true
      set((stat) => ({ ...stat, loading: true }));
      //make api call
      let res = await axios.post(`${API_BASE_URL}/auth/login`, userCred, { withCredentials: true });
      //update state
      const loggedInUser = res.data?.payload || res.data?.user || res.data;
      set((stat) => ({
        ...stat,
        loading: false,
        isAuthenticated: true,
        currentUser: loggedInUser,
        error: null,
      }));
    } catch (err) {
      console.log("err is ", err);
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        //error: err,
        error: err.response?.data?.error || "Login failed",
      });
    }
  },
  logout: async () => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      set({
        currentUser: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout failed",
      });
    }
  },
}));
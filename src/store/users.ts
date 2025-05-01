import axios from "axios";
import { create } from "zustand";

interface UserStore {
  users: any[];
  isLoadingUsers: boolean;
  fetchUsers: () => Promise<void>;
  getUser: (userID: string) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  isLoadingUsers: false,

  fetchUsers: async () => {
    set({ isLoadingUsers: true });
    try {
      const response = await axios.get("https://adventurely-backend.onrender.com/api/auth0/users");
      set((state) => ({ ...state, users: response.data.users }));
    } catch (error) {
      console.error("❌ Failed to fetch users:", error);
    } finally {
      set({ isLoadingUsers: false });
    }
  },

  getUser: async (userID: string) => {
    set({ isLoadingUsers: true });
    try {
      const response = await axios.get(`https://adventurely-backend.onrender.com/api/auth0/users/${userID}`);
      set((state) => ({ ...state, users: [response.data.users] }));
    } catch (error) {
      console.error("❌ Failed to fetch user:", error);
    }
    finally {
      set({ isLoadingUsers: false });
    }
  }
}));

export default useUserStore;
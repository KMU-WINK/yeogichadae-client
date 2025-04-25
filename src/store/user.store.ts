import { User } from '@/api/schema/user';

import { create } from 'zustand';

interface UserStore {
  user?: User;
  setUser: (user?: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));

import { UserDto } from '@/api/dto/auth';

import { create } from 'zustand';

interface UserStore {
  user?: UserDto;
  setUser: (user?: UserDto) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));

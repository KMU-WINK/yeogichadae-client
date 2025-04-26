import Api from '@/api';
import { Room } from '@/api/dto/chat';
import { Chat } from '@/api/schema/chat';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Type {
  rooms: Room[];
}

interface Action {
  setRooms: (room: Room[]) => void;
  readRoom: (roomId: string) => void;
  readAllRoom: (roomId: string) => void;
}

const initialState: Type = {
  rooms: [],
};

export const useRoomStore = create(
  persist<Type & Action>(
    (set) => ({
      ...initialState,
      setRooms: (rooms) => set(() => ({ rooms })),
      readRoom: (roomId) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.meeting.id === roomId ? { ...room, unread: room.unread - 1 } : room,
          ),
        })),
      readAllRoom: (roomId) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.meeting.id === roomId ? { ...room, unread: 0 } : room,
          ),
        })),
    }),
    {
      name: 'room',
    },
  ),
);

export async function initRoomStore() {
  const { rooms } = await Api.Domain.Chat.getRoomList();
  const sse = Api.Domain.Chat.openSseTunnel();

  useRoomStore.getState().setRooms(
    rooms.sort((a, b) => {
      if (a.last && b.last)
        return new Date(b.last.createdAt).getTime() - new Date(a.last.createdAt).getTime();
      if (a.last) return -1;
      if (b.last) return 1;

      return 0;
    }),
  );

  sse.addEventListener('send_chat', (e) => {
    const chat = JSON.parse(e.data) as Chat;

    useRoomStore.getState().setRooms(
      useRoomStore
        .getState()
        .rooms.map((room) =>
          room.meeting.id === chat.meeting.id
            ? {
                ...room,
                last: chat,
                unread: room.unread + 1,
              }
            : room,
        )
        .sort((a, b) => {
          if (a.last && b.last)
            return new Date(b.last.createdAt).getTime() - new Date(a.last.createdAt).getTime();
          if (a.last) return -1;
          if (b.last) return 1;

          return 0;
        }),
    );
  });
}

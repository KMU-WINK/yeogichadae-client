import Api from '@/api';
import { Type as NType, Notification } from '@/api/schema/notification';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Type {
  notifications: Notification[];
}

interface Action {
  setNotifications: (notifications: Notification[]) => void;
  read: (notificationId: string) => void;
  readAll: () => void;
}

const initialState: Type = {
  notifications: [],
};

export const useNotificationStore = create(
  persist<Type & Action>(
    (set) => ({
      ...initialState,
      setNotifications: (notifications) => set(() => ({ notifications })),
      read: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === notificationId ? { ...notification, unread: false } : notification,
          ),
        })),
      readAll: () =>
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            unread: false,
          })),
        })),
    }),
    {
      name: 'notification',
    },
  ),
);

export async function initNotificationStore() {
  const { notifications } = await Api.Domain.Notification.getNotifications();

  useNotificationStore
    .getState()
    .setNotifications(
      notifications.filter((notification) => notification.type !== NType.CHAT_MESSAGE),
    );
}

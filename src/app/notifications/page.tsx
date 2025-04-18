'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Badge } from '@/component/ui/badge';
import { Button } from '@/component/ui/button';

import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';
import { Bell, Star, UserCog, UserMinus, UserPlus } from 'lucide-react';

// 알림 데이터 (실제로는 API에서 가져올 것)
const notificationsData = [
  {
    id: 1,
    type: 'meeting_join',
    title: '모임 참여',
    message: "재즈매니아님이 '재즈 페스티벌 같이 즐겨요' 모임에 참여했습니다.",
    time: '10분 전',
    isRead: false,
    link: '/meetings/1',
  },
  {
    id: 2,
    type: 'meeting_leave',
    title: '모임 나감',
    message: "음악사랑님이 '영화제 관람 모임' 채팅방에 메시지를 보냈습니다.",
    time: '1시간 전',
    isRead: false,
    link: '/meetings/2/chat',
  },
  {
    id: 3,
    type: 'meeting_host_delegate',
    title: '모임 주최자 위임됨',
    message: "내일 '서울 재즈 페스티벌 2023' 행사가 시작됩니다.",
    time: '3시간 전',
    isRead: true,
    link: '/events/1',
  },
  {
    id: 4,
    type: 'meeting_review',
    title: '모임 후기 달림',
    message: '한강러버님이 회원님에게 후기를 남겼습니다.',
    time: '1일 전',
    isRead: true,
    link: '/profile/reviews',
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-10 md:px-8">
      <div className="mx-auto max-w-2xl">
        <motion.div
          className="mb-4 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold sm:text-3xl">알림</h1>
          {notificationsData.length > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              모두 읽음 표시
            </Button>
          )}
        </motion.div>

        {notificationsData.length > 0 ? (
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {notifications.map((notification) => (
              <motion.div key={notification.id} variants={itemVariants}>
                <Link href={notification.link}>
                  <div
                    className={cn(
                      'sinc-card p-4 transition-all duration-300 hover:shadow-md',
                      !notification.isRead && 'bg-primary/5 border-primary border-l-4',
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                          notification.type === 'meeting_join' && 'bg-primary/10 text-primary',
                          notification.type === 'meeting_leave' && 'bg-red-100 text-red-700',
                          notification.type === 'meeting_host_delegate' &&
                            'bg-amber-50 text-amber-700',
                          notification.type === 'meeting_review' && 'bg-green-100 text-green-700',
                        )}
                      >
                        {notification.type === 'meeting_join' && <UserPlus className="h-5 w-5" />}
                        {notification.type === 'meeting_leave' && <UserMinus className="h-5 w-5" />}
                        {notification.type === 'meeting_host_delegate' && (
                          <UserCog className="h-5 w-5" />
                        )}
                        {notification.type === 'meeting_review' && <Star className="h-5 w-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center justify-between">
                          <p className="font-medium">{notification.title}</p>
                          <span className="text-muted-foreground text-xs">{notification.time}</span>
                        </div>
                        <p className="text-muted-foreground text-sm">{notification.message}</p>
                      </div>
                      {!notification.isRead && (
                        <Badge className="bg-primary h-2 w-2 shrink-0 rounded-full p-0" />
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="sinc-card flex flex-col items-center py-16">
            <Bell size={48} className="mb-3" />
            <h3 className="mb-2 text-xl font-medium">알림이 없습니다</h3>
            <p className="text-muted-foreground mb-6">새로운 알림이 오면 이곳에 표시됩니다</p>
            <Link href="/">
              <Button className="rounded-xl">메인으로 돌아가기</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

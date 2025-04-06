'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MessageSquare, Star, User } from 'lucide-react';

// 알림 데이터 (실제로는 API에서 가져올 것)
const notificationsData = [
  {
    id: 1,
    type: 'meeting_join',
    title: '모임 참여 알림',
    message: "재즈매니아님이 '재즈 페스티벌 같이 즐겨요' 모임에 참여했습니다.",
    time: '10분 전',
    isRead: false,
    link: '/meetings/1',
  },
  {
    id: 2,
    type: 'chat_message',
    title: '새 메시지',
    message: "음악사랑님이 '영화제 관람 모임' 채팅방에 메시지를 보냈습니다.",
    time: '1시간 전',
    isRead: false,
    link: '/meetings/2/chat',
  },
  {
    id: 3,
    type: 'event_reminder',
    title: '행사 알림',
    message: "내일 '서울 재즈 페스티벌 2023' 행사가 시작됩니다.",
    time: '3시간 전',
    isRead: true,
    link: '/events/1',
  },
  {
    id: 4,
    type: 'review',
    title: '후기 알림',
    message: '한강러버님이 회원님에게 후기를 남겼습니다.',
    time: '1일 전',
    isRead: true,
    link: '/profile/reviews',
  },
  {
    id: 5,
    type: 'meeting_join',
    title: '모임 참여 알림',
    message: "페스티벌고님이 '마지막 날 공연 함께해요' 모임에 참여했습니다.",
    time: '2일 전',
    isRead: true,
    link: '/meetings/2',
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
    <div className="container mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:px-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-primary mb-6 inline-flex items-center hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4" />
          메인으로 돌아가기
        </Link>

        <motion.div
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">알림</h1>
          <Button variant="outline" onClick={markAllAsRead}>
            모두 읽음 표시
          </Button>
        </motion.div>

        {notifications.length > 0 ? (
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
                          notification.type === 'chat_message' && 'bg-emerald-100 text-emerald-700',
                          notification.type === 'event_reminder' && 'bg-amber-100 text-amber-700',
                          notification.type === 'review' && 'bg-purple-100 text-purple-700',
                        )}
                      >
                        {notification.type === 'meeting_join' && <User className="h-5 w-5" />}
                        {notification.type === 'chat_message' && (
                          <MessageSquare className="h-5 w-5" />
                        )}
                        {notification.type === 'event_reminder' && <Calendar className="h-5 w-5" />}
                        {notification.type === 'review' && <Star className="h-5 w-5" />}
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
          <div className="sinc-card p-16 text-center">
            <div className="mb-3 text-5xl">🔔</div>
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

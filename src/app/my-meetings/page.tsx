'use client';

import type React from 'react';
import { useState } from 'react';



import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { handleShare } from '../utils/clipboard';

import { motion } from 'framer-motion';
import { Calendar, MapPin, MessageSquare, Share2, Users } from 'lucide-react';





// 내 모임 데이터 (실제로는 API에서 가져올 것)
const activeMeetings = [
  {
    id: 1,
    title: '재즈 페스티벌 같이 즐겨요',
    eventId: 1,
    eventTitle: '서울 재즈 페스티벌 2023',
    eventImage: '/placeholder.svg?height=80&width=120',
    meetingTime: '2023-05-27 14:00',
    district: '마포구',
    place: '난지한강공원',
    participants: 4,
    maxPeople: 6,
    isHost: true,
  },
  {
    id: 2,
    title: '영화제 관람 모임',
    eventId: 3,
    eventTitle: '서울 국제 영화제',
    eventImage: '/placeholder.svg?height=80&width=120',
    meetingTime: '2023-07-06 18:30',
    district: '종로구',
    place: '메가박스 동대문',
    participants: 3,
    maxPeople: 4,
    isHost: false,
  },
];

const pastMeetings = [
  {
    id: 3,
    title: '마라톤 완주 도전',
    eventId: 6,
    eventTitle: '서울 마라톤',
    eventImage: '/placeholder.svg?height=80&width=120',
    meetingTime: '2023-04-16 08:00',
    district: '중구',
    place: '광화문광장',
    participants: 5,
    maxPeople: 5,
    isHost: false,
  },
];

export default function MyMeetingsPage() {
  const [, setActiveTab] = useState('active');
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const handleChatClick = (e: React.MouseEvent, meetingId: number) => {
    e.stopPropagation();
    router.push(`/chats/${meetingId}`);
  };

  const handleReviewClick = (e: React.MouseEvent, meetingId: number) => {
    e.stopPropagation();
    router.push(`/meetings/${meetingId}/reviews`);
  };


  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-10 md:px-8">
      <motion.h1
        className="mb-4 text-2xl font-bold sm:text-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        내 모임 목록
      </motion.h1>

      <Tabs defaultValue="active" onValueChange={setActiveTab} className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TabsList className="mb-8 grid h-auto w-full max-w-md grid-cols-2 rounded-xl p-1">
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-primary cursor-pointer rounded-lg py-3 data-[state=active]:text-white"
            >
              활성 모임
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-primary cursor-pointer rounded-lg py-3 data-[state=active]:text-white"
            >
              지난 모임
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="active">
          {activeMeetings.length > 0 ? (
            <motion.div
              className="space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {activeMeetings.map((meeting) => (
                <motion.div key={meeting.id} variants={itemVariants}>
                  <div
                    className="sinc-card cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md"
                    onClick={() => router.push(`/meetings/${meeting.id}`)}
                  >
                    <div className="p-6">
                      <div className="flex flex-col gap-4 md:flex-row">
                        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl md:h-auto md:w-48">
                          <Image
                            src={meeting.eventImage || '/placeholder.svg'}
                            alt={meeting.eventTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-medium text-xl">{meeting.title}</h3>
                            {meeting.isHost && (
                              <Badge className="sinc-badge bg-primary/10 text-primary ml-auto">
                                주최자
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2 text-base font-medium">{meeting.eventTitle}</p>
                          <div className="mb-3 grid gap-1.5 text-xs grid-cols-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="text-primary h-4 w-4" />
                              <span>{meeting.meetingTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="text-primary h-4 w-4" />
                              <span>
                                {meeting.district} {meeting.place}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="text-primary h-4 w-4" />
                              <span>
                                {meeting.participants}/{meeting.maxPeople} 명 참여중
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <Button
                              variant="ghost"
                              className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-xl text-white hover:text-white"
                              onClick={(e) => handleChatClick(e, meeting.id)}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>채팅방</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="flex items-center gap-2 rounded-xl"
                              onClick={(e) => handleShare(e, meeting.id)}
                            >
                              <Share2 className="h-4 w-4" />
                              <span>공유하기</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="sinc-card p-16 text-center">
              <div className="mb-3 text-5xl">👥</div>
              <h3 className="mb-2 text-xl font-medium">참여중인 활성 모임이 없습니다</h3>
              <p className="text-muted-foreground mb-6">
                새로운 모임에 참여하거나 직접 모임을 만들어보세요
              </p>
              <Link href="/calendar">
                <Button className="rounded-xl">행사 둘러보기</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastMeetings.length > 0 ? (
            <motion.div
              className="space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {pastMeetings.map((meeting) => (
                <motion.div key={meeting.id} variants={itemVariants}>
                  <div
                    className="sinc-card cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md"
                    onClick={() => router.push(`/meetings/${meeting.id}`)}
                  >
                    <div className="p-6 pb-6 md:space-y-3">
                      <div className="flex flex-row gap-4 mb-0">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-48">
                          <Image
                            src={meeting.eventImage || '/placeholder.svg'}
                            alt={meeting.eventTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-4">
                            {meeting.isHost && (
                              <Badge className="sinc-badge bg-primary/10 text-primary">
                                주최자
                              </Badge>
                            )}
                            <h3 className="font-medium text-base sm:text-xl">{meeting.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-2 text-sm sm:text-base">
                            {meeting.eventTitle}
                          </p>
                          <div className="mb-5 grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="text-primary h-4 w-4" />
                              <span className="text-xs">{meeting.meetingTime}</span>
                            </div>
                          </div>
                          <div className="hidden sm:flex flex-wrap gap-3 justify-end ">
                            <Button
                              variant="outline"
                              className="flex w-full items-center gap-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 sm:w-fit"
                              onClick={(e) => handleReviewClick(e, meeting.id)}
                            >
                              <Calendar className="h-2 w-2" />
                              <span className="text-xs">후기 작성</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 sm:hidden mt-2">
                        <Button
                          variant="outline"
                          className="flex w-full items-center gap-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 sm:w-fit"
                          onClick={(e) => handleReviewClick(e, meeting.id)}
                        >
                          <Calendar className="h-2 w-2" />
                          <span className="text-xs">후기 작성</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="sinc-card p-16 text-center">
              <div className="mb-3 text-5xl">📅</div>
              <h3 className="mb-2 text-xl font-medium">참여했던 지난 모임이 없습니다</h3>
              <p className="text-muted-foreground mb-6">모임에 참여하고 다양한 경험을 쌓아보세요</p>
              <Link href="/calendar">
                <Button className="rounded-xl">행사 둘러보기</Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
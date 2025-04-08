'use client';

import { useEffect, useState } from 'react';
import { useRef } from 'react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { motion } from 'framer-motion';
import { ArrowLeft, Info, MessageSquare, Search } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

// 채팅방 데이터 (실제로는 API에서 가져올 것)
const chatRoomsData = [
  {
    id: 1,
    meetingId: 1,
    title: '재즈 페스티벌 같이 즐겨요',
    eventTitle: '서울 재즈 페스티벌 2023',
    meetingTime: '2023-05-27 14:00',
    participants: 4,
    maxPeople: 6,
    lastMessage: {
      sender: '재즈매니아',
      content: '모임 당일에는 난지한강공원 정문에서 만나면 좋을 것 같아요. 어떻게 생각하시나요?',
      timestamp: '2023-05-20 10:20',
    },
    unreadCount: 2,
  },
  {
    id: 2,
    meetingId: 2,
    title: '영화제 관람 모임',
    eventTitle: '서울 국제 영화제',
    meetingTime: '2023-07-06 18:30',
    participants: 3,
    maxPeople: 4,
    lastMessage: {
      sender: '영화광',
      content: '첫날 개막작은 꼭 봐야할 것 같아요! 다들 시간 괜찮으신가요?',
      timestamp: '2023-05-19 15:45',
    },
    unreadCount: 0,
  },
  {
    id: 3,
    meetingId: 3,
    title: '마라톤 완주 도전',
    eventTitle: '서울 마라톤',
    meetingTime: '2023-04-16 08:00',
    participants: 5,
    maxPeople: 5,
    lastMessage: {
      sender: '러닝맨',
      content: '모두 수고하셨습니다! 다음에 또 함께해요~',
      timestamp: '2023-04-16 14:30',
    },
    unreadCount: 0,
  },
  {
    id: 4,
    meetingId: 4,
    title: '마라톤 완주 도전',
    eventTitle: '서울 마라톤',
    meetingTime: '2023-04-16 08:00',
    participants: 5,
    maxPeople: 5,
    lastMessage: {
      sender: '러닝맨',
      content: '모두 수고하셨습니다! 다음에 또 함께해요~',
      timestamp: '2023-04-16 14:30',
    },
    unreadCount: 0,
  },
  {
    id: 5,
    meetingId: 5,
    title: '마라톤 완주 도전',
    eventTitle: '서울 마라톤',
    meetingTime: '2023-04-16 08:00',
    participants: 5,
    maxPeople: 5,
    lastMessage: {
      sender: '러닝맨',
      content: '모두 수고하셨습니다! 다음에 또 함께해요~',
      timestamp: '2023-04-16 14:30',
    },
    unreadCount: 0,
  },
  {
    id: 6,
    meetingId: 6,
    title: '마라톤 완주 도전',
    eventTitle: '서울 마라톤',
    meetingTime: '2023-04-16 08:00',
    participants: 5,
    maxPeople: 5,
    lastMessage: {
      sender: '러닝맨',
      content: '모두 수고하셨습니다! 다음에 또 함께해요~',
      timestamp: '2023-04-16 14:30',
    },
    unreadCount: 0,
  },
  {
    id: 7,
    meetingId: 7,
    title: '마라톤 완주 도전',
    eventTitle: '서울 마라톤',
    meetingTime: '2023-04-16 08:00',
    participants: 5,
    maxPeople: 5,
    lastMessage: {
      sender: '러닝맨',
      content: '모두 수고하셨습니다! 다음에 또 함께해요~',
      timestamp: '2023-04-16 14:30',
    },
    unreadCount: 0,
  },
  {
    id: 8,
    meetingId: 8,
    title: '마라톤 완주 도전',
    eventTitle: '서울 마라톤',
    meetingTime: '2023-04-16 08:00',
    participants: 5,
    maxPeople: 5,
    lastMessage: {
      sender: '러닝맨',
      content: '모두 수고하셨습니다! 다음에 또 함께해요~',
      timestamp: '2023-04-16 14:30',
    },
    unreadCount: 0,
  },
  {
    id: 9,
    meetingId: 9,
    title: '마라톤 완주 도전',
    eventTitle: '서울 마라톤',
    meetingTime: '2023-04-16 08:00',
    participants: 5,
    maxPeople: 5,
    lastMessage: {
      sender: '러닝맨',
      content: '모두 수고하셨습니다! 다음에 또 함께해요~',
      timestamp: '2023-04-16 14:30',
    },
    unreadCount: 0,
  },
  {
    id: 10,
    meetingId: 10,
    title: '마라톤 완주 도전',
    eventTitle: '서울 마라톤',
    meetingTime: '2023-04-16 08:00',
    participants: 5,
    maxPeople: 5,
    lastMessage: {
      sender: '러닝맨',
      content: '모두 수고하셨습니다! 다음에 또 함께해요~',
      timestamp: '2023-04-16 14:30',
    },
    unreadCount: 0,
  },
];

export default function ChatsPage() {
  const [activeChats] = useState(chatRoomsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  const [chatId, setChatId] = useQueryState('id', parseAsInteger);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 검색 필터링
  const filteredChats = activeChats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (chatId) {
      const chat = filteredChats.find((c) => c.id === chatId);
      if (chat) {
        setChatId(chat.id);
      }
    }
  }, [chatId, filteredChats]);

  // 선택된 채팅방 정보
  const selectedChatData = activeChats.find((chat) => chat.id === chatId);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, [chatId, selectedChatData]);

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (!message.trim() || !chatId) return;

    // 실제로는 API 호출하여 메시지 전송
    console.log(`메시지 전송: ${message}`);
    setMessage('');
  };

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

  // 모바일 화면인지 확인
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleChatClick = (chatId: number) => {
    setChatId(chatId);
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
      <div className="grid h-[calc(100dvh-56px-32px)] grid-cols-1 gap-6 sm:h-[calc(100dvh-64px-48px)] md:h-[calc(100dvh-64px-64px)] md:grid-cols-3">
        {/* 채팅방 목록 (모바일에서는 선택된 채팅방이 없을 때만 표시) */}
        {(!isMobile || !chatId) && (
          <motion.div
            className="flex h-full flex-col overflow-hidden rounded-xl border md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="border-b p-3">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  type="search"
                  placeholder="채팅방 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-lg pl-9"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredChats.length > 0 ? (
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  {filteredChats.map((chat) => (
                    <motion.div
                      key={chat.id}
                      variants={itemVariants}
                      className={`hover:bg-secondary/30 cursor-pointer border-b p-3 transition-colors ${
                        chatId === chat.id ? 'bg-secondary/50' : ''
                      }`}
                      onClick={() => handleChatClick(chat.id)}
                    >
                      <div className="mb-1 flex items-start justify-between">
                        <div className="line-clamp-1 font-medium">{chat.title}</div>
                        <div className="text-muted-foreground text-xs">
                          {chat.lastMessage.timestamp}
                        </div>
                      </div>
                      <div className="text-muted-foreground mb-1 line-clamp-1 text-sm">
                        {chat.eventTitle}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="line-clamp-1 text-sm">
                          <span className="font-medium">{chat.lastMessage.sender}:</span>{' '}
                          {chat.lastMessage.content}
                        </div>
                        {chat.unreadCount > 0 && (
                          <Badge className="bg-primary text-primary-foreground">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-muted-foreground flex h-full items-center justify-center">
                  검색 결과가 없습니다
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 채팅 내용 (모바일에서는 선택된 채팅방이 있을 때만 표시) */}
        {(!isMobile || chatId) && (
          <motion.div
            className="flex h-full flex-col overflow-hidden rounded-xl border md:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {chatId ? (
              <>
                <div className="flex items-center justify-between border-b p-3">
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2"
                      onClick={() => setChatId(null)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{selectedChatData?.title}</div>
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <span>{selectedChatData?.eventTitle}</span>
                      <span>•</span>
                      <span>
                        {selectedChatData?.participants}/{selectedChatData?.maxPeople}명
                      </span>
                    </div>
                  </div>
                  <Link href={`/meetings/${selectedChatData?.meetingId}`}>
                    <Button variant="ghost" size="sm">
                      <Info />
                    </Button>
                  </Link>
                </div>

                <div className="bg-secondary/10 flex-1 space-y-4 overflow-y-auto p-4">
                  {/* 메시지 예시 */}
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%]">
                      <Link href="/profile/2">
                        <Avatar className="border-primary/10 mr-2 h-8 w-8 border-2">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="재즈매니아" />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            재즈
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="space-y-1">
                        <Link href="/profile/2">
                          <p className="text-xs">재즈매니아</p>
                        </Link>
                        <div className="bg-secondary rounded-2xl rounded-tl-none px-4 py-2">
                          <p className="text-sm">안녕하세요! 모임에 참여해주셔서 감사합니다.</p>
                        </div>
                        <p className="text-muted-foreground text-xs">10:15</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="flex max-w-[80%] flex-row-reverse">
                      <div className="mr-2 space-y-1">
                        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none px-4 py-2">
                          <p className="text-sm">
                            좋은 생각이에요! 정문에서 만나는 게 좋을 것 좋은 생각이에요! 정문에서
                            만나는 게 좋을 것 같습니다.좋은 생각이에요! 정문에서 만나는 게 좋을 것
                            같습니다.좋은 생각이에요! 정문에서 만나는 게 좋을 것 같습니다.좋은
                            생각이에요! 정문에서 만나는 게 좋을 것 같습니다.좋은 생각이에요!
                            정문에서 만나는 게 좋을 것 같습니다.좋은 생각이에요! 정문에서 만나는 게
                            좋을 것 같습니다.좋은 생각이에요! 정문에서 만나는 게 좋을 것 같습니다.
                          </p>
                        </div>
                        <p className="text-muted-foreground text-right text-xs">10:22</p>
                      </div>
                    </div>
                  </div>

                  <div ref={bottomRef} />
                </div>

                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="메시지를 입력하세요..."
                      className="rounded-xl"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="rounded-xl"
                    >
                      <MessageSquare className="mr-1 h-4 w-4" />
                      전송
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center">
                <div>
                  <MessageSquare className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-xl font-medium">채팅방을 선택해주세요</h3>
                  <p className="text-muted-foreground">
                    왼쪽 목록에서 채팅방을 선택하면 대화 내용이 여기에 표시됩니다
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

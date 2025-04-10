'use client';

import { useEffect, useState } from 'react';
import { useRef } from 'react';



import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';



import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';



import { useMediaQuery } from '@/hooks/useMediaQuery';



// import { parseAsInteger, useQueryState } from 'nuqs';
import { format, isSameMinute as isSameMinuteFn } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, MessageSquare, Search } from 'lucide-react';





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
  const messageInputRef = useRef<HTMLInputElement>(null);

  // const [chatId, setChatId] = useQueryState('id', parseAsInteger);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const chatId = parseInt(searchParams.get('id') || '', 10);
  const router = useRouter();

  /* 시간에 따른 채팅 표시 관련 함수들*/
// 같은 시간(분)인지 확인
  const isSameMinute = (a: string, b?: string) => {
    if (!b) return false;
    return isSameMinuteFn(new Date(a), new Date(b));
  };

// 같은 사용자인지 확인
  const isSameSender = (a: { senderId: number }, b?: { senderId: number }) => {
    if (!b) return false;
    return a.senderId === b.senderId;
  };

// 메시지 묶음 중 마지막인지 확인
//   const isLastInGroup = (
//       currentIndex: number,
//       messages: { senderId: number; timestamp: string }[]
//   ) => {
//     const current = messages[currentIndex];
//     const next = messages[currentIndex + 1];
//     if (!next) return true; // 마지막 메시지면 무조건 true
//
//     return !(
//         isSameSender(current, next) &&
//         isSameMinute(current.timestamp, next.timestamp)
//     );
//   };
// 시간 포맷팅
  const formatTime = (timestamp: string) => format(new Date(timestamp), 'HH:mm');

  /* */

  // 검색 필터링
  const filteredChats = activeChats.filter(
      (chat) =>
          chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 선택된 채팅방 정보
  const selectedChatData = activeChats.find((chat) => chat.id === chatId);

  // 메세지 예시2
  const messages = [
    {
      id: 1,
      senderId: 2,
      senderName: '재즈매니아',
      content: '모임 당일에는 난지한강공원 정문에서 만나면 좋을 것 같아요. 어떻게 생각하시나요?',
      timestamp: '2023-05-20T10:20:00',
      avatarUrl: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 2,
      senderId: 2,
      senderName: '재즈매니아',
      content: '정문 근처에 벤치도 있어서 기다리기 좋아요!',
      timestamp: '2023-05-20T10:20:25',
      avatarUrl: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 3,
      senderId: 2,
      senderName: '재즈매니아',
      content: '10분 전쯤 도착해서 자리 맡아둘게요.',
      timestamp: '2023-05-20T10:20:59',
      avatarUrl: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 4,
      senderId: 2,
      senderName: '재즈매니아',
      content: '1분 초과함',
      timestamp: '2023-05-20T10:21:09',
      avatarUrl: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 5,
      senderId: 2,
      senderName: '재즈매니아',
      content: '1분 초과함 테스트',
      timestamp: '2023-05-20T10:21:19',
      avatarUrl: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 6,
      senderId: 2,
      senderName: '재즈매니아',
      content: '스크롤테스트',
      timestamp: '2023-05-20T10:21:19',
      avatarUrl: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 7,
      senderId: 2,
      senderName: '재즈매니아',
      content: '스크롤테스트',
      timestamp: '2023-05-20T10:21:19',
      avatarUrl: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 8,
      senderId: 2,
      senderName: '재즈매니아',
      content: '스크롤테스트',
      timestamp: '2023-05-20T10:21:19',
      avatarUrl: '/placeholder.svg?height=40&width=40',
    },

    //현재 senderId = 1이 내 메세지임
    {
      id: 100,
      senderId: 1,
      senderName: '나',
      content: '좋은 아이디어네요!',
      timestamp: '2023-05-20T10:25:00',
      avatarUrl: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 101,
      senderId: 1,
      senderName: '나',
      content: '정문 앞에서 기다릴게요.',
      timestamp: '2023-05-20T10:25:30',
      avatarUrl: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 102,
      senderId: 1,
      senderName: '나',
      content: '방금 도착했어요!',
      timestamp: '2023-05-20T10:26:05',
      avatarUrl: '/placeholder.svg?height=40&width=40',
    },
  ];

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, [chatId, selectedChatData]);

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (!messageInputRef.current || !messageInputRef.current.value.trim() || !chatId) return;

    // 실제로는 API 호출하여 메시지 전송
    console.log(`메시지 전송: ${messageInputRef.current.value}`);

    // 입력값 초기화
    messageInputRef.current.value = '';
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
    // setChatId(chatId);
    router.push(`?id=${chatId}`);
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
                                // onClick={() => setChatId(null)}
                                onClick={() => router.back()}

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

                      <div className="bg-secondary/10 flex-1 space-y-2 overflow-y-auto p-4">
                        {/* 메시지 예시 */}
                        {/*<div className="flex justify-end">*/}
                        {/*  <div className="flex max-w-[80%] flex-row-reverse">*/}
                        {/*    <div className="mr-2 space-y-1">*/}
                        {/*      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none px-4 py-2">*/}
                        {/*        <p className="text-sm">*/}
                        {/*          좋은 생각이에요! 정문에서 만나는 게 좋을 것 좋은 생각이에요! 정문에서*/}
                        {/*          만나는 게 좋을 것 같습니다.좋은 생각이에요! 정문에서 만나는 게 좋을 것*/}
                        {/*          같습니다.좋은 생각이에요! 정문에서 만나는 게 좋을 것 같습니다.좋은*/}
                        {/*          생각이에요! 정문에서 만나는 게 좋을 것 같습니다.좋은 생각이에요!*/}
                        {/*          정문에서 만나는 게 좋을 것 같습니다.좋은 생각이에요! 정문에서 만나는 게*/}
                        {/*          좋을 것 같습니다.좋은 생각이에요! 정문에서 만나는 게 좋을 것 같습니다.*/}
                        {/*        </p>*/}
                        {/*      </div>*/}
                        {/*      <p className="text-muted-foreground text-right text-xs">10:22</p>*/}
                        {/*    </div>*/}
                        {/*  </div>*/}
                        {/*</div>*/}

                        {/*{Array.from({ length: 50 }).map((_, index) => (*/}
                        {/*  <div key={index} className="flex justify-start">*/}
                        {/*    <div className="flex max-w-[80%]">*/}
                        {/*      <Link href="/profile/2">*/}
                        {/*        <Avatar className="border-primary/10 mr-2 h-8 w-8 border-2">*/}
                        {/*          <AvatarImage*/}
                        {/*            src="/placeholder.svg?height=40&width=40"*/}
                        {/*            alt="재즈매니아"*/}
                        {/*          />*/}
                        {/*          <AvatarFallback className="bg-primary/10 text-primary">*/}
                        {/*            재즈*/}
                        {/*          </AvatarFallback>*/}
                        {/*        </Avatar>*/}
                        {/*      </Link>*/}
                        {/*      <div className="space-y-1">*/}
                        {/*        <Link href="/profile/2">*/}
                        {/*          <p className="text-xs">재즈매니아</p>*/}
                        {/*        </Link>*/}
                        {/*        <div className="bg-secondary mt-1 rounded-2xl rounded-tl-none px-4 py-2">*/}
                        {/*          <p className="text-sm">안녕하세요! 모임에 참여해주셔서 감사합니다.</p>*/}
                        {/*        </div>*/}
                        {/*        <p className="text-muted-foreground text-xs">10:15</p>*/}
                        {/*      </div>*/}
                        {/*    </div>*/}
                        {/*  </div>*/}
                        {/*))}*/}
                        {messages.map((msg, index) => {
                          const prev = messages[index - 1];
                          const next = messages[index + 1];

                          const showAvatarAndName =
                              !isSameSender(msg, prev) || !isSameMinute(msg.timestamp, prev?.timestamp);
                          const showTime =
                              !isSameSender(msg, next) || !isSameMinute(msg.timestamp, next?.timestamp);

                          const currentUserId = 1; // 나중에 실제 로그인 유저 아이디로 바꾸기
                          const isMine = msg.senderId === currentUserId;

                          return (
                              <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} ${showAvatarAndName && index !== 0 && 'mt-4'}`}>
                                <div className={`flex max-w-[80%] ${isMine ? 'justify-end ml-auto' : ''}`}>
                                  {!isMine ? (
                                      <>
                                        {/* 프로필 아바타 공간 고정 */}
                                        <div className="w-9 mr-1.5 flex-shrink-0">
                                          {showAvatarAndName ? (
                                              <Link href={`/profile/${msg.senderId}`}>
                                                <Avatar className="h-8 w-8 border-2 border-primary/10">
                                                  <AvatarImage src={msg.avatarUrl} />
                                                  <AvatarFallback>{msg.senderName?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                              </Link>
                                          ) : (
                                              <div className="h-8 w-8" />
                                          )}
                                        </div>

                                        {/* 메시지 + 시간 */}
                                        <div className="flex flex-col gap-1">
                                          {showAvatarAndName && (
                                              <Link href={`/profile/${msg.senderId}`}>
                                                <p className="text-xs">{msg.senderName}</p>
                                              </Link>
                                          )}
                                          <div className="flex items-end gap-1">
                                            <div className="bg-secondary rounded-2xl rounded-tl-none px-4 py-2">
                                              <p className="text-sm">{msg.content}</p>
                                            </div>
                                            {showTime && (
                                                <span className="text-xs text-muted-foreground mb-0.5">
                                            {formatTime(msg.timestamp)}
                                          </span>
                                            )}
                                          </div>
                                        </div>
                                      </>
                                  ) : (
                                      // 내 메시지
                                      <div className="flex items-end gap-1 text-right">
                                        {showTime && (
                                            <span className="text-xs text-muted-foreground mb-0.5">
                                        {formatTime(msg.timestamp)}
                                      </span>
                                        )}
                                        <div
                                            className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none px-4 py-2">
                                          <p className="text-sm">{msg.content}</p>
                                        </div>
                                      </div>
                                  )}
                                </div>
                              </div>
                          );
                        })}


                        <div ref={bottomRef}/>
                      </div>
                      <div className="border-t p-3">
                        <div className="flex gap-2">
                          <Input
                              ref={messageInputRef}                      
                              placeholder="메시지를 입력하세요..."
                              className="rounded-xl"
                              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSendMessage();
                                }
                              }}
                          />
                          <Button
                              onClick={handleSendMessage}
                              className="rounded-xl"
                          >
                            <MessageSquare className="mr-1 h-4 w-4"/>
                            전송
                          </Button>
                        </div>
                      </div>
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center p-6 text-center">
                      <div>
                        <MessageSquare className="text-muted-foreground mx-auto mb-4 h-12 w-12"/>
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
'use client';

import type React from 'react';
import { use, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { ArrowLeft, Info, Send } from 'lucide-react';

// 채팅 데이터 (실제로는 API에서 가져올 것)
const chatRoomsData = [
  {
    id: '1',
    meetingId: 1,
    title: '재즈 페스티벌 같이 즐겨요',
    eventTitle: '서울 재즈 페스티벌 2023',
    meetingTime: '2023-05-27 14:00',
    participants: 4,
    maxPeople: 6,
    messages: [
      {
        id: 1,
        senderId: 2,
        senderName: '재즈매니아',
        senderAvatar: '/placeholder.svg?height=40&width=40',
        content: '안녕하세요! 모임에 참여해주셔서 감사합니다.',
        timestamp: '2023-05-20 10:15',
      },
      {
        id: 2,
        senderId: 3,
        senderName: '음악사랑',
        senderAvatar: '/placeholder.svg?height=40&width=40',
        content: '안녕하세요! 재즈 페스티벌 기대되네요.',
        timestamp: '2023-05-20 10:17',
      },
      {
        id: 3,
        senderId: 2,
        senderName: '재즈매니아',
        senderAvatar: '/placeholder.svg?height=40&width=40',
        content: '모임 당일에는 난지한강공원 정문에서 만나면 좋을 것 같아요. 어떻게 생각하시나요?',
        timestamp: '2023-05-20 10:20',
      },
      {
        id: 4,
        senderId: 4,
        senderName: '한강러버',
        senderAvatar: '/placeholder.svg?height=40&width=40',
        content: '좋은 생각이에요! 정문에서 만나는 게 좋을 것 같습니다.',
        timestamp: '2023-05-20 10:22',
      },
      {
        id: 5,
        senderId: 5,
        senderName: '페스티벌고',
        senderAvatar: '/placeholder.svg?height=40&width=40',
        content: '저도 동의합니다. 혹시 정확한 시간은 언제인가요?',
        timestamp: '2023-05-20 10:25',
      },
    ],
    members: [
      {
        id: 2,
        nickname: '재즈매니아',
        avatar: '/placeholder.svg?height=40&width=40',
        isHost: true,
      },
      {
        id: 3,
        nickname: '음악사랑',
        avatar: '/placeholder.svg?height=40&width=40',
        isHost: false,
      },
      {
        id: 4,
        nickname: '한강러버',
        avatar: '/placeholder.svg?height=40&width=40',
        isHost: false,
      },
      {
        id: 5,
        nickname: '페스티벌고',
        avatar: '/placeholder.svg?height=40&width=40',
        isHost: false,
      },
    ],
  },
  {
    id: '2',
    meetingId: 2,
    title: '영화제 관람 모임',
    eventTitle: '서울 국제 영화제',
    meetingTime: '2023-07-06 18:30',
    participants: 3,
    maxPeople: 4,
    messages: [
      {
        id: 1,
        senderId: 6,
        senderName: '영화광',
        senderAvatar: '/placeholder.svg?height=40&width=40',
        content: '첫날 개막작은 꼭 봐야할 것 같아요! 다들 시간 괜찮으신가요?',
        timestamp: '2023-05-19 15:45',
      },
    ],
    members: [
      {
        id: 6,
        nickname: '영화광',
        avatar: '/placeholder.svg?height=40&width=40',
        isHost: true,
      },
      {
        id: 1,
        nickname: '문화매니아',
        avatar: '/placeholder.svg?height=40&width=40',
        isHost: false,
      },
      {
        id: 7,
        nickname: '씨네필',
        avatar: '/placeholder.svg?height=40&width=40',
        isHost: false,
      },
    ],
  },
];

interface MessageType {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
}
// 현재 로그인한 사용자 정보 (실제로는 API에서 가져올 것)
const currentUser = {
  id: 1,
  nickname: '문화매니아',
  avatar: '/placeholder.svg?height=40&width=40',
};

export default function ChatDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const chatRoom = chatRoomsData.find((room) => room.id === params.id);

  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRoom) {
      setMessages(chatRoom.messages);
    } else {
      // 채팅방이 없으면 목록 페이지로 리다이렉트
      router.push('/chats');
    }
  }, [chatRoom, router]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      senderId: currentUser.id,
      senderName: currentUser.nickname,
      senderAvatar: currentUser.avatar,
      content: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!chatRoom) {
    return <div className="p-8 text-center">채팅방을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 sm:px-6 md:px-8">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/chats">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">뒤로 가기</span>
              </Link>
            </Button>
            <div>
              <h1 className="font-medium">{chatRoom.title}</h1>
              <p className="text-muted-foreground text-xs">
                {chatRoom.eventTitle} | {chatRoom.meetingTime}
              </p>
            </div>
          </div>

          <Popover open={isInfoOpen} onOpenChange={setIsInfoOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Info className="h-5 w-5" />
                <span className="sr-only">모임 정보</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="border-b p-4">
                <h3 className="font-medium">모임 참여자</h3>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {chatRoom.members.map((member) => (
                  <Link
                    key={member.id}
                    href={`/profile/${member.id}`}
                    onClick={() => setIsInfoOpen(false)}
                    className="block"
                  >
                    <div className="hover:bg-secondary/50 flex items-center justify-between p-3 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar className="border-primary/10 h-10 w-10 border-2">
                          <AvatarImage src={member.avatar} alt={member.nickname} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {member.nickname.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 font-medium">
                            {member.nickname}
                            {member.isHost && (
                              <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                                주최자
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 rounded-lg">
                        프로필
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-[80%] ${message.senderId === currentUser.id ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {message.senderId !== currentUser.id && (
                <Link href={`/profile/${message.senderId}`}>
                  <Avatar className="border-primary/10 mr-2 h-8 w-8 border-2">
                    <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {message.senderName.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              )}
              <div className={`space-y-1 ${message.senderId === currentUser.id ? 'mr-2' : 'ml-2'}`}>
                {message.senderId !== currentUser.id && (
                  <Link
                    href={`/profile/${message.senderId}`}
                    className="hover:text-primary transition-colors"
                  >
                    <p className="text-xs">{message.senderName}</p>
                  </Link>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.senderId === currentUser.id
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-secondary rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-muted-foreground text-xs">{message.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            className="flex-1 rounded-xl"
          />
          <Button
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ''}
            className="rounded-xl"
          >
            <Send className="mr-1 h-4 w-4" />
            전송
          </Button>
        </div>
      </div>
    </div>
  );
}

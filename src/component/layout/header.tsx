'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar';
import { Button } from '@/component/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/component/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/component/ui/popover';
import { Sheet, SheetContent, SheetTrigger } from '@/component/ui/sheet';

import { useMediaQuery } from '@/hook/useMediaQuery';

import { cn } from '@/lib/utils';

import { Bell, Calendar, LogIn, Menu, MessageSquare, User } from 'lucide-react';

// 알림 데이터 (실제로는 API에서 가져올 것)
const notifications = [
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
];

// 로그인 상태 (실제로는 API에서 가져올 것)
const isLoggedIn = true;

export default function Header() {
  const router = useRouter();

  const isMobile = useMediaQuery('(max-width: 639px)'); // Tailwind 기준 sm 이하

  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 border-b shadow-xs backdrop-blur-md'
          : 'bg-background/60 backdrop-blur-xs',
      )}
    >
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8">
        <div className="flex h-14 items-center justify-between sm:h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-primary group relative text-xl font-bold">
              <span className="relative z-10">Seoul IN Culture</span>
              <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden space-x-6 md:flex">
              <Link
                href="/"
                className="text-foreground hover:text-primary group relative text-base font-medium transition-colors"
              >
                <span>메인</span>
                <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/calendar"
                className="text-foreground hover:text-primary group relative text-base font-medium transition-colors"
              >
                <span>행사캘린더</span>
                <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/my-meetings"
                className="text-foreground hover:text-primary group relative text-base font-medium transition-colors"
              >
                <span>내 모임</span>
                <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {/* 채팅 아이콘 */}
                <Link href="/chats">
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <MessageSquare className="h-5 w-5" />
                    <div className="absolute top-1 right-1.5 size-2 animate-pulse rounded-full bg-red-500" />
                    <span className="sr-only">채팅</span>
                  </Button>
                </Link>

                {/* 알림 팝오버 */}
                <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative rounded-full"
                      onClick={(e) => {
                        if (isMobile) {
                          e.preventDefault();
                          router.push('/notifications');
                        }
                      }}
                    >
                      <Bell className="h-5 w-5" />
                      <div className="absolute top-1 right-2 size-2 animate-pulse rounded-full bg-red-500" />
                      <span className="sr-only">알림</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="border-b p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">알림</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary h-auto p-0 text-xs"
                          onClick={() => setIsNotificationOpen(false)}
                        >
                          모두 읽음 표시
                        </Button>
                      </div>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div>
                          {notifications.map((notification) => (
                            <Link
                              key={notification.id}
                              href={notification.link}
                              onClick={() => setIsNotificationOpen(false)}
                            >
                              <div
                                className={cn(
                                  'hover:bg-secondary/50 border-b p-4 transition-colors last:border-b-0',
                                  !notification.isRead && 'bg-primary/5',
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className={cn(
                                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                                      notification.type === 'meeting_join' &&
                                        'bg-primary/10 text-primary',
                                      notification.type === 'chat_message' &&
                                        'bg-emerald-100 text-emerald-700',
                                      notification.type === 'event_reminder' &&
                                        'bg-amber-100 text-amber-700',
                                    )}
                                  >
                                    {notification.type === 'meeting_join' && (
                                      <User className="h-4 w-4" />
                                    )}
                                    {notification.type === 'chat_message' && (
                                      <MessageSquare className="h-4 w-4" />
                                    )}
                                    {notification.type === 'event_reminder' && (
                                      <Calendar className="h-4 w-4" />
                                    )}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center justify-between">
                                      <p className="text-sm font-medium">{notification.title}</p>
                                      <span className="text-muted-foreground text-xs">
                                        {notification.time}
                                      </span>
                                    </div>
                                    <p className="text-muted-foreground line-clamp-2 text-sm">
                                      {notification.message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-muted-foreground py-8 text-center">
                          <p>알림이 없습니다</p>
                        </div>
                      )}
                    </div>
                    <div className="border-t p-2">
                      <Link href="/notifications">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary w-full"
                          onClick={() => setIsNotificationOpen(false)}
                        >
                          모든 알림 보기
                        </Button>
                      </Link>
                    </div>
                  </PopoverContent>
                </Popover>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative hidden h-auto p-0 hover:bg-transparent sm:block"
                    >
                      <Avatar className="h-9 w-9 transition-transform duration-300 hover:scale-110">
                        <AvatarImage src="/placeholder.svg?height=36&width=36" />
                        <AvatarFallback>사용자</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        마이페이지
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive cursor-pointer">
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button className="hidden items-center gap-2 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg sm:flex">
                <LogIn className="h-4 w-4" />
                로그인
              </Button>
            )}

            {/* Mobile Navigation */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild className="ml-1 md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">메뉴</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] pt-10 pb-5 sm:w-[350px]">
                <nav className="flex h-full flex-col justify-between">
                  <div className="flex flex-col gap-6">
                    <div className="mb-2 border-b pb-6">
                      {isLoggedIn ? (
                        <>
                          <Link
                            href="/profile"
                            className="flex items-center gap-3"
                            onClick={() => setIsMobileOpen(false)}
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="/placeholder.svg?height=40&width=40" />
                              <AvatarFallback>사용자</AvatarFallback>
                            </Avatar>
                            <div className="text-lg font-medium">문화매니아</div>
                          </Link>
                        </>
                      ) : (
                        <Button
                          className="flex w-full items-center justify-center gap-2 rounded-xl"
                          onClick={() => setIsMobileOpen(false)}
                        >
                          <LogIn className="h-4 w-4" />
                          로그인
                        </Button>
                      )}
                    </div>
                    <Link
                      href="/"
                      className="hover:text-primary text-lg font-medium transition-colors"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      메인
                    </Link>
                    <Link
                      href="/calendar"
                      className="hover:text-primary text-lg font-medium transition-colors"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      행사캘린더
                    </Link>
                    <Link
                      href="/my-meetings"
                      className="hover:text-primary text-lg font-medium transition-colors"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      내 모임
                    </Link>
                  </div>

                  {isLoggedIn && (
                    <Button
                      variant="outline"
                      className="text-destructive w-full rounded-xl"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      로그아웃
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { motion } from 'framer-motion';
import { ArrowRight, Edit, MapPin, Star, User } from 'lucide-react';

// 사용자 프로필 데이터 (실제로는 API에서 가져올 것)
const userData = {
  id: 1,
  nickname: '문화매니아',
  avatar: '/placeholder.svg?height=128&width=128',
  district: '마포구',
  gender: 'male',
  age: 28,
  mannerScore: 4.7,
  createdAt: '2022년 05월 15일',
  bookmarkedEvents: 12,
  participatedMeetings: 8,
  hostedMeetings: 3,
  email: 'culture@example.com',
  experience: 75, // 경험치 (100이 최대)
  level: 3, // 레벨
};

export default function ProfilePage() {
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

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:px-8">
      <motion.div
        className="mb-8 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">마이페이지</h1>
        <Link href="/profile/edit">
          <Button className="flex items-center gap-2 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
            <Edit className="h-4 w-4" />
            <span>프로필 수정</span>
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="sinc-card p-6 text-center">
            <div className="mb-4 flex justify-center">
              <Avatar className="border-primary/10 h-32 w-32 border-4">
                <AvatarImage src={userData.avatar} alt={userData.nickname} />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                  {userData.nickname.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="mb-3 text-2xl font-bold">{userData.nickname}</h2>
            <p className="text-muted-foreground text-sm">가입일: {userData.createdAt}</p>
            <p className="text-muted-foreground mb-4">{userData.email}</p>

            <div className="mb-2 flex justify-center">
              <div className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1.5">
                <Star className="fill-primary h-4 w-4" />
                <span className="font-medium">{userData.mannerScore}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-1 flex justify-between text-sm">
                <span>Lv. {userData.level}</span>
                <span>{userData.experience}%</span>
              </div>
              <Progress value={userData.experience} className="h-2" />
            </div>

            <div className="mb-6 flex items-start justify-around text-left sm:flex-col">
              <div className="hover:bg-secondary/50 flex items-center gap-2 rounded-lg p-2 transition-colors">
                <MapPin className="text-primary h-5 w-5" />
                <span>{userData.district}</span>
              </div>
              <div className="hover:bg-secondary/50 flex items-center gap-2 rounded-lg p-2 transition-colors">
                <User className="text-primary h-5 w-5" />
                <span>
                  {userData.gender === 'male' ? '남성' : '여성'}, {userData.age}세
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t pt-4">
              <Link
                href="/profile/bookmarks"
                className="hover:bg-secondary/50 rounded-xl p-3 text-center transition-colors"
              >
                <div className="text-primary text-2xl font-bold">{userData.bookmarkedEvents}</div>
                <div className="text-muted-foreground text-xs">찜한 행사</div>
              </Link>
              <Link
                href="/my-meetings"
                className="hover:bg-secondary/50 rounded-xl p-3 text-center transition-colors"
              >
                <div className="text-primary text-2xl font-bold">
                  {userData.participatedMeetings}
                </div>
                <div className="text-muted-foreground text-xs">참여 모임</div>
              </Link>
              <Link
                href="/my-meetings"
                className="hover:bg-secondary/50 rounded-xl p-3 text-center transition-colors"
              >
                <div className="text-primary text-2xl font-bold">{userData.hostedMeetings}</div>
                <div className="text-muted-foreground text-xs">주최 모임</div>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-6 md:col-span-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="sinc-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-medium">받은 후기</h2>
                <Link href="/profile/reviews">
                  <Button variant="ghost" size="sm" className="text-primary">
                    자세히 보기
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                <div className="bg-secondary/30 rounded-xl p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="border-primary/10 h-10 w-10 border-2">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-primary/10 text-primary">JM</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="line-clamp-1 font-medium">
                          재즈매니아재즈매니아재즈매니아재즈매니아
                        </div>
                        <div className="text-muted-foreground text-xs">2023-05-30</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? 'fill-primary text-primary' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="line-clamp-3 text-sm">
                    시간 약속을 잘 지키고 모임 분위기를 즐겁게 이끌어주셨어요. 다음에도 같이
                    모임하고 싶습니다!시간 약속을 잘 지키고 모임 분위기를 즐겁게 이끌어주셨어요.
                    다음에도 같이 모임하고 싶습니다!시간 약속을 잘 지키고 모임 분위기를 즐겁게
                    이끌어주셨어요. 다음에도 같이 모임하고 싶습니다!시간 약속을 잘 지키고 모임
                    분위기를 즐겁게 이끌어주셨어요. 다음에도 같이 모임하고 싶습니다!시간 약속을 잘
                    지키고 모임 분위기를 즐겁게 이끌어주셨어요. 다음에도 같이 모임하고 싶습니다!시간
                    약속을 잘 지키고 모임 분위기를 즐겁게 이끌어주셨어요. 다음에도 같이 모임하고
                    싶습니다!시간 약속을 잘 지키고 모임 분위기를 즐겁게 이끌어주셨어요. 다음에도
                    같이 모임하고 싶습니다!
                  </p>
                </div>

                <div className="bg-secondary/30 rounded-xl p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="border-primary/10 h-10 w-10 border-2">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-primary/10 text-primary">MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">음악사랑</div>
                        <div className="text-muted-foreground text-xs">2023-04-20</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? 'fill-primary text-primary' : 'text-neutral-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">
                    친절하고 매너가 좋았습니다. 행사에 대한 정보도 많이 알려주셔서 즐겁게 참여할 수
                    있었어요.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="sinc-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-medium">찜한 행사</h2>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Link
                  href="/events/1"
                  className="group overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video">
                    <Image
                      src="/placeholder.svg?height=120&width=240"
                      alt="서울 재즈 페스티벌"
                      fill
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="sinc-badge text-foreground absolute top-2 right-2 bg-white/90">
                      음악
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="group-hover:text-primary line-clamp-1 font-medium transition-colors">
                      서울 재즈 페스티벌 2023
                    </h3>
                    <p className="text-muted-foreground mt-1 text-xs">2023-05-27 ~ 2023-05-29</p>
                  </div>
                </Link>

                <div className="group overflow-hidden rounded-xl border transition-shadow hover:shadow-md">
                  <div className="relative aspect-video">
                    <Image
                      src="/placeholder.svg?height=120&width=240"
                      alt="서울 국제 영화제"
                      fill
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="sinc-badge text-foreground absolute top-2 right-2 bg-white/90">
                      영화
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="group-hover:text-primary line-clamp-1 font-medium transition-colors">
                      서울 국제 영화제
                    </h3>
                    <p className="text-muted-foreground mt-1 text-xs">2023-07-05 ~ 2023-07-14</p>
                  </div>
                </div>
              </div>

              <Link href="/profile/bookmarks">
                <Button
                  variant="outline"
                  className="flex w-full items-center justify-center rounded-xl"
                >
                  <span>모든 찜한 행사 보기</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

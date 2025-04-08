'use client';

import { use, useEffect, useState } from 'react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';

import { motion } from 'framer-motion';
import { Calendar, Filter, Plus, Users } from 'lucide-react';

// 행사 데이터 (실제로는 API에서 가져올 것)
const eventData = {
  id: 1,
  title: '서울 재즈 페스티벌 2023',
};

const genderOptions = ['전체', '남성', '여성'];

// 모임 데이터 (실제로는 API에서 가져올 것)
const meetingsData = [
  {
    id: 1,
    title: '재즈 페스티벌 같이 즐겨요',
    content:
      '재즈를 좋아하는 분들과 함께 페스티벌을 즐기고 싶어요. 첫날 공연을 함께 볼 분들을 찾습니다.',
    meetingTime: '2023-05-27 14:00',
    maxPeople: 6,
    participants: 4,
    minAge: 20,
    maxAge: 35,
    gender: null,
    status: '모집중',
    host: {
      nickname: '재즈매니아',
      avatar: '/placeholder.svg?height=40&width=40',
      mannerScore: 4.8,
    },
    canJoin: true,
  },
  {
    id: 2,
    title: '마지막 날 공연 함께해요',
    content:
      '페스티벌 마지막 날 헤드라이너 공연을 함께 볼 분들을 모집합니다. 공연 전에 근처에서 식사도 같이해요.',
    meetingTime: '2023-05-29 16:00',
    maxPeople: 4,
    participants: 2,
    minAge: null,
    maxAge: null,
    gender: null,
    status: '모집중',
    host: {
      nickname: '음악사랑',
      avatar: '/placeholder.svg?height=40&width=40',
      mannerScore: 4.5,
    },
    canJoin: true,
  },
  {
    id: 3,
    title: '둘째 날 저녁 공연만 볼 사람~',
    content: '둘째 날 저녁 공연만 보려고 합니다. 함께 즐기실 분들 모여요!',
    meetingTime: '2023-05-28 18:00',
    maxPeople: 5,
    participants: 3,
    minAge: 25,
    maxAge: 40,
    gender: null,
    status: '모집중',
    host: {
      nickname: '음악여행',
      avatar: '/placeholder.svg?height=40&width=40',
      mannerScore: 4.3,
    },
    canJoin: false,
  },
  {
    id: 4,
    title: '여성분들만 모여요',
    content: '여성분들끼리 안전하게 페스티벌 즐겨요. 첫째 날 오후부터 참여합니다.',
    meetingTime: '2023-05-27 13:00',
    maxPeople: 4,
    participants: 4,
    minAge: null,
    maxAge: null,
    gender: 'female',
    status: '모집완료',
    host: {
      nickname: '재즈걸',
      avatar: '/placeholder.svg?height=40&width=40',
      mannerScore: 4.9,
    },
    canJoin: false,
  },
];

export default function MeetingsPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [showOnlyJoinable, setShowOnlyJoinable] = useState(false);
  const [filteredMeetings, setFilteredMeetings] = useState(meetingsData);
  const [ageRange, setAgeRange] = useState<[number, number]>([15, 70]);
  const [genderFilter, setGenderFilter] = useState<string | null>('전체');
  const [isFilterOpen, setFilterOpen] = useState(false);

  const applyFilter = () => {
    let filtered = meetingsData;

    if (showOnlyJoinable) {
      filtered = filtered.filter((meeting) => meeting.canJoin);
    }

    // 나이 필터 적용
    if (ageRange[0] > 15 || ageRange[1] < 70) {
      filtered = filtered.filter((meeting) => {
        // 나이 제한이 없는 모임은 항상 표시
        if (!meeting.minAge && !meeting.maxAge) return true;

        // 나이 범위가 겹치는지 확인
        const meetingMinAge = meeting.minAge || 15;
        const meetingMaxAge = meeting.maxAge || 70;

        return !(ageRange[1] < meetingMinAge || ageRange[0] > meetingMaxAge);
      });
    }

    // 성별 필터 적용
    if (genderFilter) {
      filtered = filtered.filter((meeting) => {
        // 성별 제한이 없는 모임은 항상 표시
        if (!meeting.gender) return true;

        // 성별이 일치하는지 확인
        return meeting.gender === genderFilter;
      });
    }

    setFilteredMeetings(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [showOnlyJoinable]);

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
        className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold">모임 목록</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {eventData.title} 행사의 모임 목록입니다
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <Link href={`/events/${params.id}/meetings/create`}>
            <Button className="rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
              <Plus />
              모임 만들기
            </Button>
          </Link>
        </div>
        <div className="fixed right-0 bottom-4 z-50 px-4 py-2 sm:hidden">
          <div className="flex sm:hidden">
            <Link href={`/events/${params.id}/meetings/create`}>
              <Button className="rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
                <Plus />
                모임 만들기
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mb-6 flex gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Popover open={isFilterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 rounded-xl">
              <Filter className="h-4 w-4" />
              <span>필터</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <div>
                <Label className="mb-2 text-sm font-medium">나이</Label>
                <div className="px-2">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{ageRange[0]}세</span>
                    <span>{ageRange[1]}세</span>
                  </div>
                  <Slider
                    value={ageRange}
                    min={15}
                    max={70}
                    step={1}
                    disabled={showOnlyJoinable}
                    onValueChange={(value) => setAgeRange(value as [number, number])}
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">성별</h3>
                <div className="flex flex-wrap gap-2">
                  {genderOptions.map((option) => (
                    <Badge
                      key={option}
                      className={`cursor-pointer px-2 py-1 text-xs transition-all duration-200 ${
                        genderFilter === option
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                      onClick={() => setGenderFilter(option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                className="mt-2 w-full"
                onClick={() => {
                  applyFilter();
                  setFilterOpen(false);
                }}
              >
                필터 적용
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="joinable"
            checked={showOnlyJoinable}
            onCheckedChange={(checked) => setShowOnlyJoinable(checked as boolean)}
          />
          <Label htmlFor="joinable" className="cursor-pointer text-sm font-medium">
            참여 가능 모임만 보기
          </Label>
        </div>
      </motion.div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((meeting) => (
            <motion.div key={meeting.id} variants={itemVariants}>
              <Link href={`/meetings/${meeting.id}`}>
                <Card className="sinc-card rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row">
                      <div className="flex-1">
                        <div className="flex flex-col-reverse gap-1 sm:flex-row sm:gap-4">
                          <h3 className="text-lg font-medium">{meeting.title}</h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              className={`sinc-badge text-xs ${
                                meeting.status === '모집중'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {meeting.status}
                            </Badge>
                            {!meeting.canJoin && meeting.status === '모집중' && (
                              <Badge
                                variant="outline"
                                className="sinc-badge border-amber-200 bg-amber-50 text-xs text-amber-700"
                              >
                                참여 조건 미충족
                              </Badge>
                            )}
                            {(meeting.minAge || meeting.maxAge || meeting.gender) && (
                              <div className="flex flex-wrap gap-1">
                                {meeting.minAge && meeting.maxAge && (
                                  <Badge variant="outline" className="text-xs">
                                    {meeting.minAge}~{meeting.maxAge}세
                                  </Badge>
                                )}
                                {meeting.gender && (
                                  <Badge variant="outline" className="text-xs">
                                    {meeting.gender === 'male' ? '남성' : '여성'}만
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                          {meeting.content}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="text-primary h-4 w-4" />
                            <span className="text-xs text-neutral-600 sm:text-sm">
                              {meeting.meetingTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="text-primary h-4 w-4" />
                            <span className="text-xs text-neutral-600 sm:text-sm">
                              {meeting.participants}/{meeting.maxPeople} 명 참여중
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden flex-col justify-between gap-4 md:flex">
                        <div className="flex items-center gap-2">
                          <Avatar className="border-primary/10 h-10 w-10 border-2">
                            <AvatarImage src={meeting.host.avatar} alt={meeting.host.nickname} />
                            <AvatarFallback>{meeting.host.nickname.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{meeting.host.nickname}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="rounded-2xl bg-white py-16 text-center shadow-xs">
            <div className="mb-3 text-5xl">👥</div>
            <h3 className="mb-2 text-xl font-medium">조건에 맞는 모임이 없습니다</h3>
            <p className="text-muted-foreground mb-6">
              다른 조건으로 검색하거나 직접 모임을 만들어보세요
            </p>
            <Link href={`/events/${params.id}/meetings/create`}>
              <Button className="rounded-xl">모임 만들기</Button>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}

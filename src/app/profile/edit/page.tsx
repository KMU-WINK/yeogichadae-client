'use client';

import type React from 'react';
import { useState } from 'react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Loader2 } from 'lucide-react';

// 사용자 프로필 데이터 (실제로는 API에서 가져올 것)
const userData = {
  id: 1,
  nickname: '문화매니아',
  avatar: '/placeholder.svg?height=128&width=128',
  district: '마포구',
  gender: 'male',
  age: 28,
  mannerScore: 4.7,
  email: 'culture@example.com',
  showParticipatingMeetings: true,
};

// 서울시 자치구 목록
const districts = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];

export default function ProfileEditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: userData.nickname,
    district: userData.district,
    showParticipatingMeetings: userData.showParticipatingMeetings,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 실제로는 API 호출하여 프로필 업데이트
    setTimeout(() => {
      setIsLoading(false);
      // 성공 후 프로필 페이지로 리다이렉트
      window.location.href = '/profile';
    }, 1500);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:px-8">
      <Link href="/profile" className="text-primary mb-6 inline-flex items-center hover:underline">
        <ArrowLeft className="mr-1 h-4 w-4" />
        프로필로 돌아가기
      </Link>

      <motion.h1
        className="mb-8 text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        프로필 수정
      </motion.h1>

      <div className="mx-auto max-w-2xl">
        <motion.div
          className="sinc-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mb-8 flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="border-primary/10 h-32 w-32 border-4">
                    <AvatarImage src={userData.avatar} alt={userData.nickname} />
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                      {userData.nickname.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    size="icon"
                    className="bg-primary hover:bg-primary/90 absolute right-0 bottom-0 h-10 w-10 rounded-full text-white shadow-md"
                  >
                    <Camera className="h-5 w-5" />
                    <span className="sr-only">프로필 사진 변경</span>
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm">
                  프로필 사진을 변경하려면 아이콘을 클릭하세요
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="nickname" className="text-base">
                    닉네임
                  </Label>
                  <Input
                    id="nickname"
                    value={formData.nickname}
                    onChange={(e) => handleChange('nickname', e.target.value)}
                    className="rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base">
                    이메일
                  </Label>
                  <Input
                    id="email"
                    value={userData.email}
                    className="bg-muted rounded-xl"
                    disabled
                  />
                  <p className="text-muted-foreground text-xs">이메일은 변경할 수 없습니다</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="district" className="text-base">
                    지역구
                  </Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => handleChange('district', value)}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="지역구 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">성별</Label>
                  <Input
                    value={userData.gender === 'male' ? '남성' : '여성'}
                    className="bg-muted rounded-xl"
                    disabled
                  />
                  <p className="text-muted-foreground text-xs">성별은 변경할 수 없습니다</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">나이</Label>
                  <Input value={`${userData.age}세`} className="bg-muted rounded-xl" disabled />
                  <p className="text-muted-foreground text-xs">나이는 변경할 수 없습니다</p>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">참여 중인 모임 공개</Label>
                    <p className="text-muted-foreground text-sm">
                      다른 사용자가 내 프로필에서 참여 중인 모임을 볼 수 있습니다
                    </p>
                  </div>
                  <Switch
                    checked={formData.showParticipatingMeetings}
                    onCheckedChange={(value) => handleChange('showParticipatingMeetings', value)}
                  />
                </div>

                <div className="border-t pt-6">
                  <div className="bg-secondary/50 flex items-center gap-3 rounded-xl p-4">
                    <div className="flex-1">
                      <h3 className="font-medium">매너 점수</h3>
                      <p className="text-muted-foreground text-sm">
                        다른 사용자들이 평가한 나의 매너 점수입니다
                      </p>
                    </div>
                    <div className="text-primary text-2xl font-bold">{userData.mannerScore}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <Link href="/profile">
                  <Button
                    variant="outline"
                    type="button"
                    className="rounded-xl shadow-xs transition-all duration-300 hover:shadow-sm"
                  >
                    취소
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="rounded-xl shadow-md transition-all duration-300 hover:shadow-lg sm:ml-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      저장 중...
                    </>
                  ) : (
                    '저장하기'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

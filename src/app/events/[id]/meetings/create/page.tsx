'use client';

import type React from 'react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

const genderOptions = ['전체', '남성', '여성'];

// 행사 데이터 (실제로는 API에서 가져올 것)
const eventData = {
  id: 1,
  title: '서울 재즈 페스티벌 2023',
  startDate: '2023-05-27',
  endDate: '2023-05-29',
  district: '마포구',
  place: '난지한강공원',
};

export default function CreateMeetingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date(eventData.startDate));
  const [useAgeFilter, setUseAgeFilter] = useState(false);
  const [ageRange, setAgeRange] = useState([20, 40]);
  const [useGenderFilter, setUseGenderFilter] = useState(false);
  const [genderFilter, setGenderFilter] = useState<string | null>('전체');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 API 호출하여 모임 생성
    console.log('모임 생성 요청');
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-10 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold sm:text-3xl">모임 만들기</h1>
        <p className="text-muted-foreground mb-4 text-sm sm:text-base">{eventData.title}</p>

        <div className="sinc-card">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2.5">
                  <Label htmlFor="title">모임 제목</Label>
                  <Input
                    id="title"
                    placeholder="모임 제목을 입력하세요"
                    className="sinc-input mt-1"
                    required
                  />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="content">모임 설명</Label>
                  <Textarea
                    id="content"
                    placeholder="모임에 대한 설명을 입력하세요"
                    className="sinc-input mt-1 min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2.5">
                    <Label>모임 날짜</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'mt-1 w-full justify-start rounded-xl text-left font-normal',
                            !date && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP', { locale: ko }) : '날짜 선택'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          locale={ko}
                          className="rounded-xl"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2.5">
                    <Label>모임 시간</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <Input type="number" value={9} />
                      <p>:</p>
                      <Input type="number" value={30} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="maxPeople">최대 인원</Label>
                  <Select defaultValue="4">
                    <SelectTrigger className="mt-1 rounded-xl">
                      <SelectValue placeholder="인원 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}명
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-secondary/50 space-y-4 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">연령대 필터</h3>
                      <p className="text-muted-foreground mt-1 text-xs sm:mt-0 sm:text-sm">
                        특정 연령대만 참여 가능하도록 설정
                      </p>
                    </div>
                    <Switch checked={useAgeFilter} onCheckedChange={setUseAgeFilter} />
                  </div>

                  {useAgeFilter && (
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between text-sm">
                        <span>{ageRange[0]}세</span>
                        <span>{ageRange[1]}세</span>
                      </div>
                      <Slider
                        value={ageRange}
                        min={15}
                        max={70}
                        step={1}
                        onValueChange={(value) => {
                          // 양방향 슬라이더 값 설정
                          if (value.length === 2) {
                            setAgeRange(value as [number, number]);
                          }
                        }}
                        className="py-1"
                      />
                    </div>
                  )}
                </div>

                <div className="bg-secondary/50 space-y-4 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">성별 필터</h3>
                      <p className="text-muted-foreground mt-1 text-xs sm:mt-0 sm:text-sm">
                        특정 성별만 참여 가능하도록 설정
                      </p>
                    </div>
                    <Switch checked={useGenderFilter} onCheckedChange={setUseGenderFilter} />
                  </div>

                  {useGenderFilter && (
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
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button>모임 만들기</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

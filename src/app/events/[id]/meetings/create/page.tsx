'use client';

import type React from 'react';
import { use, useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { ArrowLeft, CalendarIcon, Clock } from 'lucide-react';

// 행사 데이터 (실제로는 API에서 가져올 것)
const eventData = {
  id: 1,
  title: '서울 재즈 페스티벌 2023',
  startDate: '2023-05-27',
  endDate: '2023-05-29',
  district: '마포구',
  place: '난지한강공원',
};

export default function CreateMeetingPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [date, setDate] = useState<Date | undefined>(new Date(eventData.startDate));
  const [time, setTime] = useState<string>('12:00');
  const [useAgeFilter, setUseAgeFilter] = useState(false);
  const [ageRange, setAgeRange] = useState([20, 40]);
  const [useGenderFilter, setUseGenderFilter] = useState(false);
  const [gender, setGender] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 API 호출하여 모임 생성
    console.log('모임 생성 요청');
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 md:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/events/${params.id}`}
          className="text-primary mb-6 inline-flex items-center hover:underline"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          행사로 돌아가기
        </Link>

        <h1 className="mb-2 text-3xl font-bold">모임 만들기</h1>
        <p className="text-muted-foreground mb-6">
          {eventData.title} 행사에 대한 모임을 만들어보세요.
        </p>

        <div className="sinc-card">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2.5">
                  <Label htmlFor="title" className="text-base">
                    모임 제목
                  </Label>
                  <Input
                    id="title"
                    placeholder="모임 제목을 입력하세요"
                    className="sinc-input"
                    required
                  />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="content" className="text-base">
                    모임 설명
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="모임에 대한 설명을 입력하세요"
                    className="sinc-input min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2.5">
                    <Label className="text-base">모임 날짜</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start rounded-xl text-left font-normal',
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
                          disabled={(date) => {
                            const start = new Date(eventData.startDate);
                            const end = new Date(eventData.endDate);
                            return date < start || date > end;
                          }}
                          className="rounded-xl"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2.5">
                    <Label className="text-base">모임 시간</Label>
                    <div className="flex items-center gap-2">
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className="w-full rounded-xl">
                          <SelectValue placeholder="시간 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                              {i.toString().padStart(2, '0')}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Clock className="text-primary h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="maxPeople" className="text-base">
                    최대 인원
                  </Label>
                  <Select defaultValue="4">
                    <SelectTrigger className="rounded-xl">
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
                      <p className="text-muted-foreground text-sm">
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
                        // thumbClassName="h-4 w-4 rounded-full border border-primary bg-background ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      />
                    </div>
                  )}
                </div>

                <div className="bg-secondary/50 space-y-4 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">성별 필터</h3>
                      <p className="text-muted-foreground text-sm">
                        특정 성별만 참여 가능하도록 설정
                      </p>
                    </div>
                    <Switch checked={useGenderFilter} onCheckedChange={setUseGenderFilter} />
                  </div>

                  {useGenderFilter && (
                    <RadioGroup value={gender || ''} onValueChange={setGender} className="pt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">남성만</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">여성만</Label>
                      </div>
                    </RadioGroup>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <Link href={`/events/${params.id}`}>
                  <Button variant="outline" type="button" className="rounded-xl">
                    취소
                  </Button>
                </Link>
                <Button type="submit" className="rounded-xl sm:ml-auto">
                  모임 만들기
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

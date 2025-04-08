'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { CalendarIcon, Filter, MapPin } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  category: string;
  district: string;
  place: string;
  isFree: boolean;
  mainImage: string;
}

// 날짜별 이벤트 데이터 (실제로는 API에서 가져올 것)
const eventsByDate: Record<string, Event[]> = {
  '2025-04-01': [
    {
      id: 2,
      title: '서울 국제 도서전',
      category: '전시',
      district: '강남구',
      place: '코엑스',
      isFree: true,
      mainImage: '/placeholder.svg?height=80&width=120',
    },
  ],
  '2025-04-02': [
    {
      id: 3,
      title: '서울 국제 영화제',
      category: '영화',
      district: '종로구',
      place: '메가박스 동대문',
      isFree: false,
      mainImage: '/placeholder.svg?height=80&width=120',
    },
    {
      id: 9,
      title: '서울 마라톤1',
      category: '스포츠',
      district: '중구',
      place: '광화문광장',
      isFree: false,
      mainImage: '/placeholder.svg?height=80&width=120',
    }
  ],
  '2025-04-03': [
    {
      id: 4,
      title: '서울 빛초롱 축제',
      category: '축제',
      district: '중구',
      place: '청계천',
      isFree: true,
      mainImage: '/placeholder.svg?height=80&width=120',
    },
    {
      id: 10,
      title: 'K-핸드메이드페어 2025',
      category: '음악',
      district: '마포구',
      place: 'K-핸드메이드페어 2025',
      isFree: false,
      mainImage:
          'https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=42afe00583eb4b0983dba37a04a41222&thumb=Y',
    },
    {
      id: 11,
      title: '서울 국제 미술전',
      category: '전시',
      district: '종로구',
      place: '서울시립미술관',
      isFree: false,
      mainImage: '/placeholder.svg?height=80&width=120',
    }
  ],
  '2025-04-04': [
    {
      id: 5,
      title: '서울 디자인 페스티벌',
      category: '전시',
      district: '강남구',
      place: '코엑스',
      isFree: false,
      mainImage: '/placeholder.svg?height=80&width=120',
    },
  ],
  '2023-04-16': [
    {
      id: 6,
      title: '서울 마라톤',
      category: '스포츠',
      district: '중구',
      place: '광화문광장',
      isFree: false,
      mainImage: '/placeholder.svg?height=80&width=120',
    },
  ],
  '2023-03-31': [
    {
      id: 1,
      title: 'K-핸드메이드페어 2025',
      category: '음악',
      district: '마포구',
      place: 'K-핸드메이드페어 2025',
      isFree: false,
      mainImage:
        'https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=42afe00583eb4b0983dba37a04a41222&thumb=Y',
    },
    {
      id: 7,
      title: '서울 벚꽃 축제',
      category: '축제',
      district: '영등포구',
      place: '여의도 한강공원',
      isFree: true,
      mainImage: '/placeholder.svg?height=80&width=120',
    },
    {
      id: 8,
      title: '서울 국제 미술전',
      category: '전시',
      district: '종로구',
      place: '서울시립미술관',
      isFree: false,
      mainImage: '/placeholder.svg?height=80&width=120',
    },
  ],
};

// 카테고리 목록
const categories = ['전체', '음악', '전시', '영화', '축제', '스포츠', '공연', '기타'];

// 비용 필터 옵션
const feeOptions = ['전체', '무료', '유료'];

// 지역구 목록
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

// TODO: 필터 카테고리 여러개 선택 되도록
// TODO: 캘린더에 행사 있으면 표시 (개수별 색 알림)
// TODO: 캘린더 호버 및 각종 이벤트시 이상함.
export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date('2023-03-31'));
  // const [category, setCategory] = useState('전체');
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>(['전체']);

  const [feeOption, setFeeOption] = useState('전체');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  // 지역구 추가 함수
  const addDistrict = (district: string) => {
    if (!selectedDistricts.includes(district)) {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  // 지역구 제거 함수
  const removeDistrict = (district: string) => {
    setSelectedDistricts(selectedDistricts.filter((d) => d !== district));
  };

  // 카테고리 선택 함수
  const toggleCategory = (cat: string) => {
    if (cat === '전체') {
      setCategoriesSelected(['전체']);
    } else {
      setCategoriesSelected((prev) => {
        if (prev.includes(cat)) {
          const filtered = prev.filter((c) => c !== cat);
          return filtered.length === 0 ? ['전체'] : filtered;
        } else {
          const withoutAll = prev.filter((c) => c !== '전체');
          return [...withoutAll, cat];
        }
      });
    }
  };

  // 이벤트 필터링 적용
  const applyFilters = () => {
    let events = formattedDate in eventsByDate ? eventsByDate[formattedDate] : [];

    // if (category !== '전체') {
    //   events = events.filter((event) => event.category === category);
    // }
    if (
        categoriesSelected.length > 0 &&
        !categoriesSelected.includes('전체')
    ) {
      events = events.filter((event) =>
          categoriesSelected.includes(event.category)
      );
    }

    if (selectedDistricts.length > 0) {
      events = events.filter((event) => selectedDistricts.includes(event.district));
    }

    if (feeOption !== '전체') {
      events = events.filter((event) => (feeOption === '무료' ? event.isFree : !event.isFree));
    }

    setFilteredEvents(events);
  };

  // 날짜 변경 시 필터링 적용
  useEffect(() => {
    applyFilters();
  }, [formattedDate]);

  // 이벤트가 있는 날짜에 표시할 함수
  // const hasEventDate = (day: Date) => {
  //   const formatted = format(day, 'yyyy-MM-dd');
  //   return formatted in eventsByDate;
  // };

  // 이벤트 개수 카운트
  const getEventCountForDate = (day: Date): number => {
    const formatted = format(day, 'yyyy-MM-dd');
    return eventsByDate[formatted]?.length || 0;
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

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:px-8">
      <motion.div
        className="mb-8 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">행사 캘린더</h1>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 rounded-xl">
              <Filter className="h-4 w-4" />
              <span>필터</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">카테고리</h3>
                <div className="flex flex-wrap gap-2">
                  {/*{categories.map((cat) => (*/}
                  {/*  <Badge*/}
                  {/*    key={cat}*/}
                  {/*    className={`cursor-pointer px-2 py-1 text-xs transition-all duration-200 ${*/}
                  {/*      category === cat*/}
                  {/*        ? 'bg-primary text-primary-foreground hover:bg-primary/90'*/}
                  {/*        : 'bg-secondary text-foreground hover:bg-secondary/80'*/}
                  {/*    }`}*/}
                  {/*    onClick={() => setCategory(cat)}*/}
                  {/*  >*/}
                  {/*    {cat}*/}
                  {/*  </Badge>*/}
                  {/*))}*/}
                  {categories.map((cat) => {
                    const isSelected = categoriesSelected.includes(cat);
                    return (
                        <Badge
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`cursor-pointer px-3 py-1.5 text-sm rounded-full ${
                                isSelected
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          {cat}
                        </Badge>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">지역</h3>
                <div className="mb-3 flex flex-wrap gap-2">
                  {selectedDistricts.map((dist) => (
                    <Badge
                      key={dist}
                      className="bg-primary text-primary-foreground px-2 py-1 text-xs"
                    >
                      {dist}
                      <button
                        className="ml-2 hover:text-white/80"
                        onClick={(e) => {
                          e.preventDefault();
                          removeDistrict(dist);
                        }}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={(value) => value !== '전체' && addDistrict(value)}>
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="지역구 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전체">전체</SelectItem>
                    {districts.map((dist) => (
                      <SelectItem key={dist} value={dist}>
                        {dist}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">비용</h3>
                <div className="flex flex-wrap gap-2">
                  {feeOptions.map((option) => (
                    <Badge
                      key={option}
                      className={`cursor-pointer px-2 py-1 text-xs transition-all duration-200 ${
                        feeOption === option
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                      onClick={() => setFeeOption(option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                className="mt-2 w-full"
                onClick={() => {
                  applyFilters();
                }}
              >
                필터 적용
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="sinc-card flex flex-col items-center p-6">
            <h2 className="mb-4 self-start text-xl font-medium">날짜 선택</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ko}
              className="mx-auto rounded-xl"
              fixedWeeks={true}
              ISOWeek={false}
              // modifiers={{
              //   hasEvent: (date) => hasEventDate(date),
              // }}
              modifiers={{
                event1: (date) => getEventCountForDate(date) === 1,
                event2: (date) => getEventCountForDate(date) === 2,
                event3plus: (date) => getEventCountForDate(date) >= 3,
              }}
              modifiersClassNames={{
                event1: 'event-count-1',
                event2: 'event-count-2',
                event3plus: 'event-count-3plus',
              }}

              modifiersStyles={{
                hasEvent: {
                  fontWeight: 'bold',
                  backgroundColor: 'hsl(var(--primary) / 0.1)',
                  color: 'hsl(var(--primary))',
                },
                today: {
                  backgroundColor: 'transparent',
                  // color: 'hsl(var(--primary))',
                  color: 'red',
                  fontWeight: 'bolder',
                  border: '1px solid hsl(var(--primary))',
                },
                selected: {
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'white',
                  fontWeight: 'bold',
                },
                event1: { backgroundColor: '#dbeafe', color: '#1e40af' },       // light blue
                event2: { backgroundColor: '#93c5fd', color: '#1e3a8a' },       // medium blue
                event3plus: { backgroundColor: '#3b82f6', color: 'white' }
              }}
              styles={
                {
                  // day_selected: {
                  //   backgroundColor: 'hsl(var(--primary))',
                  //   color: 'white',
                  //   fontWeight: 'bold',
                  //   borderRadius: '9999px',
                  // },
                  // day_today: {
                  //   backgroundColor: 'transparent',
                  //   color: 'hsl(var(--primary))',
                  //   fontWeight: 'bold',
                  //   border: '1px solid hsl(var(--primary))',
                  //   borderRadius: '9999px',
                  // },
                }
              }
            />
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="sinc-card p-6">
            <div className="mb-6 flex items-center">
              <CalendarIcon className="text-primary mr-2 h-5 w-5" />
              <h2 className="text-xl font-medium">
                {date ? format(date, 'yyyy년 M월 d일', { locale: ko }) : '날짜를 선택하세요'}
              </h2>
            </div>

            {filteredEvents.length > 0 ? (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredEvents.map((event) => (
                  <Link href={`/events/${event.id}`} key={event.id}>
                    <motion.div
                      key={event.id}
                      variants={itemVariants}
                      className="hover:bg-secondary/50 flex cursor-pointer gap-4 rounded-xl px-2 py-4 transition-colors"
                    >
                      <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={event.mainImage || '/placeholder.svg'}
                          alt={event.title}
                          fill
                          className="object-cover"
                          key={event.id}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1.5 flex items-center gap-2">
                          <Badge className="sinc-badge text-foreground border bg-white outline outline-neutral-200">
                            {event.category}
                          </Badge>
                          <Badge
                            className={`sinc-badge ${event.isFree ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/10 text-primary'}`}
                          >
                            {event.isFree ? '무료' : '유료'}
                          </Badge>
                        </div>
                        <h3 className="mb-1 line-clamp-1 text-lg font-medium">{event.title}</h3>
                        <div className="text-muted-foreground flex items-center text-sm">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span className="line-clamp-1">{event.place}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            ) : (
              <div className="text-muted-foreground py-16 text-center">
                <div className="mb-3 text-5xl">🗓️</div>
                <p className="text-lg">선택한 날짜에 예정된 행사가 없습니다.</p>
                <p className="mt-1 text-sm">다른 날짜를 선택해보세요.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

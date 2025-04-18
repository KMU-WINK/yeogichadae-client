'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { events } from '@/__mock__';
import { District, EventCategory } from '@/__mock__/types';
import { Badge } from '@/components/ui/badge';
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
import { motion } from 'framer-motion';
import { ArrowDown, Calendar, MapPin, Search, Users } from 'lucide-react';

// 카테고리 목록
const categories = Object.values(EventCategory);

// 지역구 목록
const districts = Object.values(District);

// 비용 필터 옵션
const feeOptions = ['전체', '무료', '유료'];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string[]>(['전체']);
  const [feeOption, setFeeOption] = useState('전체');
  const [filteredEvents, setFilteredEvents] = useState(events);
  const router = useRouter();

  const allEventsRef = useRef<HTMLDivElement>(null);

  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const isMobile = useMediaQuery('(max-width: 639px)'); // Tailwind 기준 sm 이하
  const displayEvents = isMobile ? events.slice(0, 4) : events.slice(0, 6);
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

  // 검색 및 필터링 적용
  useEffect(() => {
    let result = [...events];

    // 검색어 필터링
    if (searchQuery) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.host.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // 카테고리 필터링
    if (!category.includes('전체')) {
      result = result.filter((event) => category.includes(event.category));
    }

    // 지역구 필터링
    if (selectedDistricts.length > 0) {
      result = result.filter((event) => selectedDistricts.includes(event.district));
    }

    // 비용 필터링
    if (feeOption !== '전체') {
      result = result.filter((event) => (feeOption === '무료' ? event.free : !event.free));
    }

    setFilteredEvents(result);
  }, [searchQuery, category, selectedDistricts, feeOption]);

  const scrollToAllEvents = () => {
    allEventsRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  // 이벤트 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replace(/\. /g, '-')
      .replace('.', '');
  };

  return (
    <div>
      {/* 히어로 섹션 */}
      <motion.section
        className="from-primary/5 to-background bg-linear-to-b pt-24 pb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="mb-6 text-3xl font-bold sm:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              서울의 문화행사,
              <br />
              함께할 친구를 찾아보세요
            </motion.h1>
            <motion.p
              className="text-muted-foreground mb-8 sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              서울시 문화행사 정보를 확인하고
              <br className="block sm:hidden" />
              같은 관심사를 가진 사람들과 함께 즐겨보세요
            </motion.p>
            <motion.div
              className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row sm:pt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/calendar">
                <Button
                  size="lg"
                  className="flex h-12 items-center justify-center gap-2 rounded-xl text-base text-[15px] shadow-lg transition-all duration-300 hover:shadow-xl sm:text-base"
                >
                  <Calendar className="h-5 w-5" />
                  <span>달력으로 보기</span>
                </Button>
              </Link>
              <Link href="/my-meetings">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex h-12 items-center justify-center gap-2 rounded-xl text-base text-[15px] shadow-xs transition-all duration-300 hover:shadow-md sm:text-base"
                >
                  <Users className="h-5 w-5" />
                  <span>내 모임 관리</span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 인기 행사 섹션 */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8">
          <motion.div
            className="mb-2 flex items-center justify-between sm:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold md:text-3xl">인기 행사</h2>
            <Button variant="ghost" className="text-primary group" onClick={scrollToAllEvents}>
              <span className="flex items-center">
                모든 행사 보기
                <ArrowDown className="ml-1 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </span>
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayEvents.map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                {/*<Link href={`/events/${event.id}`} className="group">*/}
                <div
                  className="sinc-card flex h-full cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
                  onClick={() => router.push(`/events/${event.id}`)}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={event.image || '/placeholder.svg'}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge
                        className={`sinc-badge ${event.free ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/10 text-primary'}`}
                      >
                        {event.free ? '무료' : '유료'}
                      </Badge>
                    </div>
                    <Badge className="sinc-badge text-foreground absolute top-3 left-3 bg-white/90">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="flex-1 p-5">
                    <h3 className="group-hover:text-primary mb-2 line-clamp-1 text-lg font-medium transition-colors">
                      {event.title}
                    </h3>
                    <div className="mt-auto flex flex-col gap-1.5">
                      <div className="text-muted-foreground flex items-center text-sm">
                        <MapPin className="mr-1.5 h-4 w-4 shrink-0" />
                        <span>
                          {event.district} {event.location}
                        </span>
                      </div>
                      <div className="text-muted-foreground flex items-center text-sm">
                        <Calendar className="mr-1.5 h-4 w-4 shrink-0" />
                        <span>
                          {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary/30 flex items-center justify-between border-t px-5 py-3">
                    <div className="text-sm">
                      <span className="text-primary font-medium">12개</span>의 모임 진행중
                    </div>
                    <Link
                      href={`/events/${event.id}/meetings`}
                      className="text-primary hover:text-primary/80 h-auto rounded-md p-0 text-sm font-medium hover:bg-transparent"
                    >
                      자세히 보기
                    </Link>
                  </div>
                </div>
                {/*</Link>*/}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 전체 행사 목록 */}
      <section
        ref={allEventsRef}
        className="scroll-mt-14 bg-gray-50 py-10 sm:scroll-mt-16 md:py-16"
      >
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8">
          <motion.h2
            className="mb-4 text-2xl font-bold md:text-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            전체 행사 목록
          </motion.h2>

          {/* 검색 및 필터링 */}
          <motion.div
            className="mb-10 rounded-2xl bg-white p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative mb-6 flex items-center">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
              <Input
                type="search"
                placeholder="행사 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl pl-10"
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="category" className="mb-3 block text-sm font-medium">
                  구분
                </Label>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    key="전체"
                    className={`cursor-pointer px-3 py-1.5 text-sm transition-all duration-200 ${
                      category.includes('전체')
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                    onClick={() => setCategory(['전체'])}
                  >
                    전체
                  </Badge>
                  {categories.map((cat) => (
                    <Badge
                      key={cat}
                      className={`cursor-pointer px-3 py-1.5 text-sm transition-all duration-200 ${
                        category.includes(cat)
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                      onClick={() =>
                        setCategory((prev) =>
                          prev.includes(cat)
                            ? prev.filter((c) => c !== cat)
                            : [...prev, cat].filter((c) => c !== '전체'),
                        )
                      }
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="district" className="mb-1.5 block text-sm font-medium">
                  지역
                </Label>
                <div className="mb-3 flex flex-wrap gap-2">
                  {selectedDistricts.map((dist) => (
                    <Badge
                      key={dist}
                      className="bg-primary text-primary-foreground px-3 py-1.5 text-sm"
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
                <div className="flex gap-2">
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
              </div>

              <div>
                <Label htmlFor="fee" className="mb-1.5 block text-sm font-medium">
                  비용
                </Label>
                <div className="flex flex-wrap gap-2">
                  {feeOptions.map((option) => (
                    <Badge
                      key={option}
                      className={`cursor-pointer px-3 py-1.5 text-sm transition-all duration-200 ${
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
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEvents.map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                {/*<Link href={`/events/${event.id}`} className="group">*/}
                <div
                  className="sinc-card flex h-full cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
                  onClick={() => router.push(`/events/${event.id}`)}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={event.image || '/placeholder.svg'}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge
                        className={`sinc-badge ${event.free ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/10 text-primary'}`}
                      >
                        {event.free ? '무료' : '유료'}
                      </Badge>
                    </div>
                    <Badge className="sinc-badge text-foreground absolute top-3 left-3 bg-white/90">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="flex-1 p-5">
                    <h3 className="group-hover:text-primary mb-2 line-clamp-1 text-lg font-medium transition-colors">
                      {event.title}
                    </h3>
                    <div className="mt-auto flex flex-col gap-1.5">
                      <div className="text-muted-foreground flex items-center text-sm">
                        <MapPin className="mr-1.5 h-4 w-4 shrink-0" />
                        <span>
                          {event.district} {event.location}
                        </span>
                      </div>
                      <div className="text-muted-foreground flex items-center text-sm">
                        <Calendar className="mr-1.5 h-4 w-4 shrink-0" />
                        <span>
                          {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary/30 flex items-center justify-between border-t px-5 py-3">
                    <div className="text-sm">
                      <span className="text-primary font-medium">12개</span>의 모임 진행중
                    </div>
                    <Link
                      href={`/events/${event.id}/meetings`}
                      className="text-primary hover:text-primary/80 h-auto rounded-md p-0 text-sm font-medium hover:bg-transparent"
                    >
                      자세히 보기
                    </Link>
                  </div>
                </div>
                {/*</Link>*/}
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="py-8 text-center sm:py-16">
              <p className="text-muted-foreground text-lg">검색 결과가 없습니다</p>
              <p className="text-muted-foreground mt-2 text-sm">
                다른 검색어나 필터를 시도해보세요
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

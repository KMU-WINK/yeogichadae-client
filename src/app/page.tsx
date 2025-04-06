'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

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

import { events } from '@/__mock__';
import { District, EventCategory } from '@/__mock__/types';
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
  const [category, setCategory] = useState<string>('전체');
  const [feeOption, setFeeOption] = useState('전체');
  const [filteredEvents, setFilteredEvents] = useState(events);

  const allEventsRef = useRef<HTMLDivElement>(null);

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
    if (category !== '전체') {
      result = result.filter((event) => event.category === category);
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
              className="mb-6 text-4xl font-bold md:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              서울의 문화행사,
              <br />
              함께할 친구를 찾아보세요
            </motion.h1>
            <motion.p
              className="text-muted-foreground mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              서울시 문화행사 정보를 확인하고 같은 관심사를 가진 사람들과 함께 즐겨보세요
            </motion.p>
            <motion.div
              className="flex justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/calendar">
                <Button
                  size="lg"
                  className="flex h-12 items-center gap-2 rounded-xl text-base shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Calendar className="h-5 w-5" />
                  <span>달력으로 보기</span>
                </Button>
              </Link>
              <Link href="/my-meetings">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex h-12 items-center gap-2 rounded-xl text-base shadow-xs transition-all duration-300 hover:shadow-md"
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
            className="mb-8 flex items-center justify-between"
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
            {events.slice(0, 6).map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                <Link href={`/events/${event.id}`} className="group">
                  <div className="sinc-card flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
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
                      <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                        {event.host}
                      </p>
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
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:text-primary/80 h-auto p-0 hover:bg-transparent"
                      >
                        자세히 보기
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <motion.section
        className="bg-primary/5 py-12 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              className="mb-4 text-2xl font-bold md:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              나만의 모임을 만들어보세요
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              관심있는 행사를 찾고, 함께할 사람들을 모아 특별한 경험을 만들어보세요
            </motion.p>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="flex h-12 items-center gap-2 rounded-xl text-base shadow-lg transition-all duration-300 hover:shadow-xl"
                onClick={scrollToAllEvents}
              >
                <span>행사 찾아보기</span>
                <ArrowDown className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 전체 행사 목록 */}
      <div ref={allEventsRef}></div>
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8">
          <motion.h2
            className="mb-8 text-2xl font-bold md:text-3xl"
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
                      category === '전체'
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                    onClick={() => setCategory('전체')}
                  >
                    전체
                  </Badge>
                  {categories.map((cat) => (
                    <Badge
                      key={cat}
                      className={`cursor-pointer px-3 py-1.5 text-sm transition-all duration-200 ${
                        category === cat
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                      onClick={() => setCategory(cat)}
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
                <Link href={`/events/${event.id}`} className="group">
                  <div className="sinc-card flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="relative h-40 w-full overflow-hidden">
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
                    <div className="flex-1 p-4">
                      <h3 className="group-hover:text-primary mb-1 line-clamp-1 text-base font-medium transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-2 line-clamp-2 text-xs">
                        {event.host}
                      </p>
                      <div className="mt-auto flex flex-col gap-1">
                        <div className="text-muted-foreground flex items-center text-xs">
                          <MapPin className="mr-1 h-3.5 w-3.5 shrink-0" />
                          <span>{event.district}</span>
                        </div>
                        <div className="text-muted-foreground flex items-center text-xs">
                          <Calendar className="mr-1 h-3.5 w-3.5 shrink-0" />
                          <span>
                            {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary/30 flex items-center justify-between border-t px-4 py-2">
                      <div className="text-xs">
                        <span className="text-primary font-medium">12개</span>의 모임
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:text-primary/80 h-auto p-0 text-xs hover:bg-transparent"
                      >
                        자세히
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="py-16 text-center">
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

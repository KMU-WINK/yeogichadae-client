import Link from 'next/link';

import { Button } from '@/component/ui/button';

import { Calendar, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="from-primary/10 to-background flex w-screen flex-col gap-8 bg-linear-to-b py-18 sm:py-32">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-4xl font-bold sm:text-5xl">
          서울의 문화행사,
          <br />
          함께할 친구를 찾아보세요
        </h1>

        <p className="text-center text-sm text-neutral-500 sm:text-base">
          서울시 문화행사 정보를 확인하고 <br className="block sm:hidden" />
          같은 관심사를 가진 사람들과 함께 즐겨보세요
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/event/calendar">
          <Button size="lg">
            <Calendar />
            <span>달력으로 보기</span>
          </Button>
        </Link>
        <Link href="/profile/meeting">
          <Button size="lg" variant="outline">
            <Users />
            <span>내 모임 관리</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}

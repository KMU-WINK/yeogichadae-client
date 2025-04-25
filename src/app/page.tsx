'use client';

import AllEvents from '@/app/_component/all-events';
import Hero from '@/app/_component/hero';
import HotEvent from '@/app/_component/hot-event';

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-8 sm:gap-16">
      <Hero />
      <HotEvent />
      <AllEvents />
    </div>
  );
}

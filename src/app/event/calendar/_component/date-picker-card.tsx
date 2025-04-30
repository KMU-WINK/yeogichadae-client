import { Dispatch, SetStateAction } from 'react';

import { Calendar } from '@/component/ui/calendar';

import { Event } from '@/api/schema/event';

import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DatePickerCardProps {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  events: Event[];
}

export function DatePickerCard({ date, setDate, events }: DatePickerCardProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border p-6">
      <h2 className="self-start font-medium sm:text-lg">
        날짜 선택 <span className="text-xs sm:text-sm">({events.length}개)</span>
      </h2>
      <Calendar
        mode="single"
        selected={parse(date, 'yyyy-MM-dd', new Date())}
        onSelect={(date) => date && setDate(format(date, 'yyyy-MM-dd'))}
        locale={ko}
      />
    </div>
  );
}

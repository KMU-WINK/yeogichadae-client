import { Dispatch, SetStateAction } from 'react';

import { Calendar } from '@/component/ui/calendar';

import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DatePickerCardProps {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
}

export function DatePickerCard({ date, setDate }: DatePickerCardProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border p-6">
      <h2 className="self-start font-medium sm:text-lg">날짜 선택</h2>
      <Calendar
        mode="single"
        selected={parse(date, 'yyyy-MM-dd', new Date())}
        onSelect={(date) => date && setDate(format(date, 'yyyy-MM-dd'))}
        locale={ko}
      />
    </div>
  );
}

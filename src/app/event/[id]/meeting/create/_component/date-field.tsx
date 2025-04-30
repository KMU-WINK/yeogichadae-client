import React from 'react';

import { Button } from '@/component/ui/button';
import { Calendar } from '@/component/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/component/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/component/ui/popover';
import { ScrollArea, ScrollBar } from '@/component/ui/scroll-area';

import { CreateMeetingRequest } from '@/api/dto/meeting';
import { Event } from '@/api/schema/event';

import { format, parse, startOfDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { UseFormReturn } from 'react-hook-form';

interface DateFieldProps {
  event: Event;
  form: UseFormReturn<CreateMeetingRequest>;
}

export default function DateField({ event, form }: DateFieldProps) {
  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>모임 일시</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant="outline" className="justify-start font-normal">
                  {format(
                    parse(field.value, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
                    'yyyy년 MM월 dd일 HH시 mm분',
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="sm:flex">
                <Calendar
                  mode="single"
                  selected={parse(field.value, "yyyy-MM-dd'T'HH:mm:ss", new Date())}
                  onSelect={(date) => {
                    if (!date) return;

                    const raw = parse(field.value, "yyyy-MM-dd'T'HH:mm:ss", new Date());
                    raw.setMonth(date.getMonth(), date.getDate());

                    field.onChange(format(raw, "yyyy-MM-dd'T'HH:mm:ss"));
                  }}
                  locale={ko}
                  disabled={(date) =>
                    startOfDay(date) < startOfDay(event.startDate) ||
                    startOfDay(date) > startOfDay(event.endDate)
                  }
                />
                <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex p-2 sm:flex-col">
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <Button
                          key={hour}
                          size="icon"
                          variant={
                            field.value &&
                            parse(field.value, "yyyy-MM-dd'T'HH:mm:ss", new Date()).getHours() ===
                              hour
                              ? 'default'
                              : 'ghost'
                          }
                          className="aspect-square shrink-0 sm:w-full"
                          onClick={() => {
                            const raw = parse(field.value, "yyyy-MM-dd'T'HH:mm:ss", new Date());
                            raw.setHours(hour);
                            field.onChange(format(raw, "yyyy-MM-dd'T'HH:mm:ss"));
                          }}
                        >
                          {hour.toString().padStart(2, '0')}
                        </Button>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>

                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex p-2 sm:flex-col">
                      {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                        <Button
                          key={minute}
                          size="icon"
                          variant={
                            field.value &&
                            parse(field.value, "yyyy-MM-dd'T'HH:mm:ss", new Date()).getMinutes() ===
                              minute
                              ? 'default'
                              : 'ghost'
                          }
                          className="aspect-square shrink-0 sm:w-full"
                          onClick={() => {
                            const raw = parse(field.value, "yyyy-MM-dd'T'HH:mm:ss", new Date());
                            raw.setMinutes(minute);
                            field.onChange(format(raw, "yyyy-MM-dd'T'HH:mm:ss"));
                          }}
                        >
                          {minute.toString().padStart(2, '0')}
                        </Button>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

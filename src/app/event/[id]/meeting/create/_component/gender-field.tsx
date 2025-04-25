import React, { useEffect, useState } from 'react';

import { Badge } from '@/component/ui/badge';
import { Switch } from '@/component/ui/switch';

import { CreateMeetingRequest } from '@/api/dto/meeting';
import { Gender } from '@/api/schema/user';

import { cn } from '@/lib/utils';

import { UseFormReturn } from 'react-hook-form';

interface GenderFieldProps {
  form: UseFormReturn<CreateMeetingRequest>;
}

export default function GenderField({ form }: GenderFieldProps) {
  const [open, setOpen] = useState(false);

  const gender = form.watch('gender');

  useEffect(() => {
    if (open) {
      form.setValue('gender', Gender.MALE);
    } else {
      form.setValue('gender', null);
    }
  }, [open]);

  return (
    <div className="bg-secondary flex flex-col gap-4 rounded-xl px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="font-medium">성별 필터</h3>
          <p className="text-xs text-neutral-500">특정 성별만 참여 가능하도록 설정</p>
        </div>
        <Switch checked={open} onCheckedChange={setOpen} />
      </div>

      {open && (
        <div className="flex flex-wrap gap-2">
          {Object.keys(Gender)
            .map((option) => option as Gender)
            .map((option) => (
              <Badge
                key={option}
                className={cn(
                  'cursor-pointer',
                  option === gender
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground border border-neutral-200',
                )}
                onClick={() => form.setValue('gender', option)}
              >
                {option === Gender.MALE ? '남성' : '여성'}
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
}

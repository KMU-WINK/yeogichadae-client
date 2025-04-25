import React, { useEffect, useState } from 'react';

import { Slider } from '@/component/ui/slider';
import { Switch } from '@/component/ui/switch';

import { CreateMeetingRequest } from '@/api/dto/meeting';

import { UseFormReturn } from 'react-hook-form';

interface AgeRangeFieldProps {
  form: UseFormReturn<CreateMeetingRequest>;
}

export default function AgeRangeField({ form }: AgeRangeFieldProps) {
  const [open, setOpen] = useState(false);

  const minAge = form.watch('minAge');
  const maxAge = form.watch('maxAge');

  useEffect(() => {
    if (open) {
      form.setValue('minAge', 15);
      form.setValue('maxAge', 70);
    } else {
      form.setValue('minAge', null);
      form.setValue('maxAge', null);
    }
  }, [open]);

  return (
    <div className="bg-secondary flex flex-col gap-4 rounded-xl px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="font-medium">연령대 필터</h3>
          <p className="text-xs text-neutral-500">특정 연령대만 참여 가능하도록 설정</p>
        </div>
        <Switch checked={open} onCheckedChange={setOpen} />
      </div>

      {open && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span>{minAge}세</span>
            <span>{maxAge}세</span>
          </div>
          <Slider
            value={[minAge!, maxAge!]}
            min={15}
            max={70}
            step={1}
            onValueChange={(value) => {
              if (value.length !== 2) return;
              form.setValue('minAge', value[0]);
              form.setValue('maxAge', value[1]);
            }}
          />
        </div>
      )}
    </div>
  );
}

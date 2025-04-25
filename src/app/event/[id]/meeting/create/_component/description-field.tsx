import React from 'react';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/component/ui/form';
import { Textarea } from '@/component/ui/textarea';

import { CreateMeetingRequest } from '@/api/dto/meeting';

import { UseFormReturn } from 'react-hook-form';

interface DescriptionFieldProps {
  form: UseFormReturn<CreateMeetingRequest>;
}

export default function DescriptionField({ form }: DescriptionFieldProps) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>모임 제목</FormLabel>
          <FormControl>
            <Textarea placeholder="모임 설명을 입력해주세요" className="resize-none" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

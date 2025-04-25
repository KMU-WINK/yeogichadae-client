import React from 'react';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/component/ui/form';
import { Input } from '@/component/ui/input';

import { CreateMeetingRequest } from '@/api/dto/meeting';

import { UseFormReturn } from 'react-hook-form';

interface TitleFieldProps {
  form: UseFormReturn<CreateMeetingRequest>;
}

export default function TitleField({ form }: TitleFieldProps) {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>모임 제목</FormLabel>
          <FormControl>
            <Input placeholder="모임 제목을 입력해주세요" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

import React from 'react';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/component/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/component/ui/select';

import { CreateMeetingRequest } from '@/api/dto/meeting';

import { UseFormReturn } from 'react-hook-form';

interface MaxPeopleFieldProps {
  form: UseFormReturn<CreateMeetingRequest>;
}

export default function MaxPeopleField({ form }: MaxPeopleFieldProps) {
  return (
    <FormField
      control={form.control}
      name="maxPeople"
      render={({ field }) => (
        <FormItem>
          <FormLabel>최대 인원</FormLabel>
          <Select value={field.value.toString()} onValueChange={(value) => field.onChange(+value)}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Array.from({ length: 9 }, (_, idx) => idx + 2).map((people) => (
                <SelectItem key={people} value={people.toString()}>
                  {people}명
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

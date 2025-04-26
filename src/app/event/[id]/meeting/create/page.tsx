'use client';

import React, { use, useCallback, useEffect, useState } from 'react';

import { RedirectType, redirect } from 'next/navigation';

import AgeRangeField from '@/app/event/[id]/meeting/create/_component/age-range-field';
import DateField from '@/app/event/[id]/meeting/create/_component/date-field';
import DescriptionField from '@/app/event/[id]/meeting/create/_component/description-field';
import GenderField from '@/app/event/[id]/meeting/create/_component/gender-field';
import MaxPeopleField from '@/app/event/[id]/meeting/create/_component/max-people-field';
import TitleField from '@/app/event/[id]/meeting/create/_component/title-field';

import TitleLayout from '@/component/layout/title';

import { Button } from '@/component/ui/button';
import { Form } from '@/component/ui/form';

import Api from '@/api';
import { CreateMeetingRequest, CreateMeetingRequestSchema } from '@/api/dto/meeting';
import { Event } from '@/api/schema/event';

import { useApi, useApiWithToast } from '@/hook/use-api';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page(props: Props) {
  const { id: eventId } = use(props.params);

  const [isApiProcessing, startApi] = useApi();
  const [isApiProcessing2, startApi2] = useApiWithToast();

  const [event, setEvent] = useState<Event>();

  const form = useForm<CreateMeetingRequest>({
    resolver: zodResolver(CreateMeetingRequestSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd') + 'T12:00:00',
      maxPeople: 2,
      minAge: null,
      maxAge: null,
      gender: null,
    },
  });

  const onSubmit = useCallback(
    (values: CreateMeetingRequest) => {
      if (!event) return;

      startApi2(
        async () => {
          const { meeting } = await Api.Domain.Meeting.createMeeting(event.id, values);
          setTimeout(() => redirect(`/meeting/${meeting.id}`, RedirectType.push));
        },
        {
          loading: '모임을 생성하고 있습니다.',
          success: '모임을 생성했습니다.',
        },
      );
    },
    [event],
  );

  useEffect(() => {
    startApi(async () => {
      const { event } = await Api.Domain.Event.getEvent(eventId);
      setEvent(event);
    });
  }, [eventId]);

  useEffect(() => {
    if (!event) return;
    form.setValue('date', event.startDate + 'T12:00:00');
  }, [event]);

  return (
    <TitleLayout title="모임 만들기" loading={isApiProcessing || !event} className="max-w-xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded-2xl border p-6"
        >
          <TitleField form={form} />
          <DescriptionField form={form} />
          <DateField form={form} />
          <MaxPeopleField form={form} />
          <AgeRangeField form={form} />
          <GenderField form={form} />

          <Button type="submit" disabled={isApiProcessing2} className="self-end">
            모임 만들기
          </Button>
        </form>
      </Form>
    </TitleLayout>
  );
}

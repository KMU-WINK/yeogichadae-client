'use client';

import { use, useEffect } from 'react';

import { redirect, useSearchParams } from 'next/navigation';

import Api from '@/api';

import { useApiWithToast } from '@/hook/use-api';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page(props: Props) {
  const { id: meetingId } = use(props.params);

  const searchParams = useSearchParams();

  const [, startApi] = useApiWithToast();

  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');

  useEffect(() => {
    if (!meetingId || !orderId || !paymentKey || !amount) return;

    startApi(
      async () => {
        await Api.Domain.Meeting.joinMeeting(meetingId, orderId, paymentKey, +amount);
      },
      {
        loading: '결제 진행 중',
        success: '결제 완료',
        finally: () => redirect(`/meeting/${meetingId}`),
      },
    );
  }, [meetingId, orderId, paymentKey, amount]);
}

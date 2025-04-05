'use client';

import { use, useEffect } from 'react';

import { useRouter } from 'next/navigation';

export default function ChatRedirectPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();

  useEffect(() => {
    router.replace(`/chats/${params.id}`);
  }, [router, params.id]);

  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
    </div>
  );
}

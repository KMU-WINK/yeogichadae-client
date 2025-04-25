import Link from 'next/link';

import { Button } from '@/component/ui/button';

import { LogIn } from 'lucide-react';

export default function LoginButton() {
  return (
    <Link href="/login">
      <Button className="w-full sm:w-fit">
        <LogIn />
        로그인
      </Button>
    </Link>
  );
}

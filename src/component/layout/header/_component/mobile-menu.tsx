import { useState } from 'react';

import Link from 'next/link';

import LoginButton from '@/component/layout/header/_component/login-button';

import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar';
import { Button } from '@/component/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/component/ui/sheet';

import { menuItems } from '@/constant/menu-item';

import Api from '@/api';

import { useUserStore } from '@/store/user.store';

import { Menu } from 'lucide-react';

export default function MobileMenu() {
  const { user } = useUserStore();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger asChild className="sm:hidden">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] pt-12">
        <nav className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div>
              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-4"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Avatar className="size-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-medium">{user.nickname}</div>
                </Link>
              ) : (
                <div onClick={() => setIsMobileOpen(false)}>
                  <LoginButton />
                </div>
              )}
            </div>

            {menuItems
              .filter((menuItem) => (menuItem.onlyUser === false ? true : user))
              .map((menuItem) => (
                <Link
                  key={menuItem.link}
                  href={menuItem.link}
                  className="hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {menuItem.name}
                </Link>
              ))}
          </div>

          {user && (
            <Button
              variant="outline"
              className="text-destructive"
              onClick={() => {
                setIsMobileOpen(false);
                Api.Request.removeToken();
              }}
            >
              로그아웃
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

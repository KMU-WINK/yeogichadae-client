'use client';

import Link from 'next/link';

import ChatIcon from '@/component/layout/header/_component/chat-icon';
import LoginButton from '@/component/layout/header/_component/login-button';
import MobileMenu from '@/component/layout/header/_component/mobile-menu';
import NotificationIcon from '@/component/layout/header/_component/notification-icon';
import UserDropdown from '@/component/layout/header/_component/user-dropdown';

import { menuItems } from '@/constant/menu-item';

import { useUserStore } from '@/store/user.store';

import useScroll from '@/hook/use-scroll';

import { cn } from '@/lib/utils';

export default function Header() {
  const isScrolled = useScroll();

  const { user } = useUserStore();

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 px-4 transition-all sm:px-8',
        isScrolled
          ? 'bg-background/80 border-b shadow-xs backdrop-blur-md'
          : 'bg-background/60 backdrop-blur-xs',
      )}
    >
      <div className="flex h-14 items-center justify-between sm:h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-primary text-xl font-bold">
            Seoul IN Culture
          </Link>

          <nav className="hidden space-x-6 sm:flex">
            {menuItems
              .filter((menuItem) => (menuItem.onlyUser !== true ? true : user))
              .map((menuItem) => (
                <Link
                  key={menuItem.link}
                  href={menuItem.link}
                  className="hover:text-primary font-medium text-black transition-colors"
                >
                  {menuItem.name}
                </Link>
              ))}
          </nav>
        </div>

        <div className="flex gap-4">
          {user && (
            <div className="flex gap-2">
              <ChatIcon />
              <NotificationIcon />
            </div>
          )}

          <div className="hidden items-center gap-4 sm:flex">
            {user ? <UserDropdown /> : <LoginButton />}
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

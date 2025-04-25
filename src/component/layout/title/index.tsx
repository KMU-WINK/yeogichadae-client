import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface TitleLayoutProps {
  title: string;
  button?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function TitleLayout({ title, button, children, className }: TitleLayoutProps) {
  return (
    <div
      className={cn(
        'container mx-auto flex max-w-screen-xl flex-col gap-4 pt-4 sm:pt-8',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <div className="flex items-center gap-2">{button}</div>
      </div>
      {children}
    </div>
  );
}

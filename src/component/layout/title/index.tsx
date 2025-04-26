import { ReactNode } from 'react';

import { Spinner } from '@/app/loading';

import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';

interface TitleLayoutProps {
  title: string;
  loading: boolean;
  button?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function TitleLayout({
  title,
  loading,
  button,
  children,
  className,
}: TitleLayoutProps) {
  return (
    <div
      className={cn(
        'container mx-auto flex max-w-screen-xl flex-col gap-4 pt-4 sm:pt-8',
        className,
      )}
    >
      <div className="flex min-h-11 items-center justify-between">
        <motion.h2
          className="text-2xl font-bold sm:text-3xl"
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h2>
        {!loading && (
          <motion.div
            className="flex items-center gap-2"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            {button}
          </motion.div>
        )}
      </div>

      {loading ? (
        <div className="flex h-[calc(100dvh-56px-56px-32px)] items-center justify-center pb-32 sm:h-[calc(100dvh-64px-64px-56px)]">
          <Spinner />
        </div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{ opacity: 1, y: 0 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

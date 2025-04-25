import React, { Dispatch, SetStateAction, useState } from 'react';

import { Badge } from '@/component/ui/badge';
import { Button } from '@/component/ui/button';
import { Label } from '@/component/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/component/ui/popover';
import { Slider } from '@/component/ui/slider';

import { Gender } from '@/api/schema/user';

import { cn } from '@/lib/utils';

import { Filter } from 'lucide-react';

interface FilterPopoverProps {
  minAge: number;
  maxAge: number;
  gender?: Gender;
  setMinAge: Dispatch<SetStateAction<number>>;
  setMaxAge: Dispatch<SetStateAction<number>>;
  setGender: Dispatch<SetStateAction<Gender | undefined>>;
  applyFilter: () => void;
}

export default function FilterPopover({
  minAge,
  maxAge,
  gender,
  setMinAge,
  setMaxAge,
  setGender,
  applyFilter,
}: FilterPopoverProps) {
  const [isFilterOpen, setFilterOpen] = useState(false);

  return (
    <Popover open={isFilterOpen} onOpenChange={setFilterOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter />
          필터
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4">
        <section>
          <Label>나이</Label>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span>{minAge}세</span>
              <span>{maxAge}세</span>
            </div>
            <Slider
              value={[minAge, maxAge]}
              min={15}
              max={70}
              step={1}
              onValueChange={(value) => {
                setMinAge(value[0]);
                setMaxAge(value[1]);
              }}
            />
          </div>
        </section>

        <section>
          <Label>성별</Label>
          <div className="flex gap-2">
            {Object.keys(Gender)
              .map((option) => option as Gender)
              .map((option) => (
                <Badge
                  key={option}
                  className={cn(
                    'cursor-pointer',
                    option === gender
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground border border-neutral-200',
                  )}
                  onClick={() => setGender((prev) => (prev === option ? undefined : option))}
                >
                  {option === Gender.MALE ? '남성' : '여성'}
                </Badge>
              ))}
          </div>
        </section>

        <Button
          onClick={() => {
            applyFilter();
            setFilterOpen(false);
          }}
        >
          필터 적용
        </Button>
      </PopoverContent>
    </Popover>
  );
}

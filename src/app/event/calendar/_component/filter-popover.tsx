import React, { Dispatch, SetStateAction, useState } from 'react';

import { Badge } from '@/component/ui/badge';
import { Button } from '@/component/ui/button';
import { Label } from '@/component/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/component/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/component/ui/select';

import { Category } from '@/api/schema/event';
import { District } from '@/api/schema/user';

import { cn } from '@/lib/utils';

import { Filter, X } from 'lucide-react';

interface FilterPopoverProps {
  categories?: Category[];
  districts?: District[];
  isFree?: boolean;
  setCategories: Dispatch<SetStateAction<Category[] | undefined>>;
  setDistricts: Dispatch<SetStateAction<District[] | undefined>>;
  setIsFree: Dispatch<SetStateAction<boolean | undefined>>;
  applyFilter: () => void;
}

export default function FilterPopover({
  categories,
  districts,
  isFree,
  setCategories,
  setDistricts,
  setIsFree,
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
      <PopoverContent className="flex w-[300px] flex-col gap-4 sm:w-[500px]">
        <section>
          <Label>분류</Label>
          <div className="flex flex-wrap gap-2">
            <Badge
              className={cn(
                'p cursor-pointer py-1 text-xs',
                categories === undefined
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground',
              )}
              onClick={() => setCategories(undefined)}
            >
              전체
            </Badge>
            {Object.keys(Category)
              .map((category) => category as Category)
              .map((category) => (
                <Badge
                  key={category}
                  className={cn(
                    'cursor-pointer py-1 text-xs',
                    categories?.includes(category)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground',
                  )}
                  onClick={() =>
                    setCategories((prev) =>
                      prev
                        ? prev.includes(category)
                          ? prev.length === 1
                            ? undefined
                            : prev.filter((c) => c !== category)
                          : [...prev, category]
                        : [category],
                    )
                  }
                >
                  {category}
                </Badge>
              ))}
          </div>
        </section>

        <section>
          <Label>지역</Label>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {districts?.map((district) => (
                <Badge
                  key={district}
                  className="bg-primary text-primary-foreground flex gap-1 py-1 text-xs"
                >
                  {district}
                  <X
                    className="size-3 cursor-pointer"
                    onClick={() => setDistricts((prev) => prev!.filter((d) => d !== district))}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select
                onValueChange={(value) =>
                  setDistricts((prev) => {
                        const district = value as District;

                        if (!prev) return [district];
                        if (prev.includes(district)) return prev;

                        return [...prev, district];
                      })
                }
              >
                <SelectTrigger className="w-full rounded-xl">지역 선택</SelectTrigger>
                <SelectContent>
                  {Object.keys(District)
                    .map((district) => district as District)
                    .map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section>
          <Label>비용</Label>
          <div className="flex flex-wrap gap-2">
            <Badge
              className={cn(
                'cursor-pointer py-1 text-xs',
                isFree === undefined
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground',
              )}
              onClick={() => setIsFree(undefined)}
            >
              전체
            </Badge>
            <Badge
              className={cn(
                'cursor-pointer py-1 text-xs',
                isFree === true
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground',
              )}
              onClick={() => setIsFree(true)}
            >
              무료
            </Badge>
            <Badge
              className={cn(
                'cursor-pointer py-1 text-xs',
                isFree === false
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground',
              )}
              onClick={() => setIsFree(false)}
            >
              유료
            </Badge>
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

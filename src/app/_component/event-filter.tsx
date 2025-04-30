import { Dispatch, SetStateAction, useEffect, useState, useTransition } from 'react';

import { Badge } from '@/component/ui/badge';
import { Label } from '@/component/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/component/ui/select';

import { Category } from '@/api/schema/event';
import { District } from '@/api/schema/user';

import { cn } from '@/lib/utils';

import { X } from 'lucide-react';

interface EventFilterProps {
  searchQuery: string | undefined;
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>;
  categories?: Category[];
  setCategories: Dispatch<SetStateAction<Category[] | undefined>>;
  districts?: District[];
  setDistricts: Dispatch<SetStateAction<District[] | undefined>>;
  isFree?: boolean;
  setIsFree: Dispatch<SetStateAction<boolean | undefined>>;
}

export default function EventFilter({
  searchQuery,
  setSearchQuery,
  categories,
  setCategories,
  districts,
  setDistricts,
  isFree,
  setIsFree,
}: EventFilterProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery ?? '');
  const [, startTransition] = useTransition();

  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        setSearchQuery(localSearch);
      });
    }, 50);

    return () => clearTimeout(handler);
  }, [localSearch, setSearchQuery, startTransition]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border p-6">
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">검색</Label>
        <input
          type="text"
          placeholder="행사 제목, 주최자, 장소 검색"
          className="focus:ring-primary w-full rounded-xl border px-4 py-2 text-sm focus:ring-2 focus:outline-none"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">분류</Label>
        <div className="flex flex-wrap gap-2">
          <Badge
            className={cn(
              'cursor-pointer px-3 py-1.5 text-xs sm:text-sm',
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
                  'cursor-pointer px-3 py-1.5 text-xs sm:text-sm',
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
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">지역</Label>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {districts?.map((district) => (
              <Badge
                key={district}
                className="bg-primary text-primary-foreground flex gap-1 px-3 py-1.5 text-xs sm:text-sm"
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
                setDistricts((prev) => (prev ? [...prev, value as District] : [value as District]))
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
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium">비용</Label>
        <div className="flex flex-wrap gap-2">
          <Badge
            className={cn(
              'cursor-pointer px-3 py-1.5 text-xs sm:text-sm',
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
              'cursor-pointer px-3 py-1.5 text-xs sm:text-sm',
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
              'cursor-pointer px-3 py-1.5 text-xs sm:text-sm',
              isFree === false
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground',
            )}
            onClick={() => setIsFree(false)}
          >
            유료
          </Badge>
        </div>
      </div>
    </div>
  );
}

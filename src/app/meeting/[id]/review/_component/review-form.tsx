import { Dispatch, SetStateAction, useCallback, useEffect, useMemo } from 'react';

import { Button } from '@/component/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/component/ui/form';
import { Textarea } from '@/component/ui/textarea';

import Api from '@/api';
import { CreateReviewRequest, CreateReviewRequestSchema } from '@/api/dto/review';
import { Meeting } from '@/api/schema/meeting';
import { Review } from '@/api/schema/review';
import { User } from '@/api/schema/user';

import { useApiWithToast } from '@/hook/use-api';

import { cn } from '@/lib/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ReviewFormProps {
  meeting: Meeting;
  reviews: Review[];
  setReviews: Dispatch<SetStateAction<Review[]>>;
  user: User;
}

export default function ReviewForm({ meeting, reviews, setReviews, user }: ReviewFormProps) {
  const [isApiProcessing, startApi] = useApiWithToast();

  const review = useMemo(
    () => reviews.find((review) => review.target.id === user.id),
    [user, reviews],
  );

  const form = useForm<CreateReviewRequest>({
    resolver: zodResolver(CreateReviewRequestSchema),
    defaultValues: {
      score: 0,
      content: null,
    },
  });

  const onSubmit = useCallback(
    (values: CreateReviewRequest) => {
      if (!meeting) return;

      startApi(
        async () => {
          const { review } = await Api.Domain.Review.createReview(meeting.id, user.id, values);
          setReviews((prev) => [...prev, review]);
        },
        {
          loading: `${user.nickname}님의 후기를 제출하고 있습니다.`,
          success: `${user.nickname}님의 후기를 제출했습니다.`,
        },
      );
    },
    [meeting, user],
  );

  useEffect(() => {
    const review = reviews.find((review) => review.target.id === user?.id);

    if (review) {
      form.setValue('score', review.score);
      form.setValue('content', review.content);
    } else {
      form.reset();
    }
  }, [user, reviews]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <h4 className="font-medium">{user.nickname}님에 대한 후기</h4>

        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      className={review ? '' : 'cursor-pointer'}
                      onClick={() => {
                        if (review) return;
                        field.onChange(score);
                      }}
                    >
                      <Star
                        className={cn(
                          'size-7',
                          score <= field.value ? 'fill-primary text-primary' : 'text-neutral-500',
                        )}
                      />
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="후기를 작성해주세요."
                  readOnly={!!review}
                  className="resize-none"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!review && (
          <Button type="submit" disabled={isApiProcessing} className="self-end">
            제출하기
          </Button>
        )}
      </form>
    </Form>
  );
}

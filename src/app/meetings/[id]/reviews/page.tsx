'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

import { Star } from 'lucide-react';

// 모임 데이터 (실제로는 API에서 가져올 것)
const meetingData = {
  id: 3,
  title: '마라톤 완주 도전',
  eventTitle: '서울 마라톤',
  meetingTime: '2023-04-16 08:00',
  members: [
    {
      id: 2,
      nickname: '러닝맨',
      avatar: '/placeholder.svg?height=40&width=40',
      isHost: true,
      isReviewed: false,
    },
    {
      id: 3,
      nickname: '마라토너',
      avatar: '/placeholder.svg?height=40&width=40',
      isHost: false,
      isReviewed: true,
    },
    {
      id: 4,
      nickname: '건강달리기',
      avatar: '/placeholder.svg?height=40&width=40',
      isHost: false,
      isReviewed: false,
    },
    {
      id: 5,
      nickname: '서울러너',
      avatar: '/placeholder.svg?height=40&width=40',
      isHost: false,
      isReviewed: false,
    },
  ],
};

export default function ReviewsPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<{
    content: string;
    rating: number;
    reviewerId: number;
    reviewerName: string;
    date: string;
  } | null>(null);

  const handleSubmit = () => {
    if (!selectedMember || rating === 0 || comment.trim() === '') return;

    setIsSubmitting(true);

    // 실제로는 API 호출하여 리뷰 저장
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedMember(null);
      setRating(0);
      setComment('');

      // 성공 메시지 표시
      alert('리뷰가 성공적으로 등록되었습니다.');
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">모임 후기 작성</h1>
        <p className="text-muted-foreground mt-1">
          {meetingData.eventTitle} - {meetingData.title}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>참여자 평가</CardTitle>
          <CardDescription>함께 모임에 참여한 멤버들에 대한 후기를 작성해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {meetingData.members.map((member) => (
                <Card
                  key={member.id}
                  className={`cursor-pointer transition-all ${
                    selectedMember === member.id
                      ? 'ring-primary ring-2'
                      : member.isReviewed
                        ? 'opacity-50'
                        : ''
                  }`}
                  onClick={() => {
                    if (member.isReviewed) {
                      // 이미 리뷰가 작성된 멤버인 경우 리뷰 내용 표시
                      const review = {
                        reviewerId: 1, // 현재 로그인한 사용자 ID
                        reviewerName: '문화매니아', // 현재 로그인한 사용자 닉네임
                        rating: 5,
                        content: '정말 즐거운 시간이었습니다. 다음에도 함께하고 싶어요!',
                        date: '2023-04-20',
                      };
                      setSelectedReview(review);
                    } else if (!member.isReviewed) {
                      setSelectedMember(member.id);
                      setRating(0);
                      setComment('');
                      setSelectedReview(null);
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.nickname} />
                        <AvatarFallback>{member.nickname.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{member.nickname}</span>
                          {member.isHost && (
                            <span className="bg-muted rounded-full px-2 py-0.5 text-xs">
                              주최자
                            </span>
                          )}
                        </div>
                        {member.isReviewed ? (
                          <span className="text-muted-foreground text-xs">
                            이미 평가를 완료했습니다
                          </span>
                        ) : (
                          <span className="text-primary text-xs">평가 가능</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedMember && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">
                  {meetingData.members.find((m) => m.id === selectedMember)?.nickname}님에 대한 평가
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-hidden"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            rating >= star ? 'fill-primary text-primary' : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="text-center text-sm">
                    {rating === 1 && '별로예요'}
                    {rating === 2 && '아쉬워요'}
                    {rating === 3 && '보통이에요'}
                    {rating === 4 && '좋았어요'}
                    {rating === 5 && '최고예요'}
                  </div>
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="후기를 작성해주세요"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedMember(null)}>
                    취소
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={rating === 0 || comment.trim() === '' || isSubmitting}
                  >
                    {isSubmitting ? '제출 중...' : '평가 제출'}
                  </Button>
                </div>
              </div>
            )}

            {selectedReview && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">내가 작성한 후기</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 ${
                          selectedReview.rating >= star
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-center text-sm">{selectedReview.date}</div>
                </div>

                <div className="bg-secondary/30 rounded-xl p-4">
                  <p>{selectedReview.content}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/my-meetings`}>
            <Button variant="outline">내 모임 목록으로</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

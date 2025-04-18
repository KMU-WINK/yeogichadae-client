'use client';

import { use, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar';
import { Badge } from '@/component/ui/badge';
import { Button } from '@/component/ui/button';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Star, User } from 'lucide-react';

// interface UserDataType {
//   id: number;
//   nickname: string;
//   avatar: string;
//   district: string;
//   gender: string;
//   age: number;
//   mannerScore: number;
//   createdAt: string;
//   bookmarkedEvents: number;
//   participatedMeetings: number;
//   hostedMeetings: number;
//   reviews: {
//     id: number;
//     reviewerName: string;
//     reviewerAvatar: string;
//     rating: number;
//     content: string;
//     date: string;
//   }[];
// }

// 모임 정보 포함한 데이터 테스트용
interface UserDataType {
  id: number;
  nickname: string;
  avatar: string;
  district: string;
  gender: string;
  age: number;
  mannerScore: number;
  createdAt: string;
  bookmarkedEvents: number;

  meetings: {
    hosted: { id: number; title: string; date: string; image: string; status: string }[];
    participated: { id: number; title: string; date: string; image: string; status: string }[];
  };

  reviews: {
    id: number;
    reviewerName: string;
    reviewerAvatar: string;
    rating: number;
    content: string;
    date: string;
  }[];
}

// 사용자 프로필 데이터 (실제로는 API에서 가져올 것)
// const usersData = {
//   '2': {
//     id: 2,
//     nickname: '재즈매니아',
//     avatar: '/placeholder.svg?height=128&width=128',
//     district: '서초구',
//     gender: 'male',
//     age: 32,
//     mannerScore: 4.8,
//     createdAt: '2022-03-10',
//     bookmarkedEvents: 8,
//     participatedMeetings: 15,
//     hostedMeetings: 2,
//     reviews: [
//       {
//         id: 1,
//         reviewerName: '음악사랑',
//         reviewerAvatar: '/placeholder.svg?height=40&width=40',
//         rating: 5,
//         content:
//           '모임을 재미있게 이끌어주시고 정보도 많이 공유해주셔서 즐거웠습니다. 다음에도 같이 모임하고 싶어요!',
//         date: '2023-05-30',
//       },
//       {
//         id: 2,
//         reviewerName: '한강러버',
//         reviewerAvatar: '/placeholder.svg?height=40&width=40',
//         rating: 4,
//         content: '친절하고 매너가 좋았습니다. 재즈에 대한 지식이 풍부해서 많이 배웠어요.',
//         date: '2023-04-20',
//       },
//     ],
//   },
//   '3': {
//     id: 3,
//     nickname: '음악사랑',
//     avatar: '/placeholder.svg?height=128&width=128',
//     district: '마포구',
//     gender: 'female',
//     age: 27,
//     mannerScore: 4.5,
//     createdAt: '2022-06-20',
//     bookmarkedEvents: 5,
//     participatedMeetings: 10,
//     hostedMeetings: 3,
//     reviews: [
//       {
//         id: 1,
//         reviewerName: '재즈매니아',
//         reviewerAvatar: '/placeholder.svg?height=40&width=40',
//         rating: 5,
//         content: '시간 약속을 잘 지키고 모임 분위기를 즐겁게 만들어주셨어요.',
//         date: '2023-05-15',
//       },
//     ],
//   },
// };

//테스트용 사용자 프로필 데이터
const usersData = {
  '4': {
    //주최 모임, 참가 모임 다 2 초과
    id: 4,
    nickname: '예술애호가',
    avatar: '/placeholder.svg?height=128&width=128',
    district: '성동구',
    gender: 'female',
    age: 29,
    mannerScore: 4.9,
    createdAt: '2023-01-15',
    bookmarkedEvents: 6,
    meetings: {
      hosted: [
        {
          id: 101,
          title: '한강에서 그림 그리기 모임',
          date: '2024-09-15 10:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
        {
          id: 102,
          title: '성수동 갤러리 투어',
          date: '2024-10-02 14:30',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집완료',
        },
        {
          id: 103,
          title: '가을 감성 사진 산책',
          date: '2024-10-20 16:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
      ],
      participated: [
        {
          id: 201,
          title: '플리마켓 체험 모임',
          date: '2024-08-30 13:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집완료',
        },
        {
          id: 202,
          title: '전시회 후기 공유 세션',
          date: '2024-09-10 19:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
        {
          id: 203,
          title: '뮤지컬 함께 보기',
          date: '2024-09-25 18:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
        {
          id: 204,
          title: '낙서 드로잉 클래스',
          date: '2024-10-05 11:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집완료',
        },
      ],
    },
    reviews: [
      {
        id: 1,
        reviewerName: '문화러버',
        reviewerAvatar: '/placeholder.svg?height=40&width=40',
        rating: 5,
        content: '모임을 너무 따뜻하게 잘 이끌어주셔서 힐링되는 시간이었어요.',
        date: '2024-09-16',
      },
      {
        id: 2,
        reviewerName: '도시여행자',
        reviewerAvatar: '/placeholder.svg?height=40&width=40',
        rating: 4,
        content: '전시회 설명도 잘해주시고 질문에 성실히 답해주셔서 좋았어요!',
        date: '2024-10-03',
      },
    ],
  },

  '5': {
    // 2개 2개 씩
    id: 5,
    nickname: '역사연구자',
    avatar: '/placeholder.svg?height=128&width=128',
    district: '종로구',
    gender: 'male',
    age: 41,
    mannerScore: 4.2,
    createdAt: '2022-11-05',
    bookmarkedEvents: 2,
    meetings: {
      hosted: [
        {
          id: 401,
          title: '한양도성 걷기 모임',
          date: '2024-07-10 09:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집완료',
        },
        {
          id: 402,
          title: '고지도 해설 세미나',
          date: '2024-09-03 13:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
      ],
      participated: [
        {
          id: 403,
          title: '독립운동 유적지 투어',
          date: '2024-08-15 14:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집완료',
        },
        {
          id: 404,
          title: '역사토론 모임',
          date: '2024-08-25 19:30',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
      ],
    },
    reviews: [
      {
        id: 1,
        reviewerName: '문화해설가',
        reviewerAvatar: '/placeholder.svg?height=40&width=40',
        rating: 5,
        content: '모임이 알차고 유익했습니다. 감사합니다!',
        date: '2024-07-12',
      },
    ],
  },
  '6': {
    //모두 0개
    id: 6,
    nickname: '신입회원',
    avatar: '/placeholder.svg?height=128&width=128',
    district: '강남구',
    gender: 'female',
    age: 23,
    mannerScore: 5.0,
    createdAt: '2024-03-01',
    bookmarkedEvents: 0,
    meetings: {
      hosted: [],
      participated: [],
    },
    reviews: [],
  },
  '7': {
    id: 7, // 1개 0개 사실 말은 안됨
    nickname: '공간기획자',
    avatar: '/placeholder.svg?height=128&width=128',
    district: '송파구',
    gender: 'female',
    age: 30,
    mannerScore: 4.7,
    createdAt: '2023-06-30',
    bookmarkedEvents: 4,
    meetings: {
      hosted: [
        {
          id: 501,
          title: '소셜살롱 공간 소개 모임',
          date: '2024-09-12 15:00',
          image: '/placeholder.svg?height=120&width=240',
          status: '모집중',
        },
      ],
      participated: [],
    },
    reviews: [
      {
        id: 1,
        reviewerName: '살롱참여자',
        reviewerAvatar: '/placeholder.svg?height=40&width=40',
        rating: 5,
        content: '편안한 분위기 속에서 유익한 시간을 보낼 수 있었어요!',
        date: '2024-09-13',
      },
    ],
  },
};

export default function UserProfilePage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [userData, setUserData] = useState<UserDataType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제로는 API 호출하여 사용자 데이터 가져오기
    setTimeout(() => {
      const user = usersData[params.id as keyof typeof usersData];
      setUserData(user);
      setLoading(false);
    }, 500);
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:px-8">
        <div className="flex h-[60vh] items-center justify-center">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:px-8">
        <div className="py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold">사용자를 찾을 수 없습니다</h1>
          <p className="text-muted-foreground mb-8">요청하신 사용자 프로필이 존재하지 않습니다.</p>
          <Link href="/">
            <Button className="rounded-xl">메인으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:px-8">
      <motion.div
        className="mb-4 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold sm:text-3xl">{userData.nickname}님의 프로필</h1>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="sinc-card p-6 text-center">
            <div className="mb-4 flex justify-center">
              <Avatar className="border-primary/10 h-32 w-32 border-4">
                <AvatarImage src={userData.avatar} alt={userData.nickname} />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                  {userData.nickname.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="mb-1 text-2xl font-bold">{userData.nickname}</h2>
            <p className="text-muted-foreground mb-4 text-sm">가입일: {userData.createdAt}</p>

            <div className="mb-6 flex justify-center">
              <div className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1.5">
                <Star className="fill-primary h-4 w-4" />
                <span className="font-medium">{userData.mannerScore}</span>
              </div>
            </div>

            <div className="mb-6 flex items-start justify-around text-left sm:flex-col">
              <div className="hover:bg-secondary/50 flex items-center gap-2 rounded-lg p-2 transition-colors">
                <MapPin className="text-primary h-5 w-5" />
                <span>{userData.district}</span>
              </div>
              <div className="hover:bg-secondary/50 flex items-center gap-2 rounded-lg p-2 transition-colors">
                <User className="text-primary h-5 w-5" />
                <span>
                  {userData.gender === 'male' ? '남성' : '여성'}, {userData.age}세
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t pt-4">
              <div className="hover:bg-secondary/50 rounded-xl p-3 text-center transition-colors">
                <div className="text-primary text-2xl font-bold">{userData.bookmarkedEvents}</div>
                <div className="text-muted-foreground text-xs">찜한 행사</div>
              </div>
              <div className="hover:bg-secondary/50 rounded-xl p-3 text-center transition-colors">
                <div className="text-primary text-2xl font-bold">
                  {userData.meetings.participated.length}
                </div>
                <div className="text-muted-foreground text-xs">참여 모임</div>
              </div>
              <div className="hover:bg-secondary/50 rounded-xl p-3 text-center transition-colors">
                <div className="text-primary text-2xl font-bold">
                  {userData.meetings.hosted.length}
                </div>
                <div className="text-muted-foreground text-xs">주최 모임</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-6 md:col-span-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="sinc-card p-6">
              <h2 className="mb-4 text-xl font-medium">받은 후기</h2>
              <div className="space-y-4">
                {userData.reviews.map((review) => (
                  <div key={review.id} className="bg-secondary/30 rounded-xl p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <Link href="/profile/2" className="flex items-center gap-2">
                        <Avatar className="border-primary/10 h-10 w-10 border-2">
                          <AvatarImage src={review.reviewerAvatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {review.reviewerName.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="line-clamp-1 font-medium">{review.reviewerName}</div>
                          <div className="text-muted-foreground text-xs">{review.date}</div>
                        </div>
                      </Link>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-neutral-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="line-clamp-3 text-sm">{review.content}</p>
                  </div>
                ))}

                {userData.reviews.length === 0 && (
                  <div className="text-muted-foreground py-8 text-center">
                    <p>아직 받은 후기가 없습니다</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="sinc-card p-6">
              <h2 className="mb-4 text-xl font-medium">주최한 모임</h2>
              {userData.meetings.hosted.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {userData.meetings.hosted.slice(0, 2).map((meeting) => (
                    <Link
                      key={meeting.id}
                      href={`/meetings/${meeting.id}`}
                      className="group overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={meeting.image}
                          alt={meeting.title}
                          fill
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <Badge className="sinc-badge absolute top-2 right-2 bg-emerald-100 text-emerald-700">
                          {meeting.status}
                        </Badge>
                      </div>
                      <div className="p-3">
                        <h3 className="group-hover:text-primary line-clamp-1 font-medium transition-colors">
                          {meeting.title}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-xs">{meeting.date}</p>
                      </div>
                    </Link>
                  ))}

                  {/*2개 이상인 경우부터 더보기 버튼 생성*/}
                  {userData.meetings.hosted.length > 2 && (
                    <Link href={`/profile/${userData.id}/meetings/hosted`} className="col-span-2">
                      <Button
                        variant="outline"
                        className="flex w-full items-center justify-center rounded-xl"
                      >
                        <span>주최한 모임 더보기</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  <p>아직 주최한 모임이 없습니다</p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="sinc-card p-6">
              <h2 className="mb-4 text-xl font-medium">참여 중인 모임</h2>
              {userData.meetings.participated.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {userData.meetings.participated.slice(0, 2).map((meeting) => (
                    <Link
                      key={meeting.id}
                      href={`/meetings/${meeting.id}`}
                      className="group overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={meeting.image}
                          alt={meeting.title}
                          fill
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <Badge className="sinc-badge absolute top-2 right-2 bg-emerald-100 text-emerald-700">
                          {meeting.status}
                        </Badge>
                      </div>
                      <div className="p-3">
                        <h3 className="group-hover:text-primary line-clamp-1 font-medium transition-colors">
                          {meeting.title}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-xs">{meeting.date}</p>
                      </div>
                    </Link>
                  ))}

                  {/*2개 이상인 경우부터 더보기 버튼 생성*/}
                  {userData.meetings.participated.length > 2 && (
                    <Link
                      href={`/profile/${userData.id}/meetings/participated`}
                      className="col-span-2"
                    >
                      <Button
                        variant="outline"
                        className="col-span-2 flex w-full items-center justify-center rounded-xl"
                      >
                        <span>참여 중인 모임 더보기</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  <p>아직 주최한 모임이 없습니다</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

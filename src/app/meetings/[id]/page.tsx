'use client';

import { use } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { currentUserId, meetingParticipants, meetings } from '@/__mock__';
import { motion } from 'framer-motion';
import { Calendar, Info, MapPin, MessageSquare, Share2, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function MeetingDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  // 해당 ID의 모임 찾기
  const meetingData = meetings.find((meeting) => meeting.id === params.id) || meetings[0];

  // 모임 참여자 찾기
  const participants = meetingParticipants.filter((mp) => mp.meeting.id === meetingData.id);

  // 호스트 찾기
  const host = participants.find((p) => p.host);

  // 현재 사용자가 참여 중인지 확인
  const isParticipating = participants.some((p) => p.user.id === currentUserId);

  // 현재 사용자가 호스트인지 확인
  const isHost = host?.user.id === currentUserId;

  // 모임이 가득 찼는지 확인
  const isFull = participants.length >= meetingData.maxPeople;

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

  const handleShare = () => {
    // 현재 URL을 클립보드에 복사
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast('링크가 복사되었습니다', {
          description: '친구들에게 공유해보세요!',
        });
      })
      .catch((err) => {
        console.error('클립보드 복사 실패:', err);
      });
  };

  const handleLeaveGroup = () => {
    // 실제로는 API 호출하여 모임 나가기
    toast('모임에서 나갔습니다');
  };

  const handleCompleteGroup = () => {
    // 실제로는 API 호출하여 모임 완료 처리
    toast('모임이 완료되었습니다', {
      description: '참여자들에게 리뷰를 남겨보세요!',
    });
  };

  const handleDeleteGroup = () => {
    // 실제로는 API 호출하여 모임 삭제
    toast('모임이 삭제되었습니다');
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(/\. /g, '-')
      .replace('.', '');
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 md:px-8">
      <motion.div
        className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="mb-2 text-3xl font-bold">{meetingData.title}</h1>
          <div className="flex items-center gap-2">
            <Badge
              className={`sinc-badge ${meetingData.end ? 'bg-gray-100 text-gray-700' : 'bg-emerald-100 text-emerald-700'}`}
            >
              {meetingData.end ? '완료' : '모집중'}
            </Badge>
            <span className="text-muted-foreground text-sm">
              {formatDate(meetingData.createdAt)} 생성
            </span>
          </div>
        </div>
        <div className="mt-2 flex w-full flex-wrap justify-end gap-2 md:mt-0 md:w-auto">
          <Button
            variant="ghost"
            className="hover:bg-primary/5 hover:text-primary flex items-center gap-2 rounded-xl transition-all duration-200"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            <span>공유하기</span>
          </Button>
          <Link href={`/events/${meetingData.event.id}`}>
            <Button
              variant="ghost"
              className="hover:bg-primary/5 hover:text-primary flex items-center gap-2 rounded-xl transition-all duration-200"
            >
              <Info className="h-4 w-4" />
              <span>행사 정보</span>
            </Button>
          </Link>
          <Link href={`/chats/${meetingData.id}`}>
            <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-xl text-white shadow-xs transition-all duration-200 hover:shadow-sm">
              <MessageSquare className="h-4 w-4" />
              <span>채팅방</span>
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <motion.div
          className="space-y-6 md:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="sinc-card overflow-hidden">
            <div className="p-6">
              <h2 className="mb-6 text-xl font-medium">모임 정보</h2>

              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={meetingData.event.image || '/placeholder.svg'}
                  alt={meetingData.event.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="mb-4 text-lg font-medium">{meetingData.event.title}</h3>

              <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-medium">모임 일시</p>
                    <p className="text-muted-foreground">{formatDate(meetingData.date)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-medium">장소</p>
                    <p className="text-muted-foreground">
                      {meetingData.event.district} {meetingData.event.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-medium">참여 인원</p>
                    <p className="text-muted-foreground">
                      {participants.length}/{meetingData.maxPeople}명
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6 border-t pt-6">
                <h3 className="mb-3 font-medium">모임 소개</h3>
                <p className="text-base leading-relaxed">{meetingData.description}</p>
              </div>

              {(meetingData.minAge || meetingData.maxAge || meetingData.gender) && (
                <div className="border-t pt-6">
                  <h3 className="mb-3 font-medium">참여 조건</h3>
                  <div className="flex flex-wrap gap-2">
                    {meetingData.minAge && meetingData.maxAge && (
                      <Badge variant="outline" className="sinc-badge">
                        {meetingData.minAge}~{meetingData.maxAge}세
                      </Badge>
                    )}
                    {meetingData.gender && (
                      <Badge variant="outline" className="sinc-badge">
                        {meetingData.gender === 'MALE' ? '남성' : '여성'}만
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <motion.div
            className="sinc-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="p-6">
              <h2 className="mb-4 text-xl font-medium">참여 멤버</h2>
              <p className="text-muted-foreground mb-6">
                현재 {participants.length}명이 참여 중입니다
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {participants.map((participant) => (
                  <motion.div key={participant.id} variants={itemVariants}>
                    <Link href={`/profile/${participant.user.id}`}>
                      <div className="hover:bg-secondary/50 flex items-center gap-3 rounded-xl p-3 transition-colors">
                        <Avatar className="border-primary/10 h-10 w-10 border-2">
                          <AvatarImage
                            src={participant.user.avatar}
                            alt={participant.user.nickname}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {participant.user.nickname.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{participant.user.nickname}</span>
                            {participant.host && (
                              <Badge className="sinc-badge bg-primary/10 text-primary">
                                주최자
                              </Badge>
                            )}
                          </div>
                          <div className="text-muted-foreground text-sm">매너 점수: 4.8</div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="sinc-card">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-medium">주최자 정보</h2>
              {host && (
                <Link href={`/profile/${host.user.id}`}>
                  <div className="hover:bg-secondary/50 mb-4 flex items-center gap-3 rounded-xl p-3 transition-colors">
                    <Avatar className="border-primary/10 h-12 w-12 border-2">
                      <AvatarImage src={host.user.avatar} alt={host.user.nickname} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {host.user.nickname.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{host.user.nickname}</div>
                      <div className="text-muted-foreground text-sm">매너 점수: 4.8</div>
                    </div>
                  </div>
                </Link>
              )}

              <Link href={`/profile/${host?.user.id}`}>
                <Button
                  variant="outline"
                  className="w-full rounded-xl shadow-xs transition-all duration-300 hover:shadow-sm"
                >
                  프로필 보기
                </Button>
              </Link>
            </div>
          </div>

          <div className="sinc-card">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-medium">모임 참여하기</h2>
              {isParticipating ? (
                <>
                  <div className="bg-secondary/50 mb-4 rounded-xl py-4 text-center">
                    이미 참여 중인 모임입니다
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
                    onClick={handleLeaveGroup}
                  >
                    모임 나가기
                  </Button>
                </>
              ) : isFull ? (
                <div className="bg-secondary/50 rounded-xl py-6 text-center">
                  모집이 마감되었습니다
                </div>
              ) : (
                <>
                  <div className="text-muted-foreground mb-4">
                    모임에 참여하면 채팅방에 입장할 수 있습니다
                  </div>
                  <Button className="w-full rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
                    모임 참여하기
                  </Button>
                </>
              )}
            </div>
          </div>

          {isHost && (
            <div className="sinc-card">
              <div className="p-6">
                <h2 className="mb-4 text-xl font-medium">모임 관리</h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    onClick={handleCompleteGroup}
                  >
                    모임 완료하기
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl">
                    주최자 위임하기
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full rounded-xl"
                    onClick={handleDeleteGroup}
                  >
                    모임 삭제하기
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

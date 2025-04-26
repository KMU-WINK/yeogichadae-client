'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';

import { RedirectType, redirect } from 'next/navigation';

import TitleLayout from '@/component/layout/title';

import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar';
import { Button } from '@/component/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/component/ui/form';
import { Input } from '@/component/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/component/ui/select';

import Api from '@/api';
import { UserEditRequest, UserEditRequestSchema } from '@/api/dto/user';
import { District, Gender } from '@/api/schema/user';

import { useUserStore } from '@/store/user.store';

import { useApiWithToast } from '@/hook/use-api';

import UserGuard from '@/lib/guard/user.guard';

import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function Page() {
  const [isApiProcessing, startApi] = useApiWithToast();
  const avatarRef = useRef<HTMLInputElement>(null);

  const { user, setUser } = useUserStore();

  const [avatar, setAvatar] = useState<File>();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user?.avatar);

  const form = useForm<UserEditRequest>({
    resolver: zodResolver(UserEditRequestSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: user?.nickname,
      district: user?.district || undefined,
      gender: user?.gender || undefined,
      age: user?.age || ('' as unknown as undefined),
    },
  });

  const permitModifyGender = useMemo(() => !user?.gender, [user]);
  const permitModifyAge = useMemo(() => !user?.age, [user]);

  const onSubmit = useCallback((values: UserEditRequest, avatar?: File) => {
    startApi(
      async () => {
        const { user } = await Api.Domain.User.updateMyInfo(values, avatar);
        setUser(user);
        setTimeout(() => redirect('/profile', RedirectType.push));
      },
      {
        loading: '프로필을 수정하고 있습니다.',
        success: '프로필을 수정했습니다.',
      },
    );
  }, []);

  return (
    <UserGuard>
      <TitleLayout title="프로필 수정" loading={false} className="max-w-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => onSubmit(values, avatar))}
            className="flex flex-col gap-6 rounded-2xl border bg-white p-6 shadow"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="size-28">
                  <AvatarImage src={avatarPreview} />
                  <AvatarFallback className="text-2xl">{user?.nickname.charAt(0)}</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  ref={avatarRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setAvatar(file);
                    setAvatarPreview(URL.createObjectURL(file));
                  }}
                />
                <Button
                  size="icon"
                  className="absolute right-0 bottom-0 rounded-full"
                  type="button"
                  onClick={() => avatarRef.current?.click()}
                >
                  <Camera />
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <Input placeholder="닉네임을 입력해주세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input value={user?.email} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>지역</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="지역을 선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(District)
                        .map((district) => district as District)
                        .map((district) => (
                          <SelectItem value={district} key={district}>
                            {district}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>성별</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!permitModifyGender}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="성별을 선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Gender.MALE}>남자</SelectItem>
                      <SelectItem value={Gender.FEMALE}>여자</SelectItem>
                    </SelectContent>
                  </Select>
                  {permitModifyGender && (
                    <FormDescription>이후에 성별은 변경할 수 없습니다.</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>나이</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="나이를 입력해주세요"
                      disabled={!permitModifyAge}
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  {permitModifyAge && (
                    <FormDescription>이후에 나이는 변경할 수 없습니다.</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isApiProcessing} className="sm:w-fit sm:self-end">
              <Edit />
              수정하기
            </Button>
          </form>
        </Form>
      </TitleLayout>
    </UserGuard>
  );
}

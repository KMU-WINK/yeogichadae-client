interface MenuItem {
  name: string;
  link: string;
  onlyUser?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    name: '메인',
    link: '/',
  },
  {
    name: '행사 캘린더',
    link: '/event/calendar',
  },
  {
    name: '내 모임',
    link: '/profile/meeting',
    onlyUser: true,
  },
];

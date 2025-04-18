interface MenuItem {
  name: string;
  link: string;
}

export const menuItems: MenuItem[] = [
  {
    name: '메인',
    link: '/',
  },
  {
    name: '행사캘린더',
    link: '/calendar',
  },
  {
    name: '내 모임',
    link: '/my-meetings',
  },
];

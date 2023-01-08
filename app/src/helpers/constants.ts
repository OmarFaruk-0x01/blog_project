export type AdminNavItemType = {
  title: string;
  url?: string;
  children?: AdminNavItemType[];
};

export const AdminNavs: AdminNavItemType[] = [
  {
    title: "View Site",
    url: "/",
  },
  {
    title: "Posts",
    url: "/admin/posts",
  },
  {
    title: "Topics",
    url: "/admin/topics",
  },
  {
    title: "Books",
    url: "/admin/books",
  },
  {
    title: "Logout",
    url: "/admin/logout",
  },
];

export enum PostCategory {
  NEWS = 'NEWS',
  PRESS = 'PRESS',
  SOCIAL_CONTRIBUTION = 'SOCIAL_CONTRIBUTION'
}

export interface Post {
  id: string;
  title: string;
  category: PostCategory;
  date: string;
  content: string;
  imageUrl: string;
}

export interface SiteConfig {
  companyName: string;
  primaryColor: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export interface NavItem {
  label: string;
  href: string;
}
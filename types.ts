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
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  adminPassword?: string; // 관리자 비밀번호 필드 추가
}

export interface NavItem {
  label: string;
  href: string;
}
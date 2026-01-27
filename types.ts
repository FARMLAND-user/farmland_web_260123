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
  aboutImage: string;
  bannerImage: string;
  adminPassword?: string;
  // 각 영역별 텍스트 필드 추가
  aboutSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  businessSubtitle: string;
  businessTitle: string;
  bannerSubtitle: string;
  bannerTitle: string;
  bannerDescription: string;
  newsSubtitle: string;
  newsTitle: string;
  contactSubtitle: string;
  contactTitle: string;
  contactDescription: string;
}

export interface NavItem {
  label: string;
  href: string;
}
import { Post, PostCategory, SiteConfig } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  companyName: "FARMLAND",
  primaryColor: "#556B2F",
  contactEmail: "farmland@farmland.co.kr",
  contactPhone: "031-557-5220",
  address: "경기도 남양주시 진접읍 봉현로 133",
  heroTitle: "자연이 주는\n정직한 가치, 팜랜드",
  heroSubtitle: "Premium Agriculture",
  heroDescription: "우리는 땅의 정직함을 믿습니다.\n첨단 기술과 자연의 조화로 최고의 농산물을 제공합니다.",
  heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop",
  adminPassword: "admin1234" // 기본 비밀번호 설정
};

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: '2026년 B2B 사업 영역 전면 확대 및 파트너십 강화',
    category: PostCategory.NEWS,
    date: '2026-01-01',
    content: '기업 급식 및 대형 외식 프랜차이즈 대상 공급망을 확충하고 전처리 시스템을 고도화합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop'
  },
  {
    id: '2',
    title: '신선 편의 전처리 시스템 도입',
    category: PostCategory.PRESS,
    date: '2026-01-08',
    content: '세척, 절단, 포장 등 맞춤형 전처리 서비스를 통해 효율을 극대화하십시오.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: '지역 농가와 함께 성장하는 상생 협력 프로젝트',
    category: PostCategory.SOCIAL_CONTRIBUTION,
    date: '2025-12-28',
    content: '지역 농산물 우선 구매와 계약 재배를 통해 상생을 실천합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop'
  }
];
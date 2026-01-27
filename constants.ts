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
  heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000",
  aboutImage: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200",
  bannerImage: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000",
  adminPassword: "admin1234",
  // 추가된 텍스트 기본값
  aboutSubtitle: "OUR PHILOSOPHY",
  aboutTitle: "건강한 식탁을 위한\n끊임없는 연구와 노력",
  aboutDescription: "FARMLAND는 단순히 농산물을 유통하는 것을 넘어, 철저한 품질 관리와 최신 전처리 공정을 통해 고객사의 비즈니스에 핵심적인 가치를 더합니다.",
  businessSubtitle: "CORE BUSINESS",
  businessTitle: "비즈니스 핵심 역량",
  bannerSubtitle: "SMART FARMING FUTURE",
  bannerTitle: "자연과 기술이 그리는\n새로운 농업의 가치",
  bannerDescription: "가장 깨끗한 땅에서 자란 결실을 가장 안전하게 전달하기 위해\n팜랜드의 기술은 멈추지 않고 진화합니다.",
  newsSubtitle: "NEWS & MEDIA",
  newsTitle: "최신 소식",
  contactSubtitle: "CONNECT WITH US",
  contactTitle: "비즈니스 파트너십 문의",
  contactDescription: "팜랜드의 고품질 농산물과 효율적인 전처리 시스템을 통해 귀사의 성공을 지원합니다. 지금 바로 파트너십을 시작해보세요."
};

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: '2026년 B2B 사업 영역 전면 확대 및 파트너십 강화',
    category: PostCategory.NEWS,
    date: '2026-01-01',
    content: '기업 급식 및 대형 외식 프랜차이즈 대상 공급망을 확충하고 전처리 시스템을 고도화합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: '신선 편의 전처리 시스템 도입',
    category: PostCategory.PRESS,
    date: '2026-01-08',
    content: '세척, 절단, 포장 등 맞춤형 전처리 서비스를 통해 효율을 극대화하십시오.',
    imageUrl: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: '지역 농가와 함께 성장하는 상생 협력 프로젝트',
    category: PostCategory.SOCIAL_CONTRIBUTION,
    date: '2025-12-28',
    content: '지역 농산물 우선 구매와 계약 재배를 통해 상생을 실천합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000'
  }
];
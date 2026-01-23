
import { Post, PostCategory, SiteConfig } from './types';

/* [설정] 사이트 전반의 기본 정보 (회사명, 연락처, 주소 등) */
export const INITIAL_CONFIG: SiteConfig = {
  companyName: "FARMLAND",
  primaryColor: "#556B2F",
  contactEmail: "farmland@farmland.co.kr",
  contactPhone: "031-557-5220",
  address: "경기도 남양주시 진접읍 봉현로 133"
};

/* [데이터] 뉴스 섹션에 표시될 초기 게시물 리스트 */
export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: '2026년 B2B 사업 영역 전면 확대 및 파트너십 강화',
    category: PostCategory.NEWS,
    date: '2026-01-01',
    content: '기업 급식 및 대형 외식 프랜차이즈 대상 공급망을 확충하고 전처리 시스템을 고도화합니다. 안정적인 식자재 공급을 통해 기업 고객의 든든한 비즈니스 파트너로 도약하겠습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop'
  },
  {
    id: '2',
    title: '신선 편의 전처리 시스템 도입',
    category: PostCategory.PRESS,
    date: '2026-01-08',
    content: '세척, 절단, 포장 등 맞춤형 전처리 서비스를 통해 조리 시간 단축과 인건비 절감을 실현합니다. 철저한 위생 공정을 거친 Ready-to-Use 식자재로 효율을 극대화하십시오.',
    // 전문가들이 설비를 점검하는 현대적이고 전문적인 분위기의 이미지
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: '지역 농가와 함께 성장하는 상생 협력 프로젝트',
    category: PostCategory.SOCIAL_CONTRIBUTION,
    date: '2025-12-28',
    content: '지역 농산물 우선 구매와 계약 재배를 통해 농가에는 안정적인 판로를 제공하고, 소비자에게는 최상의 신선함을 전달합니다. 지역 사회와 함께 웃는 지속 가능한 경영을 실천합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop'
  }
];

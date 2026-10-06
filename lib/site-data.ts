export type NavChild = { label: string; href: string };

export type NavItem = {
  label: string;
  href: string;
  icon: string;
  description: string;
  children?: NavChild[];
  requiresAuth?: boolean;
};

export const navItems: NavItem[] = [
  {
    label: "꿀강",
    href: "/courses",
    icon: "🍯",
    description: "실무에 바로 쓰는 엑셀·포토샵·광고 마케팅 강의",
    children: [
      { label: "엑셀", href: "/courses/excel" },
      { label: "포토샵", href: "/courses/photoshop" },
      { label: "광고 마케팅", href: "/courses/marketing" },
    ],
  },
  {
    label: "취업 준비",
    href: "/prep",
    icon: "🎯",
    description: "자소서부터 면접, 체크리스트까지 한 번에",
    children: [
      { label: "자소서 도우미", href: "/prep/resume" },
      { label: "면접 연습", href: "/prep/interview" },
      { label: "체크리스트", href: "/prep/checklist" },
    ],
  },
  {
    label: "직무/산업 공유",
    href: "/insights",
    icon: "💬",
    description: "현직자와 선배들이 나누는 직무·산업 이야기",
  },
  {
    label: "공고 모음",
    href: "/jobs",
    icon: "📢",
    description: "기업 규모별로 정리한 채용 공고",
    children: [
      { label: "대기업", href: "/jobs/large" },
      { label: "공기업", href: "/jobs/public" },
      { label: "중견기업", href: "/jobs/mid" },
      { label: "중소기업", href: "/jobs/small" },
      { label: "강소기업", href: "/jobs/strong-small" },
    ],
  },
  {
    label: "자유 게시판",
    href: "/board",
    icon: "📝",
    description: "회원끼리 자유롭게 이야기 나누는 공간",
    requiresAuth: true,
  },
];

export function getSection(href: string) {
  return navItems.find((item) => item.href === href)!;
}

export function getSubPage(sectionHref: string, slug: string) {
  return getSection(sectionHref).children?.find(
    (child) => child.href === `${sectionHref}/${slug}`,
  );
}

export function getSlugs(sectionHref: string) {
  return (getSection(sectionHref).children ?? []).map((child) =>
    child.href.slice(sectionHref.length + 1),
  );
}

export type Course = {
  id: number;
  title: string;
  category: "엑셀" | "포토샵" | "광고 마케팅";
  instructor: string;
  lessons: number;
  level: "입문" | "초급" | "중급";
  href: string;
};

export const courses: Course[] = [
  { id: 1, title: "실무 엑셀 함수 30선", category: "엑셀", instructor: "김데이터", lessons: 24, level: "입문", href: "/courses/excel/1" },
  { id: 2, title: "피벗 테이블로 보고서 10분 컷", category: "엑셀", instructor: "박분석", lessons: 12, level: "초급", href: "/courses/excel/2" },
  { id: 3, title: "포토샵 기초: 레이어와 마스크", category: "포토샵", instructor: "이디자인", lessons: 18, level: "입문", href: "/courses/photoshop/3" },
  { id: 4, title: "SNS 카드뉴스 디자인 실습", category: "포토샵", instructor: "최픽셀", lessons: 15, level: "초급", href: "/courses/photoshop/4" },
  { id: 5, title: "퍼포먼스 마케팅 첫걸음", category: "광고 마케팅", instructor: "정그로스", lessons: 20, level: "입문", href: "/courses/marketing/5" },
  { id: 6, title: "GA4로 광고 성과 읽기", category: "광고 마케팅", instructor: "한지표", lessons: 16, level: "중급", href: "/courses/marketing/6" },
];

export const quotes: { text: string; author: string }[] = [
  { text: "성공은 매일 반복한 작은 노력들의 합이다.", author: "로버트 콜리어" },
  { text: "시작하는 방법은 그만 말하고 이제 행동하는 것이다.", author: "월트 디즈니" },
  { text: "기회는 준비된 사람에게 찾아온다.", author: "루이 파스퇴르" },
  { text: "넘어지는 것은 실패가 아니다. 일어나지 않는 것이 실패다.", author: "메리 픽포드" },
  { text: "오늘 할 수 있는 일에 최선을 다하라.", author: "아이작 뉴턴" },
];

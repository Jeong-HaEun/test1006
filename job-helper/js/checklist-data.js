// 체크리스트 항목 (checklist.html, index.html 에서 공유)
const CHECKLIST_DATA = [
  {
    title: "1단계 · 자기 분석",
    items: [
      { id: "self-1", text: "나의 강점과 약점 3가지씩 정리하기" },
      { id: "self-2", text: "관심 직무와 산업 분야 정하기" },
      { id: "self-3", text: "경험(프로젝트·대외활동·아르바이트) 목록 작성하기" },
      { id: "self-4", text: "취업 목표 기간과 우선순위 설정하기" },
    ],
  },
  {
    title: "2단계 · 서류 준비",
    items: [
      { id: "doc-1", text: "기본 이력서 양식 완성하기" },
      { id: "doc-2", text: "공통 자기소개서 항목(지원동기·성장과정·직무역량) 초안 작성" },
      { id: "doc-3", text: "포트폴리오 정리하기 (해당 직무)" },
      { id: "doc-4", text: "증명사진 준비하기" },
      { id: "doc-5", text: "졸업(예정)증명서·성적증명서 발급하기" },
      { id: "doc-6", text: "어학/자격증 성적표 준비하기" },
    ],
  },
  {
    title: "3단계 · 기업 분석 & 지원",
    items: [
      { id: "apply-1", text: "지원할 기업 리스트 10곳 이상 만들기" },
      { id: "apply-2", text: "기업 인재상·비전·최근 뉴스 조사하기" },
      { id: "apply-3", text: "채용 공고 마감일 지원 현황에 등록하기" },
      { id: "apply-4", text: "인적성/코딩테스트 유형 파악 및 연습하기" },
    ],
  },
  {
    title: "4단계 · 면접 준비",
    items: [
      { id: "iv-1", text: "1분 자기소개 준비하기" },
      { id: "iv-2", text: "예상 질문 20개 답변 작성하기" },
      { id: "iv-3", text: "모의 면접 3회 이상 해보기 (녹화 추천)" },
      { id: "iv-4", text: "면접 복장 준비하기" },
      { id: "iv-5", text: "면접 마지막 '질문 있나요?'에 할 질문 준비하기" },
      { id: "iv-6", text: "면접 장소·이동 경로 미리 확인하기" },
    ],
  },
];

const CHECKLIST_TOTAL = CHECKLIST_DATA.reduce((sum, g) => sum + g.items.length, 0);

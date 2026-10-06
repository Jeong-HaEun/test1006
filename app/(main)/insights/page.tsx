import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";
import { getSection } from "@/lib/site-data";

const section = getSection("/insights");

export const metadata = { title: `${section.label} - 꿈꾸리` };

export default function InsightsPage() {
  return (
    <PageContainer>
      <PageHeader title={section.label} description={section.description} />
      <ComingSoon message="직무·산업 이야기 게시판을 준비 중입니다." />
    </PageContainer>
  );
}

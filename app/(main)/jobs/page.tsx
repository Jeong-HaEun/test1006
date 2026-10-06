import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import SubMenuCards from "@/components/common/SubMenuCards";
import { getSection } from "@/lib/site-data";

const section = getSection("/jobs");

export const metadata = { title: `${section.label} - 꿈꾸리` };

export default function JobsPage() {
  return (
    <PageContainer>
      <PageHeader title={section.label} description={section.description} />
      <SubMenuCards items={section.children ?? []} />
    </PageContainer>
  );
}

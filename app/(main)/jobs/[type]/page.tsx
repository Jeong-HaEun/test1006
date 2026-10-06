import { notFound } from "next/navigation";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";
import { getSection, getSlugs, getSubPage } from "@/lib/site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs("/jobs").map((type) => ({ type }));
}

export default async function JobsTypePage({ params }: PageProps<"/jobs/[type]">) {
  const { type } = await params;
  const sub = getSubPage("/jobs", type);
  if (!sub) notFound();

  const section = getSection("/jobs");

  return (
    <PageContainer>
      <PageHeader
        title={`${sub.label} 공고`}
        crumbs={[{ label: section.label, href: section.href }]}
      />
      <ComingSoon message={`${sub.label} 채용 공고를 모으는 중입니다.`} />
    </PageContainer>
  );
}

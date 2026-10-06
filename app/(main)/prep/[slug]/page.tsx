import { notFound } from "next/navigation";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";
import { getSection, getSlugs, getSubPage } from "@/lib/site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs("/prep").map((slug) => ({ slug }));
}

export default async function PrepSubPage({ params }: PageProps<"/prep/[slug]">) {
  const { slug } = await params;
  const sub = getSubPage("/prep", slug);
  if (!sub) notFound();

  const section = getSection("/prep");

  return (
    <PageContainer>
      <PageHeader title={sub.label} crumbs={[{ label: section.label, href: section.href }]} />
      <ComingSoon message={`${sub.label} 기능을 준비 중입니다.`} />
    </PageContainer>
  );
}

import { notFound } from "next/navigation";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";
import CourseGrid from "@/components/home/CourseGrid";
import { courses, getSection, getSlugs, getSubPage } from "@/lib/site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs("/courses").map((category) => ({ category }));
}

export default async function CourseCategoryPage({ params }: PageProps<"/courses/[category]">) {
  const { category } = await params;
  const sub = getSubPage("/courses", category);
  if (!sub) notFound();

  const section = getSection("/courses");
  const list = courses.filter((course) => course.href.startsWith(`${sub.href}/`));

  return (
    <PageContainer>
      <PageHeader
        title={sub.label}
        description={`${sub.label} 강의 모음`}
        crumbs={[{ label: section.label, href: section.href }]}
      />
      {list.length > 0 ? (
        <CourseGrid courses={list} title={`${sub.label} 강의`} description={`총 ${list.length}개 강의`} />
      ) : (
        <ComingSoon message="등록된 강의가 아직 없습니다." />
      )}
    </PageContainer>
  );
}

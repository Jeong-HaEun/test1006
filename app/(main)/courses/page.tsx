import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import SubMenuCards from "@/components/common/SubMenuCards";
import CourseGrid from "@/components/home/CourseGrid";
import { courses, getSection } from "@/lib/site-data";

const section = getSection("/courses");

export const metadata = { title: `${section.label} - 꿈꾸리` };

export default function CoursesPage() {
  return (
    <PageContainer>
      <PageHeader title={section.label} description={section.description} />
      <div className="flex flex-col gap-16">
        <SubMenuCards items={section.children ?? []} />
        <CourseGrid courses={courses} title="전체 강의" description={`총 ${courses.length}개 강의`} />
      </div>
    </PageContainer>
  );
}

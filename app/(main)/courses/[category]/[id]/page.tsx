import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import { courses, getSection, getSubPage } from "@/lib/site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((course) => {
    const [, , category, id] = course.href.split("/");
    return { category, id };
  });
}

export default async function CourseDetailPage({
  params,
}: PageProps<"/courses/[category]/[id]">) {
  const { category, id } = await params;
  const course = courses.find((c) => c.href === `/courses/${category}/${id}`);
  const sub = getSubPage("/courses", category);
  if (!course || !sub) notFound();

  const section = getSection("/courses");

  return (
    <PageContainer>
      <PageHeader
        title={course.title}
        description={`${course.instructor} · ${course.lessons}강 · ${course.level}`}
        crumbs={[
          { label: section.label, href: section.href },
          { label: sub.label, href: sub.href },
        ]}
      />
      <section className="rounded-2xl glass p-6">
        <h2 className="text-lg font-bold text-ink">커리큘럼</h2>
        <ol className="mt-4 divide-y divide-ink/8">
          {Array.from({ length: Math.min(course.lessons, 5) }, (_, i) => (
            <li key={i} className="py-3 text-sm text-ink">
              {i + 1}강. {course.title} — 파트 {i + 1}
            </li>
          ))}
        </ol>
        {course.lessons > 5 && (
          <p className="mt-2 text-sm text-muted">외 {course.lessons - 5}강</p>
        )}
        <Link
          href="/login"
          className="mt-6 inline-block rounded-full bg-tomato shadow-tomato px-6 py-3 text-sm font-bold text-white hover:bg-tomato-hover"
        >
          로그인하고 수강하기
        </Link>
      </section>
    </PageContainer>
  );
}

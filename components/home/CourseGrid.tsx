import type { Course } from "@/lib/site-data";
import CourseCard from "./CourseCard";
import SectionTitle from "./SectionTitle";

export default function CourseGrid({
  courses,
  title = "등록된 강의",
  description = "꿀강에 올라온 최신 강의를 만나보세요.",
}: {
  courses: Course[];
  title?: string;
  description?: string;
}) {
  return (
    <section>
      <SectionTitle title={title} description={description} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

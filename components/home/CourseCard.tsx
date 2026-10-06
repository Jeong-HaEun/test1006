import Link from "next/link";
import type { Course } from "@/lib/site-data";

const categoryStyle: Record<Course["category"], { emoji: string; bg: string }> = {
  엑셀: { emoji: "📊", bg: "bg-emerald-200/45" },
  포토샵: { emoji: "🎨", bg: "bg-sky-200/45" },
  "광고 마케팅": { emoji: "📈", bg: "bg-rose-200/45" },
};

export default function CourseCard({ course }: { course: Course }) {
  const style = categoryStyle[course.category];

  return (
    <Link
      href={course.href}
      className="group flex flex-col overflow-hidden rounded-2xl glass transition hover:-translate-y-1 hover:bg-glass-hover hover:shadow-tomato"
    >
      <div className={`flex h-32 items-center justify-center text-5xl ${style.bg}`}>
        {style.emoji}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-tomato-soft px-2 py-0.5 font-semibold text-tomato">
            {course.category}
          </span>
          <span className="text-muted">{course.level}</span>
        </div>
        <h3 className="font-bold text-ink group-hover:text-tomato">
          {course.title}
        </h3>
        <p className="mt-auto text-sm text-muted">
          {course.instructor} · {course.lessons}강
        </p>
      </div>
    </Link>
  );
}

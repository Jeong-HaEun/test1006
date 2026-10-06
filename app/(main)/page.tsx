import StartHero from "@/components/home/StartHero";
import DailyQuote from "@/components/home/DailyQuote";
import MenuSummary from "@/components/home/MenuSummary";
import CourseGrid from "@/components/home/CourseGrid";
import { courses, navItems } from "@/lib/site-data";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-10">
      <StartHero />
      <DailyQuote />
      <MenuSummary items={navItems.filter((item) => !item.requiresAuth)} />
      <CourseGrid courses={courses} />
    </main>
  );
}

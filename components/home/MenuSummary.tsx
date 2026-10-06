import Link from "next/link";
import type { NavItem } from "@/lib/site-data";
import SectionTitle from "./SectionTitle";

export default function MenuSummary({ items }: { items: NavItem[] }) {
  return (
    <section>
      <SectionTitle title="꿈꾸리 한눈에 보기" description="필요한 메뉴로 바로 이동하세요." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.href}
            className="flex flex-col rounded-2xl glass p-5"
          >
            <span className="text-3xl" aria-hidden>
              {item.icon}
            </span>
            <Link
              href={item.href}
              className="mt-3 text-lg font-bold text-ink hover:text-tomato"
            >
              {item.label}
            </Link>
            <p className="mt-1 text-sm text-muted">{item.description}</p>
            {item.children && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="rounded-full bg-glass border border-white/80 px-3 py-1 text-xs text-ink hover:bg-tomato-soft hover:text-tomato"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

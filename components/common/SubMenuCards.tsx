import Link from "next/link";
import type { NavChild } from "@/lib/site-data";

export default function SubMenuCards({ items }: { items: NavChild[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="flex items-center justify-between rounded-2xl glass p-6 text-lg font-bold text-ink transition hover:-translate-y-1 hover:border-tomato/40 hover:text-tomato hover:bg-glass-hover hover:shadow-tomato"
          >
            {item.label}
            <span aria-hidden>→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

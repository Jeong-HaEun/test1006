"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import type { NavItem } from "@/lib/site-data";

export default function NavMenu({ items }: { items: NavItem[] }) {
  const { user } = useAuth();
  const visibleItems = items.filter((item) => !item.requiresAuth || user);

  return (
    <nav aria-label="주요 메뉴" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {visibleItems.map((item) => (
          <li key={item.href} className="group relative">
            <Link
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-glass-hover hover:text-tomato"
            >
              {item.label}
              {item.children && <span className="ml-1 text-xs text-faint">▾</span>}
            </Link>
            {item.children && (
              <ul className="invisible absolute left-0 top-full z-20 min-w-36 rounded-lg glass py-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="block px-4 py-2 text-sm text-ink hover:bg-tomato-soft hover:text-tomato"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

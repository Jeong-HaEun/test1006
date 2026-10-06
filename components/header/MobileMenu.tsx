"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import type { NavItem } from "@/lib/site-data";

export default function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const visibleItems = items.filter((item) => !item.requiresAuth || user);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="메뉴 열기"
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-2 text-xl text-ink hover:bg-glass-hover"
      >
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <nav
          aria-label="모바일 메뉴"
          className="absolute inset-x-0 top-full glass-bar px-4 pb-4 "
        >
          <ul className="divide-y divide-ink/8">
            {visibleItems.map((item) => (
              <li key={item.href} className="py-3">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-semibold text-ink"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="rounded-full bg-glass border border-white/80 px-3 py-1 text-sm text-ink"
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
      )}
    </div>
  );
}

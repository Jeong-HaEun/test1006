"use client";

import { useState } from "react";
import { quotes } from "@/lib/site-data";

export default function DailyQuote() {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];

  return (
    <section className="flex flex-col items-center gap-4 glass rounded-2xl px-6 py-10 text-center">
      <h2 className="text-sm font-bold tracking-widest text-tomato">
        오늘의 한마디
      </h2>
      <blockquote className="max-w-2xl text-xl font-semibold text-ink sm:text-2xl">
        “{quote.text}”
      </blockquote>
      <p className="text-sm text-muted">— {quote.author}</p>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % quotes.length)}
        className="rounded-full border border-white/80 bg-glass px-4 py-1.5 text-sm text-ink transition-colors hover:bg-tomato-soft hover:text-tomato"
      >
        다른 한마디 보기
      </button>
    </section>
  );
}

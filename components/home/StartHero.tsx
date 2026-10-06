import Link from "next/link";

const steps = [
  { label: "체크리스트로 현황 점검", href: "/prep/checklist" },
  { label: "자소서 초안 작성", href: "/prep/resume" },
  { label: "모의 면접 연습", href: "/prep/interview" },
];

export default function StartHero() {
  return (
    <section className="glass rounded-3xl px-6 py-12 text-ink sm:px-12">
      <p className="text-sm font-semibold text-tomato">
        취업 준비, 어디서부터 시작할지 막막하다면
      </p>
      <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
        꿈꾸리와 함께
        <br />
        준비를 시작해 보세요
      </h1>
      <ol className="mt-8 grid gap-3 sm:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.href}>
            <Link
              href={step.href}
              className="flex items-center gap-3 rounded-xl border border-white/80 bg-glass px-4 py-3 text-sm font-medium transition-colors hover:bg-glass-hover"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tomato text-sm font-bold text-white shadow-tomato">
                {i + 1}
              </span>
              {step.label}
            </Link>
          </li>
        ))}
      </ol>
      <Link
        href="/prep"
        className="mt-8 inline-block rounded-full bg-tomato px-6 py-3 text-sm font-bold text-white shadow-tomato transition-colors hover:bg-tomato-hover"
      >
        준비 시작하기 →
      </Link>
    </section>
  );
}

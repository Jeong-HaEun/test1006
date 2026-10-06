import Link from "next/link";

export default function AuthSwitchLink({
  question,
  linkLabel,
  href,
}: {
  question: string;
  linkLabel: string;
  href: string;
}) {
  return (
    <p className="mt-6 text-center text-sm text-muted">
      {question}{" "}
      <Link href={href} className="font-semibold text-tomato hover:underline">
        {linkLabel}
      </Link>
    </p>
  );
}

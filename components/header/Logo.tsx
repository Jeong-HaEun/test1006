import Link from "next/link";

export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <Link
      href="/"
      className={`font-extrabold tracking-tight text-tomato ${
        size === "lg" ? "text-4xl" : "text-2xl"
      }`}
    >
      꿈꾸리
    </Link>
  );
}

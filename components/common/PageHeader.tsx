import Link from "next/link";

type Crumb = { label: string; href: string };

export default function PageHeader({
  title,
  description,
  crumbs = [],
}: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
}) {
  return (
    <div className="mb-10">
      <nav aria-label="현재 위치" className="mb-3 text-sm text-muted">
        <Link href="/" className="hover:text-tomato">
          홈
        </Link>
        {crumbs.map((crumb) => (
          <span key={crumb.href}>
            {" / "}
            <Link href={crumb.href} className="hover:text-tomato">
              {crumb.label}
            </Link>
          </span>
        ))}
      </nav>
      <h1 className="text-3xl font-extrabold text-ink">{title}</h1>
      {description && (
        <p className="mt-2 text-muted">{description}</p>
      )}
    </div>
  );
}

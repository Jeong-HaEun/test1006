import Logo from "@/components/header/Logo";

export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl glass p-8 ">
      <div className="mb-8 flex flex-col items-center gap-2">
        <Logo size="lg" />
        <h1 className="text-sm font-medium text-muted">{title}</h1>
      </div>
      {children}
    </div>
  );
}

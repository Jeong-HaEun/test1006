export default function TextField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
      {label}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-white/80 bg-white/40 placeholder:text-faint px-3 py-2.5 font-normal text-ink outline-none focus:border-tomato focus:ring-2 focus:ring-tomato-soft"
      />
    </label>
  );
}

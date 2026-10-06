import { navItems } from "@/lib/site-data";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import MobileMenu from "./MobileMenu";
import LoginButton from "./LoginButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 glass-bar">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-8">
          <Logo />
          <NavMenu items={navItems} />
        </div>
        <div className="flex items-center gap-2">
          <LoginButton />
          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}

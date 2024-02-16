import { Link, NavbarItem } from "@nextui-org/react";
import { useLinkActive } from "../../hooks/use-link-active";

interface NavbarLinkProps {
  label: string;
  path: string;
}

export function NavbarLink({ label, path }: NavbarLinkProps) {
  const checkPath = useLinkActive();
  const isActive = checkPath(path);

  return (
    <NavbarItem isActive={isActive} aria-current={isActive ? "page" : undefined}>
      <Link color={isActive ? undefined : "foreground"} href={path}>
        {label}
      </Link>
    </NavbarItem>
  );
}

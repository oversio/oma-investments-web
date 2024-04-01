import { NavbarItem } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { useLinkActive } from "../../hooks/use-link-active";
import { classMerge } from "../../utils/class-merge";

interface NavbarLinkProps {
  label: string;
  path: string;
}

export function NavbarLink({ label, path }: NavbarLinkProps) {
  const checkPath = useLinkActive();
  const isActive = checkPath(path);

  return (
    <NavbarItem isActive={isActive} aria-current={isActive ? "page" : undefined}>
      <Link to={path} className={classMerge(isActive ? " text-blue-600" : "")}>
        {label}
      </Link>
    </NavbarItem>
  );
}

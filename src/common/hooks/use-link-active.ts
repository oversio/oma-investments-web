import { useLocation } from "react-router";

export function useLinkActive() {
  const location = useLocation();

  return (path: string) => (path === "/" ? location.pathname === path : location.pathname.includes(path));
}

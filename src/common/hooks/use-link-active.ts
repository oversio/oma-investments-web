import { useLocation } from "react-router";

export function useLinkActive() {
  const location = useLocation();

  return (path: string) => location.pathname === path;
}

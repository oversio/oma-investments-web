import { Skeleton as UiSkeleton } from "@nextui-org/react";

import { classMerge } from "../../utils/class-merge";

type SkeletonsProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonsProps) {
  return <UiSkeleton className={classMerge(" rounded-full h-12 w-full", className)} />;
}

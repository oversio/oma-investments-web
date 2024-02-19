import { PropsWithChildren } from "react";

export function CoverLayout({ children, coverImage }: PropsWithChildren<{ coverImage: string }>) {
  return (
    <div className=" w-screen min-h-screen h-full overflow-hidden">
      <div className="grid grid-cols-12 min-h-[75vh]">
        <div className=" col-start-1 col-end-7">
          <div className="flex justify-center h-full">{children}</div>
        </div>
        <div className=" col-start-8 col-end-13 hidden md:block h-full -skew-x-12 overflow-hidden rounded-bl-3xl -mr-32">
          <div
            className="h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${coverImage})` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

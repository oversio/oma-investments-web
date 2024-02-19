import { Spinner } from "@nextui-org/react";

export function LoadingPageState() {
  return (
    <div className=" flex justify-center items-center flex-col h-screen">
      <Spinner size="lg" color="primary" />
      <p>Loading...</p>
    </div>
  );
}

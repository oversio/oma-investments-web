import {
  Button,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerProps,
  Skeleton,
} from "@nextui-org/react";
import { PropsWithChildren } from "react";

export type ButtonAndLabel = ButtonProps & {
  label: string;
};

export type PanelProps = PropsWithChildren &
  DrawerProps & {
    title?: string;
    cancelButton?: ButtonAndLabel;
    confirmButton?: ButtonAndLabel;
    isLoading?: boolean;
  };

export function Panel({ children, title, cancelButton, confirmButton, isLoading, ...props }: PanelProps) {
  return (
    <Drawer
      placement="right"
      backdrop="blur"
      classNames={{
        base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
      }}
      {...props}
    >
      <DrawerContent>
        {onDrawerClose => (
          <>
            <DrawerHeader>
              <h2 className="text-base font-semibold">{title}</h2>
            </DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
            <DrawerFooter>
              <div className="flex justify-end items-center gap-2">
                {cancelButton ? (
                  <Button variant="flat" onPress={onDrawerClose} {...cancelButton}>
                    {cancelButton.label}
                  </Button>
                ) : null}
                {confirmButton &&
                  (!isLoading ? (
                    <Button color="primary" {...confirmButton}>
                      {confirmButton.label}
                    </Button>
                  ) : (
                    <Skeleton className=" h-10 w-24" />
                  ))}
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

import { PropsWithChildren } from "react";

import { Drawer, DrawerProps } from "../drawer/drawer";
import { PanelFooter, PanelFooterProps } from "./panel-footer";
import { PanelHeader } from "./panel-header";

export type PanelProps = PropsWithChildren<PanelFooterProps> &
  DrawerProps & {
    title?: string;
  };

export function Panel({
  children,
  title,
  cancelButton,
  confirmButton,
  onClose,
  isLoading,
  ...props
}: PanelProps) {
  return (
    <Drawer onClose={onClose} placement="right" containerClassName="flex flex-col" {...props}>
      <PanelHeader title={title} onClose={onClose} />

      <div className=" flex-grow max-h-full overflow-y-auto">{children}</div>

      {cancelButton || confirmButton ? (
        <PanelFooter
          cancelButton={cancelButton}
          confirmButton={confirmButton}
          onClose={onClose}
          isLoading={isLoading}
        />
      ) : null}
    </Drawer>
  );
}

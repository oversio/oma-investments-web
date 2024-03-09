import { faClose } from "@fortawesome/pro-light-svg-icons";

import { IconButton } from "../icon-button/icon-button";

interface DrawerHeaderProps {
  title?: string;
  onClose: () => void;
}

export function DrawerHeader({ title, onClose }: DrawerHeaderProps) {
  return (
    <div className="flex justify-between items-center max-h-16 p-5 border-b border-default-200">
      <h2 className="text-base font-semibold">{title}</h2>
      <IconButton icon={faClose} onClick={onClose} color="danger" />
    </div>
  );
}

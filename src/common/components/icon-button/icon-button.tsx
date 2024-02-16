import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "@nextui-org/react";

type IconButtonProps = Omit<ButtonProps, "children"> & {
  icon: IconDefinition;
};

export function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <Button {...props} isIconOnly variant="flat">
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
}

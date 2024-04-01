import { faEdit, faTrashAlt } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@nextui-org/react";

import { Button } from "../../../../../common/components/button/button";

export function CompanyActions() {
  return (
    <div className="flex gap-3">
      <Tooltip content="Editar empresa">
        <Button isIconOnly color="secondary">
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </Tooltip>

      <Tooltip content="Eliminar empresa">
        <Button isIconOnly color="danger">
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </Tooltip>
    </div>
  );
}

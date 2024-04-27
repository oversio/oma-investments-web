import { faEdit, faMoneyBillTrendUp, faTrash } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@nextui-org/react";

import { Button } from "../../../../../common/components/button/button";

export type CompanyActionType = "edit" | "delete" | "profitability";
interface CompanyActionsProps {
  onActionClick?: (action: CompanyActionType) => void;
}

export function CompanyActions({ onActionClick }: CompanyActionsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end gap-3">
        <Tooltip content="Editar empresa">
          <Button isIconOnly color="primary" variant="flat">
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Tooltip>

        <Tooltip content="Eliminar empresa">
          <Button isIconOnly color="danger" variant="flat">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Tooltip>
      </div>
      <div className="flex gap-3">
        <Tooltip content="Realizar análisis rentabilidad" placement="bottom">
          <Button
            color="primary"
            variant="flat"
            startContent={<FontAwesomeIcon icon={faMoneyBillTrendUp} />}
            onPress={() => onActionClick?.("profitability")}
          >
            Rentabilidad
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

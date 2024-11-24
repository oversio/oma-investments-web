import { faCheck } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { Modal } from "../../../../../common/components/modal/modal";
import { ID } from "../../../../../common/types";

interface SolvencyAnalisysModalProps {
  companyId: ID | undefined;
  onClose: () => void;
}

export function SolvencyAnalisysModal({ companyId = "", onClose }: SolvencyAnalisysModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = async () => {
    setIsOpen(false);
    await new Promise(resolve => setTimeout(resolve, 300));
    onClose();
  };

  const handleSaveResults = async () => {
    console.log("Saving results");
  };

  return (
    <Modal
      isOpen={isOpen}
      size="5xl"
      header="Análisis de rentabilidad"
      onClose={() => void handleClose()}
      backdrop="blur"
      cancelButton={{
        label: "Cerrar",
      }}
      confirmButton={{
        label: "Guardar",
        startContent: <FontAwesomeIcon icon={faCheck} />,
        onPress: () => void handleSaveResults(),
      }}
    >
      <div>
        <p>Modal content</p>
      </div>
    </Modal>
  );
}

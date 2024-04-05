import { faChevronDown, faFileCsv, faPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "../../../../common/components/button/button";
import { Dropdown, DropdownItemProps } from "../../../../common/components/dropdown/dropdown";
import { ID } from "../../../../common/types";
import { UploadDividendModal } from "../upload-dividends/components/upload-dividends-modal";
import { DividendsList } from "./components/dividends-list";

interface DividendListSectionProps {
  companyId: ID | undefined;
}

export function DividendListSection({ companyId }: DividendListSectionProps) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const items = useMemo<DropdownItemProps[]>(() => {
    return [
      {
        key: "create",
        content: "Crear",
        onClick: () => navigate("add-dividend"),
        startContent: <FontAwesomeIcon icon={faPlus} />,
      },
      {
        key: "import",
        content: "Importar",
        onClick: () => setOpenModal(true),
        startContent: <FontAwesomeIcon icon={faFileCsv} />,
      },
    ];
  }, [navigate]);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3 className=" text-2xl mb-2">Dividendos pagados</h3>
        <Dropdown name="Add dividend menu" items={items}>
          <Button color="primary" variant="flat" endContent={<FontAwesomeIcon icon={faChevronDown} />}>
            Nuevo
          </Button>
        </Dropdown>
      </div>
      <DividendsList companyId={companyId} />
      {openModal && <UploadDividendModal companyId={companyId} onClose={() => setOpenModal(false)} />}
    </section>
  );
}

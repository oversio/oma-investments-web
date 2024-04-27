import {
  faChartLine,
  faChevronDown,
  faFileCsv,
  faPlus,
  faTableCells,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "../../../../common/components/button/button";
import { Dropdown, DropdownItemProps } from "../../../../common/components/dropdown/dropdown";
import { ID } from "../../../../common/types";
import { classMerge } from "../../../../common/utils/class-merge";
import { useGetDividendList } from "../../api/dividend-list/use-get-dividend-list";
import { DividendYearChart } from "../../components/dividend-year-chart";
import { UploadDividendModal } from "../upload-dividends/components/upload-dividends-modal";
import { DividendsList } from "./components/dividends-list";

interface DividendListSectionProps {
  companyId: ID | undefined;
  className?: string;
  hideActions?: boolean;
}
export const DEFAULT_DIVIDEND_LIST_PAGE_SIZE = 20;

export function DividendListSection({ companyId, className, hideActions }: DividendListSectionProps) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [viewAsTable, setViewAsTable] = useState(true);

  const { data, isLoading, isError } = useGetDividendList(companyId, 1, DEFAULT_DIVIDEND_LIST_PAGE_SIZE);

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
    <section className={classMerge("flex flex-col gap-3", className)}>
      <div className="flex justify-between items-center">
        <h3 className=" text-2xl mb-2">Dividendos pagados</h3>
        <div className="flex items-center justify-end gap-2">
          <Tooltip content="Cambiar visualización">
            <Button isIconOnly variant="flat" color="primary" onPress={() => setViewAsTable(s => !s)}>
              <FontAwesomeIcon icon={viewAsTable ? faChartLine : faTableCells} />
            </Button>
          </Tooltip>
          {!hideActions && (
            <Dropdown name="Add dividend menu" items={items}>
              <Button color="primary" variant="flat" endContent={<FontAwesomeIcon icon={faChevronDown} />}>
                Nuevo
              </Button>
            </Dropdown>
          )}
        </div>
      </div>

      {viewAsTable ? (
        <DividendsList data={data} isLoading={!companyId || isLoading || isError} />
      ) : (
        <DividendYearChart data={data} isLoading={!companyId || isLoading || isError} />
      )}

      {openModal && <UploadDividendModal companyId={companyId} onClose={() => setOpenModal(false)} />}
    </section>
  );
}

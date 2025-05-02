import { faChevronDown, faFileCsv, faPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { Outlet, useNavigate, useParams } from "react-router";

import { Button } from "../../../../common/components/button/button";
import { Dropdown, DropdownItemProps } from "../../../../common/components/dropdown/dropdown";
import { useGetDividendList } from "../../api/dividend-list/use-get-dividend-list";
import { DividendYearChart } from "../../components/dividend-year-chart";
import { DividendsList } from "./components/dividends-list";

export const DEFAULT_DIVIDEND_LIST_PAGE_SIZE = 10;

export function DividendListPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetDividendList(id, 1, DEFAULT_DIVIDEND_LIST_PAGE_SIZE);

  const items = useMemo<DropdownItemProps[]>(() => {
    return [
      {
        key: "create",
        content: "Crear",
        onClick: () => void navigate("new"),
        startContent: <FontAwesomeIcon icon={faPlus} />,
      },
      {
        key: "import",
        content: "Importar",
        onClick: () => void navigate("import"),
        startContent: <FontAwesomeIcon icon={faFileCsv} />,
      },
    ];
  }, [navigate]);

  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className=" text-2xl mb-2">Dividendos pagados</h3>
          <div className="flex items-center justify-end gap-2">
            <Dropdown name="Add dividend menu" items={items}>
              <Button color="primary" variant="flat" endContent={<FontAwesomeIcon icon={faChevronDown} />}>
                Nuevo
              </Button>
            </Dropdown>
          </div>
        </div>

        <div className="grid gap-2 xl:grid-cols-2">
          <DividendsList className="mb-2" companyId={id} />
          <DividendYearChart data={data} isLoading={!id || isLoading || isError} />
        </div>
      </section>
      <Outlet />
    </>
  );
}

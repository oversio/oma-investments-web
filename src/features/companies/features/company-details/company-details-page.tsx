import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import { Link } from "@nextui-org/react";
import { useParams } from "react-router";

import { IconButton } from "../../../../common/components/icon-button/icon-button";
import { Skeleton } from "../../../../common/components/skeleton/skeleton";
import { Timeline } from "../../../../common/components/timeline/timeline";
import { useGetCompany } from "../../api/company-details/use-get-company";
import { DividendsList } from "./components/dividends-list";

export function CompanyDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetCompany(id);

  const timelineItems =
    data?.relevantFacts.map(fact => ({
      date: fact.dateTime,
      description: fact.description,
    })) ?? [];

  return (
    <div>
      <div className="flex items-center mb-5 gap-3">
        <Link href="/companies">
          <IconButton tabIndex={-1} icon={faArrowLeft} />
        </Link>
        <h1 className=" text-3xl">
          {isLoading || isError ? <Skeleton className=" w-80 h-8" /> : data?.name}{" "}
          <span className=" uppercase">({data?.mnemonic})</span>
        </h1>
      </div>
      <p className="mb-7">{isLoading || isError ? <Skeleton className=" w-96 h-6" /> : data?.description}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <h3 className=" text-2xl mb-2">Dividendos pagados</h3>
          <DividendsList companyId={id} />
        </div>
        <div className=" flex flex-col">
          <h3 className=" text-2xl mb-2">Últimos hechos relevantes</h3>
          <div className="rounded-large overflow-scroll max-h-[75vh]">
            <Timeline items={timelineItems} />
          </div>
        </div>
      </div>
    </div>
  );
}

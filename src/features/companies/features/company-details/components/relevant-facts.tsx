import { faPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "../../../../../common/components/link/link";
import { Timeline } from "../../../../../common/components/timeline/timeline";
import { classMerge } from "../../../../../common/utils/class-merge";
import { useGetCompany } from "../../../api/get-company/use-get-company";

interface RelevantFactsProps {
  companyId?: string;
  className?: string;
}

export function RelevantFacts({ companyId, className }: RelevantFactsProps) {
  const { data } = useGetCompany(companyId);

  const timelineItems =
    data?.relevantFacts.map(fact => ({
      key: fact.id,
      date: fact.dateTime,
      description: fact.description,
    })) ?? [];

  return (
    <section className={classMerge(" flex flex-col gap-3", className)}>
      <div className="flex justify-between items-center">
        <h3 className=" text-2xl mb-2">Últimos hechos relevantes</h3>
        <Link
          to="relevant-fact"
          variant="flat"
          startContent={<FontAwesomeIcon icon={faPlus} />}
          color="primary"
        >
          Agregar nuevo
        </Link>
      </div>
      <div className="rounded-large overflow-scroll">
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
}

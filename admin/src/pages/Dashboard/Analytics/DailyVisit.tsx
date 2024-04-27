import React from "react";
import { Info } from "lucide-react";
import { DailyDWChart } from "./Charts";
import { Link } from "react-router-dom";

const DailyDWStats = () => {
  return (
    <React.Fragment>
      <div className="order-10 col-span-12 2xl:order-1 card 2xl:col-span-4">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-3">
            <h6 className="text-15 grow">
              Daily Deposit/Withdrawal Stats{" "}
              <Link
                to="#!"
                data-tooltip="default"
                data-tooltip-content="Analyst or business user discovering a pattern in data or a relationship between variables"
                className="inline-block align-middle ltr:ml-1 rtl:mr-1 text-slate-500 dark:text-zink-200"
              >
                <Info className="size-4"></Info>
              </Link>
            </h6>
          </div>
          <DailyDWChart
            chartId="dailyDWStats"
            data-chart-colors='["bg-green-500", "bg-purple-500"]'
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DailyDWStats;

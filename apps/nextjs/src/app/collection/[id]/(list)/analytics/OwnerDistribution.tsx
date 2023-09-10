"use client";

import { Progress } from "@/app/_components/ui/progress";
import PieChart from "@/app/homepages/realms-adventurers/components/PieChart";

export const OwnerDistribution = ({
  ownersDistribution,
}: {
  ownersDistribution: { tokenCount: number; ownerCount: number }[];
}) => {
  const tokenRanges = [
    { min: 0, max: 1 },
    { min: 2, max: 3 },
    { min: 4, max: 10 },
    { min: 11, max: 25 },
    { min: 26, max: 50 },
    { min: 51, max: 100000 },
  ];

  const totalOwners = ownersDistribution.reduce(
    (sum, { ownerCount }) => sum + ownerCount,
    0,
  );

  const ownerCountsByTokenRange = tokenRanges.map(({ min, max }) =>
    ownersDistribution
      .filter(({ tokenCount }) => tokenCount >= min && tokenCount <= max)
      .reduce((sum, { ownerCount, tokenCount }) => sum + ownerCount, 0),
  );

  return (
    <div>
      <div className="mb-4 flex items-end justify-between">
        <h4 className="mb-0">Owner Distribution</h4>
        <span className="mb-2 text-sm">{totalOwners}</span>
      </div>

      {ownerCountsByTokenRange.map((amount, index) => {
        const ownerPercentage = (amount / totalOwners) * 100;
        const range = tokenRanges[index];
        const { min, max } = range;

        const rangeLabel =
          index > 0 && index + 1 !== tokenRanges.length
            ? `${min}-${max}`
            : `${min}+`;

        const pluralSuffix = index > 0 ? "s" : "";

        return (
          <div className="mb-3" key={max}>
            <p className="pb-1">
              {rangeLabel} item{pluralSuffix}: {ownerPercentage.toFixed(1)}%
            </p>
            <Progress value={ownerPercentage} />
          </div>
        );
      })}
    </div>
  );
};

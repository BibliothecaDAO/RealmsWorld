import { isMatch, Link, useMatches } from "@tanstack/react-router";

export const Breadcrumbs = () => {
  const matches = useMatches();
  if (matches.some((match) => match.status === "pending")) return null;

  const matchesWithCrumbs = matches.filter((match) =>
    isMatch(match, "loaderData.crumb"),
  );

  return (
    <nav className="hidden min-w-0 sm:block">
      <ul className="flex items-center gap-2 whitespace-nowrap">
        {matchesWithCrumbs.map((match, i) => (
          <li key={match.id} className="flex gap-2">
            <Link className="text-primary" from={match.fullPath}>
              {match.loaderData?.crumb}
            </Link>
            {i + 1 < matchesWithCrumbs.length ? (
              <span className="">{">"}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
};

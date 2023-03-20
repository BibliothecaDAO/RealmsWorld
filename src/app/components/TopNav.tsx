import Link from "next/link";
import Profile from "./LoginButton";
import { Input } from "postcss";

export const TopNav = () => {
  return (
    <div className="relative w-full p-3 pl-4 sm:pl-8 md:pl-32 z-100">
      <div className="flex justify-between ">
        <Link
          className="self-center text-xl font-semibold sm:text-2xl"
          href="/"
        >
          Relic{" "}
        </Link>
        <div className={`w-3/4 sm:w-96 self-center`}>
          <input
            type={"text"}
            placeholder={"Search"}
            className="w-full px-2 py-2 text-sm leading-tight text-white border rounded shadow appearance-none sm:px-3 sm:py-4 sm:text-base focus:outline-none focus:shadow-outline "
          />
        </div>

        <Profile />
      </div>
    </div>
  );
};

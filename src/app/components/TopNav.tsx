import Link from "next/link";
import Profile from "./LoginButton";
import { Input } from "postcss";

export const TopNav = () => {
  return (
    <div className="w-full p-3 pl-32">
      <div className="flex justify-between ">
        <Link className="self-center text-2xl font-semibold" href="/">
          Relic{" "}
        </Link>
        <div className={`w-96 self-center`}>
          <input
            type={"text"}
            placeholder={"Search"}
            className="w-full px-3 py-4 leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline "
          />
        </div>

        <Profile />
      </div>
    </div>
  );
};

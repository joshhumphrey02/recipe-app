import { Bookmark, Search } from "lucide-react";
import { Toggle } from "../theme/toggle";
import Link from "next/link";

export function Header() {
  return (
    <header className=" text-white flex gap-4 justify-between">
      <Link href={"/"}>
        <h1 className=" text-green-500 uppercase text-2xl md:text-4xl font-bold">
          Recipy
        </h1>
      </Link>
      {/* <div className=" w-40 h-16 overflow-hidden">
        <img
          src={"/small-logo.png"}
          alt="logo"
          className=" w-full h-full object-cover"
        />
      </div> */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center border-2 shadow backdrop-blur-sm border-border rounded-full py-2 px-4">
          <span>
            <Search className="w-4 h-4" />
          </span>
          <input
            className="flex-1 focus-visible:outline-none"
            type="search"
            placeholder="Search"
          />
        </div>
        <Toggle />
        <span className=" p-3 rounded-full border border-border">
          <Bookmark className="w-4 h-4 " />
        </span>
      </div>
    </header>
  );
}

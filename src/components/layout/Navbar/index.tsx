/* eslint-disable @next/next/no-img-element */
import Navigations from "~/constants/nav";
import { useRouter } from "next/router";
import React from "react";
import { PUBLIC } from "~/constants/common";
import { Hamburger } from "~/constants/svg";
import Drawer from "~/components/drawer";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <div className="flex items-center justify-between sm:justify-start">
          <ul className="ml-2  hidden flex-wrap gap-3 sm:inline-flex">
            {Navigations.map(({ path, title, Icon }, index) => (
              <li className="p-2" key={`${title || "nav"}-#${index}`}>
                <a
                  onClick={() => void router.push(`${path || ""}`)}
                  className={` ${
                    router.pathname === path ||
                    router.pathname === `/${PUBLIC}${path || ""}`
                      ? "font-bold"
                      : ""
                  } inline-flex gap-3 align-top text-sm transition ease-in-out hover:scale-105 hover:cursor-pointer`}
                >
                  <Icon className="h-5 w-5" />
                  {title}
                </a>
              </li>
            ))}
          </ul>

          {/* Show the hamburger icon on mobile screens */}
          <button className="ml-3 sm:hidden" onClick={() => setIsOpen(true)}>
            <Hamburger className="h-6 w-6 fill-current text-white" />
          </button>
        </div>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;

{
  /* WIP
  import { UserCircleIcon, HomeIcon } from "@heroicons/react/24/solid";

  import { signIn, signOut, useSession } from "next-auth/react";

          const { data: sessionData, status } = useSession();

      <div className="flex flex-row justify-center gap-2 align-middle">
        {sessionData && status === "authenticated" ? (
          <>
            <div
              className="cursor-pointer flex-col text-right"
              onClick={() => void signOut()}
            >
              <h3>{sessionData.user.name}</h3>
              <p style={{ fontSize: 13 }} className="font-thin">
                {sessionData.user.email}
              </p>
            </div>
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-25 rounded-full">
                <img
                  src={sessionData.user.image || ""}
                  alt={sessionData.user.image || "user-image"}
                />
              </div>
            </label>
          </>
        ) : (
          <button
            onClick={() => void signIn()}
            className="flex items-center justify-center rounded-md p-2 transition ease-in-out hover:scale-105"
          >
            <UserCircleIcon className="mr-2 h-6 w-6" />
            Login
          </button>
        )}
      </div> */
}

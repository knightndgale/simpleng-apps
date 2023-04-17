/* eslint-disable @next/next/no-img-element */
import { UserCircleIcon, HomeIcon } from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const tabs = [
  ["Robofriends", "/robofriends"],
  ["Notetaker", "/notetaker"],
  ["FaceAI", "/face-ai"],
  ["Weather", "/#"],
  ["News", "/#"],
  ["Snake", "/#"],
  ["CSV to JSON", "/#"],
  ["DTR Encode", "/#"],
  ["More...", "/#"],
];

const Navbar = () => {
  const router = useRouter();

  const { data: sessionData, status } = useSession();

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <div className="tabs gap-3">
          <a
            onClick={() => void router.push(`/`)}
            className={`tab  transition ease-in-out hover:scale-105`}
          >
            <HomeIcon className=" h-6 w-6 " color="white" />
          </a>

          {tabs.map(([title, path], index) => (
            //? Why router push has void
            //* router.push returns a promise
            //* Read documentation: https://nextjs.org/docs/api-reference/next/router#potential-eslint-errors
            <a
              key={`${title || "nav"}-#${index}`}
              onClick={() => void router.push(`${path || ""}`)}
              className={`tab text-indigo-100 ${
                router.pathname === path ? "font-bold" : ""
              } transition ease-in-out hover:scale-105`}
            >
              {title}
            </a>
          ))}
        </div>
      </div>

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
      </div>
    </div>
  );
};

export default Navbar;

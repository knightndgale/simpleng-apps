import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React from "react";
import { PUBLIC } from "~/constants/common";
import Navigations from "~/constants/nav";

const Drawer: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();

  return (
    <main
      className={
        " fixed inset-0 z-10 transform  bg-gray-900 bg-opacity-25 ease-in-out " +
        (isOpen
          ? " translate-x-0 opacity-100 transition-opacity duration-500  "
          : " translate-x-full opacity-0 transition-all delay-500  ")
      }
    >
      <section
        className={
          " delay-400 absolute right-0 h-full w-screen max-w-lg transform bg-primary shadow-xl transition-all duration-500 ease-in-out  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative flex h-full w-screen max-w-lg flex-col space-y-2 pb-10">
          <div className="h-15 flex justify-end p-3">
            <button
              className=" rounded-full bg-primary p-2 transition ease-in-out hover:bg-secondary-content"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className="h-5 w-5 " />
            </button>
          </div>
          <div className={"flex flex-col"}>
            {Navigations.map(({ path, title, Icon }, index) => (
              <div
                onClick={() => {
                  void router.push(`${path || ""}`);
                  setIsOpen(false);
                }}
                key={`${title || "nav"}-#${index}`}
                className={`w-full py-3 pl-5 transition ease-in-out hover:cursor-pointer hover:bg-secondary-content ${
                  router.pathname === path ||
                  router.pathname === `/${PUBLIC}${path || ""}`
                    ? "bg-primary-focus"
                    : ""
                } `}
              >
                <a
                  className={` text-indigo-100  ${
                    router.pathname === path ||
                    router.pathname === `/${PUBLIC}${path || ""}`
                      ? "font-bold"
                      : ""
                  }  inline-flex gap-3 align-top text-sm`}
                >
                  <Icon className="h-5 w-5" color="white" />
                  {title}
                </a>
              </div>
            ))}
          </div>
        </article>
      </section>
      <section
        className=" h-full w-screen cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};

export default Drawer;

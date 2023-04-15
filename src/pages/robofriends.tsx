/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { type User } from "@prisma/client";

import { api } from "~/utils/api";

export type UserWithoutEmail = Omit<User, "email">;
const Robofriends = () => {
  const { data: sessionData, status: sessionStatus } = useSession();
  const [users, setUsers] = useState<UserWithoutEmail[]>([]);
  const [userSearch, setUserSearch] = useState("");

  const { data: userData } = api.user.getAll.useQuery(undefined, {
    enabled: sessionStatus === "authenticated" && !userSearch,
    onSuccess: (data: UserWithoutEmail[]) => {
      if (!userSearch) setUsers(data);
    },
  });

  const handleSearchChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearch(target.value);
    if (target.value) {
      const newUsers = users.filter((user) =>
        user.name?.toLowerCase().includes(target.value.toLowerCase())
      );
      return setUsers(newUsers);
    }
    setUsers(userData || []);
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-1">
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            placeholder="Search"
            value={userSearch}
            onChange={handleSearchChange}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="divider"></div>

        {sessionData ? (
          <div className="flex flex-col items-center justify-center">
            <div className="avatar">
              <div
                className="w-24 rounded-full bg-secondary-content"
                // style={{ backgroundColor: randomColor() }}
              >
                <img
                  src={`https://robohash.org/${sessionData.user.name}`}
                  alt={sessionData.user.name || "robofriend-profile"}
                />
              </div>
            </div>

            <article className="prose flex flex-col items-center  justify-center text-center">
              <p className="mt-5 leading-tight">
                <strong>{sessionData.user.name} </strong>
                <br />
                {sessionData.user.email}
              </p>
            </article>
          </div>
        ) : (
          sessionStatus === "loading" && <RobofriendProfileCardSkeleton />
        )}
      </div>
      <div className="col-span-3 pl-3">
        <div className="flex flex-wrap gap-3">
          {users.length > 0 && sessionStatus === "authenticated"
            ? users.map((user, index) => (
                <div
                  key={`robocards-${index}`}
                  className="h-75 card w-60 rounded-lg bg-secondary shadow-lg transition ease-in-out hover:-translate-y-1  hover:scale-105"
                  // style={{ backgroundColor: randomColor() }}
                >
                  <figure className="px-10 pt-10">
                    <div className="avatar">
                      <div
                        className="w-24 rounded-full  bg-secondary-content"
                        // style={{ backgroundColor: randomColor() }}
                      >
                        <img
                          src={`https://robohash.org/${user.name}`}
                          alt={user.name || "robofriend-friend"}
                        />
                      </div>
                    </div>
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{user.name}</h2>
                  </div>
                </div>
              ))
            : sessionStatus === "loading" &&
              [1, 2, 3, 4, 5].map((_, index) => (
                <RobofriendCardSkeleton key={`robocards-skeleton-${index}`} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Robofriends;

export const RobofriendCardSkeleton: React.FC = () => (
  <div className="h-100 card w-60 animate-pulse rounded-lg bg-gray-200 shadow-lg ">
    <figure className=" animate-pulse  bg-gray-300  px-10 pt-10">
      <div className="avatar animate-pulse bg-gray-300 ">
        <div className="w-24 rounded-full  bg-gray-500 "></div>
      </div>
    </figure>
    <div className="card-body animate-pulse items-center bg-gray-300 text-center">
      <div className="mb-2 h-3 w-40 rounded bg-gray-400"></div>
    </div>
  </div>
);

export const RobofriendProfileCardSkeleton: React.FC = () => (
  <div className="w-100 h-125 flex  animate-pulse  flex-col items-center justify-center rounded-lg bg-gray-300 pb-20 ">
    <figure className=" animate-pulse   px-10 pt-10">
      <div className="avatar animate-pulse bg-gray-300 ">
        <div className="w-24 rounded-full  bg-gray-500 "></div>
      </div>
    </figure>
    <div className="mt-5 animate-pulse items-center bg-gray-300 text-center">
      <div className="mb-2 h-3 w-40 rounded bg-gray-500"></div>
      <div className="mb-2 h-3 w-40 rounded bg-gray-400"></div>
    </div>
  </div>
);

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "~/store/root.store";

import { setRobots, searchRobots, setUser } from "~/reducers/public.reducer";
import { getServerSession } from "next-auth";
import { type GetServerSideProps, type GetServerSidePropsContext } from "next";
import { authOptions } from "~/server/auth";
import { type Robot } from "~/types/robofriends.types";
import {
  RobofriendCardSkeleton,
  RobofriendProfileCardSkeleton,
} from "../robofriends";
import { generateUser, getRobots } from "~/utils/generateRandomData";
import MainContainer from "~/components/layout/MainContainer";
import SideContent from "~/components/layout/SideContent";
import Content from "~/components/layout/Content";

const Robofriends = () => {
  const dispatch = useDispatch();

  const robots = useSelector((state: RootState) => state.publicStore.robots);
  const user = useSelector((state: RootState) => state.publicStore.user);

  const [currentRobots, setCurrentRobots] = useState<Robot[]>(robots);

  const handleSearchChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRobots(currentRobots));
    if (target.value) dispatch(searchRobots(target.value));
  };

  const generateRoboFriendData = () => {
    const generatedRobots = getRobots();
    const generatedUser = generateUser();

    dispatch(setRobots(generatedRobots));
    dispatch(setUser(generatedUser));

    setCurrentRobots(generatedRobots);
  };

  useEffect(() => {
    if (robots.length < 1 || !user) {
      return generateRoboFriendData();
    }
  }, []);

  return (
    <MainContainer>
      <SideContent>
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-primary-focus focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
            placeholder="Search"
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

        {user && (
          <div className="flex flex-col items-center justify-center ">
            <div className="avatar">
              <div className="w-24 rounded-full bg-primary-content">
                <img
                  loading="lazy"
                  src={`https://robohash.org/${user.name || "simpleng-apps"})
                  }`}
                  alt={user.name || "robofriend-profile"}
                />
              </div>
            </div>

            <article className="prose  flex flex-col items-center  justify-center text-center">
              <p className="mt-5 leading-tight ">
                <strong>{user.name} </strong>
                <br />
                {user.email}
              </p>
            </article>
          </div>
        )}
      </SideContent>

      <Content>
        <div className={" flex flex-wrap gap-3 "}>
          {robots.length > 0 &&
            robots.map((robot, index) => (
              <div
                key={`robocards-${index}`}
                className="  w-full sm:w-full md:w-5/12 lg:w-2/5 xl:w-1/5"
              >
                <div className="card h-full rounded-lg bg-secondary shadow-lg transition ease-in-out hover:-translate-y-1  hover:scale-105">
                  <figure className="px-10 pt-10">
                    <div className="avatar">
                      <div className="w-24 rounded-full bg-primary-content">
                        <img
                          loading="lazy"
                          src={`https://robohash.org/${robot.name || ""}`}
                          alt={robot.name || "robofriend-friend"}
                        />
                      </div>
                    </div>
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title text-secondary-content">
                      {robot.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Content>
    </MainContainer>
  );
};

export default Robofriends;

//* Documentation
//* https://next-auth.js.org/tutorials/securing-pages-and-api-routes#server-side
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/robofriends",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

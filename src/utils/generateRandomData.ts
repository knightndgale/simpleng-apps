import { faker } from "@faker-js/faker";
import { type User } from "@prisma/client";
import { type Robot } from "~/types/robofriends.types";

export const generateUser = (): Partial<Pick<User, "email" | "name">> => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
  };
};

export const generateName = (): Robot => {
  return {
    name: faker.name.fullName(),
  };
};

export const getRobots = (length = 10): Robot[] =>
  Array.from({ length }).map(generateName);

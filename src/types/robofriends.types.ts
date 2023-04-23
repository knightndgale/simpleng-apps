import { type User, type Note } from "@prisma/client";

export interface PublicReduxInterface {
  robots: Robot[];
  topics: Topic[];
  user: Partial<Pick<User, "email" | "name">>;
}

export type Topic = {
  title: string;
  note: Pick<Note, "title" | "content">[];
};

export type Robot = {
  name: string;
};

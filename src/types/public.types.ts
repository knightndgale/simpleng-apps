import { type Note, type User } from "@prisma/client";
import { type Clarifai } from "./clarifai.types";
import { type Robot } from "./robofriends.types";

export interface PublicReduxInterface {
  robots: Robot[];
  topics: Topic[];
  user: Partial<Pick<User, "email" | "name">> | undefined;
  clarifai: Clarifai;
}

export type Topic = {
  id: string;
  title: string;
  note: Notes[];
};

export type Notes = Pick<Note, "title" | "content" | "id">;

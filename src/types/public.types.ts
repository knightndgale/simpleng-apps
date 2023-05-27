import { type Note as PrismaNote, type User } from "@prisma/client";
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
  note: Note[];
};

export type EditNote = {
  topicId: string;
  note: Note;
};

export type Note = Pick<PrismaNote, "title" | "content" | "id">;

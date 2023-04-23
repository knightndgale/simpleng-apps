export interface PublicReduxInterface {
  robots: Robot[];
  notes: Note[];
  user: Partial<User>;
}

export type Note = {
  title: string;
  topics: Topic[];
};

export type Topic = {
  title: string;
  content: string;
};

export type Robot = {
  name: string;
};

export type User = {
  name: string;
  email: string;
};

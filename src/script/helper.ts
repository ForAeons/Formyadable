export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
}

export interface Thread {
  id: number;
  user: User;
  topic: Topic;
  content: string;
  comments: Comment[];
  dateCreated: Date;
}

export interface Comment {
  id: number;
  user: User;
  topic: Topic;
  content: string;
  dateCreated: Date;
}

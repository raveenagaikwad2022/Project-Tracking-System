export interface UserState {
  id: string;
  username: string;
  token: string;
  role: string;
}

export type BugPriority = "low" | "medium" | "high";

export interface User {
  id: string;
  username: string;
  role: string;
}

export interface ProjectMember {
  id: number;
  joinedAt: Date;
  member: User;
}

export interface ProjectState {
  id: string;
  name: string;
  members: ProjectMember[];
  bugs: Array<{ id: string }>;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface BugState {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: BugPriority;
  isResolved: boolean;
  createdBy: User;
  updatedBy?: User;
  closedBy?: User;
  reopenedBy?: User;
  closedAt?: Date;
  reopenedAt?: Date;
  updatedAt?: Date;
  createdAt: Date;
}

export type ProjectSortValues =
  | "newest"
  | "oldest"
  | "a-z"
  | "z-a"
  | "most-bugs"
  | "least-bugs"
  | "most-members"
  | "least-members";

export type BugSortValues =
  | "newest"
  | "oldest"
  | "a-z"
  | "z-a"
  | "closed"
  | "reopened"
  | "h-l"
  | "l-h"
  | "updated"
  | "most-notes"
  | "least-notes";

export type BugFilterValues = "all" | "closed" | "open";

export interface CredentialsPayload {
  username: string;
  password: string;
  role: string;
}

export interface CredentialsPayloadLogin {
  username: string;
  password: string;
}

export interface ProjectPayload {
  name: string;
  members: string[];
}

export interface BugPayload {
  title: string;
  description: string;
  priority: BugPriority;
}

export interface EditedBugData extends BugPayload {
  updatedAt: Date;
  updatedBy: User;
}

export interface ClosedReopenedBugData {
  isResolved: boolean;
  closedAt: Date;
  closedBy: User;
  reopenedAt: Date;
  reopenedBy: User;
}

export interface NotifPayload {
  message: string;
  type: "success" | "error";
}

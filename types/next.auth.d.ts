import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
}

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { type User } from "@prisma/client";
export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({});
    const currentUser = ctx.session?.user;

    // Filter out the current user from the list of all users
    const otherUsers = users.filter(
      (user: User) => user.id !== currentUser?.id
    );

    // Remove email addresses from all users
    const sanitizedUsers = otherUsers.map((user: Partial<User>) => {
      delete user?.email;
      return user;
    });

    return sanitizedUsers;
  }),
});

import { db } from "@/lib/db";
import { ServerResponse } from "@/types/server-response";
import { User } from "@prisma/client";

export class UserRepo {
  static async getUserById(id: string): Promise<ServerResponse<User | null>> {
    try {
      const user = await db.user.findUnique({ where: { id } });
      return { status: "success", data: user };
    } catch {
      return { status: "error", message: "Failed to get user" };
    }
  }
  static async updateUser(
    id: string,
    user: Partial<User>
  ): Promise<ServerResponse<User>> {
    try {
      const updatedUser = await db.user.update({
        where: { id },
        data: user,
      });
      return { status: "success", data: updatedUser };
    } catch {
      return { status: "error", message: "Failed to update user" };
    }
  }
}

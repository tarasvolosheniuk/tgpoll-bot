import { getTodayDate } from "../utils/dates";
import { prisma } from "./client";

export class PollResult {
  static async getAll(groupId: bigint) {
    return prisma.pollResult.findMany({
      where: { groupId },
    });
  }

  static async create(groupId: bigint, userId: bigint) {
    return prisma.pollResult.create({
      data: {
        groupId,
        userId,
        createdAt: getTodayDate(),
      },
    });
  }

  static async findToday(groupId: bigint) {
    return prisma.pollResult.findMany({
      where: {
        groupId,
        createdAt: getTodayDate(),
      },
    });
  }
}

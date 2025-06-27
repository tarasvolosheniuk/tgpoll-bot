import { PollResult } from '../../src/db/PollResult';
import { prisma } from '../../src/db/client';

jest.mock('../../src/db/client', () => ({
  prisma: {
    pollResult: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('PollResult db access class', () => {
  const groupId = BigInt(123);
  const userId = BigInt(456);
  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAll should return all poll results for groupId', async () => {
    const mockResult = [{ id: 1, groupId, userId, createdAt: today }];
    (prisma.pollResult.findMany as jest.Mock).mockResolvedValue(mockResult);

    const result = await PollResult.getAll(groupId);

    expect(prisma.pollResult.findMany).toHaveBeenCalledWith({
      where: { groupId },
    });
    expect(result).toEqual(mockResult);
  });

  it('create should store createdAt as date only (YYYY-MM-DD)', async () => {
    (prisma.pollResult.create as jest.Mock).mockImplementation(({ data }) => ({
      id: 1,
      ...data,
    }));

    const result = await PollResult.create(groupId, userId);

    expect(prisma.pollResult.create).toHaveBeenCalledWith({
      data: {
        groupId,
        userId,
        createdAt: today,
      },
    });

    expect(result.createdAt).toEqual(today);
  });

  it('findToday should query createdAt using date only', async () => {
    const mockResult = [{ id: 1, groupId, userId, createdAt: today }];
    (prisma.pollResult.findMany as jest.Mock).mockResolvedValue(mockResult);

    const result = await PollResult.findToday(groupId);

    expect(prisma.pollResult.findMany).toHaveBeenCalledWith({
      where: {
        groupId,
        createdAt: today,
      },
    });

    expect(result).toEqual(mockResult);
  });
});

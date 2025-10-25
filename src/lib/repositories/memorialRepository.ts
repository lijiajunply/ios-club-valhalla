import { PrismaClient, Memorial } from '@prisma/client';

const prisma = new PrismaClient();

export class MemorialRepository {
  // 获取所有英灵
  async getAll(): Promise<Memorial[]> {
    return prisma.memorial.findMany({
      orderBy: {
        id: 'asc'
      }
    });
  }

  // 根据ID获取英灵
  async getById(id: number): Promise<Memorial | null> {
    return prisma.memorial.findUnique({
      where: { id }
    });
  }

  // 创建新的英灵
  async create(data: Omit<Memorial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Memorial> {
    return prisma.memorial.create({
      data
    });
  }

  // 更新英灵信息
  async update(id: number, data: Partial<Omit<Memorial, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Memorial> {
    return prisma.memorial.update({
      where: { id },
      data
    });
  }

  // 删除英灵
  async delete(id: number): Promise<Memorial> {
    return prisma.memorial.delete({
      where: { id }
    });
  }

  // 检查是否已存在初始数据
  async count(): Promise<number> {
    return prisma.memorial.count();
  }
}
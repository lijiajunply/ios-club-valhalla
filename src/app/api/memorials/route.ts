import { NextResponse } from 'next/server';
import { MemorialRepository } from '@/lib/repositories/memorialRepository';

const memorialRepository = new MemorialRepository();

// GET /api/memorials - 获取所有英灵
export async function GET() {
  try {
    const memorials = await memorialRepository.getAll();
    return NextResponse.json(memorials);
  } catch (error) {
    console.error('Failed to fetch memorials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch memorials' },
      { status: 500 }
    );
  }
}

// POST /api/memorials - 创建新的英灵
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, name, description } = body;

    // 验证必需字段
    if (!title || !name || !description) {
      return NextResponse.json(
        { error: 'Title, name, and description are required' },
        { status: 400 }
      );
    }

    const memorial = await memorialRepository.create({
      title,
      name,
      description
    });

    return NextResponse.json(memorial, { status: 201 });
  } catch (error) {
    console.error('Failed to create memorial:', error);
    return NextResponse.json(
      { error: 'Failed to create memorial' },
      { status: 500 }
    );
  }
}
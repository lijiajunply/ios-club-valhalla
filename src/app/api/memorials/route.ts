import { NextResponse } from 'next/server';
import { MemorialRepository } from '@/lib/repositories/memorialRepository';
import { Tag } from '@prisma/client';
import { isAuthenticated } from '@/lib/services/authService';

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
  // 检查用户是否已认证
  if (!(await isAuthenticated(request))) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { title, name, description, deed, tags } = body;

    // 验证必需字段
    if (!title || !name || !description) {
      return NextResponse.json(
        { error: 'Title, name, and description are required' },
        { status: 400 }
      );
    }

    // 验证标签值是否有效
    if (tags && Array.isArray(tags)) {
      const validTags = Object.values(Tag);
      const invalidTags = tags.filter(tag => !validTags.includes(tag));
      if (invalidTags.length > 0) {
        return NextResponse.json(
          { error: `Invalid tags: ${invalidTags.join(', ')}` },
          { status: 400 }
        );
      }
    }

    const memorial = await memorialRepository.create({
      title,
      name,
      description,
      deed: deed || null,
      tags: tags || []
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
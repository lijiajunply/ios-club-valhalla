import { NextResponse } from 'next/server';
import { MemorialRepository } from '@/lib/repositories/memorialRepository';
import { Tag } from '@prisma/client';

const memorialRepository = new MemorialRepository();

// GET /api/memorials/[id] - 根据ID获取英灵
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // 处理 Next.js 15 中 params 可能是 Promise 的情况
    const resolvedParams = params instanceof Promise ? await params : params;
    const id = parseInt(resolvedParams.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const memorial = await memorialRepository.getById(id);
    if (!memorial) {
      return NextResponse.json(
        { error: 'Memorial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(memorial);
  } catch (error) {
    console.error('Failed to fetch memorial:', error);
    return NextResponse.json(
      { error: 'Failed to fetch memorial' },
      { status: 500 }
    );
  }
}

// PUT /api/memorials/[id] - 更新英灵信息
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // 处理 Next.js 15 中 params 可能是 Promise 的情况
    const resolvedParams = params instanceof Promise ? await params : params;
    const id = parseInt(resolvedParams.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, name, description, deed, tags } = body;

    // 检查英灵是否存在
    const existingMemorial = await memorialRepository.getById(id);
    if (!existingMemorial) {
      return NextResponse.json(
        { error: 'Memorial not found' },
        { status: 404 }
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

    // 更新英灵信息
    const updatedMemorial = await memorialRepository.update(id, {
      title,
      name,
      description,
      deed: deed || null,
      tags: tags || []
    });

    return NextResponse.json(updatedMemorial);
  } catch (error) {
    console.error('Failed to update memorial:', error);
    return NextResponse.json(
      { error: 'Failed to update memorial' },
      { status: 500 }
    );
  }
}

// DELETE /api/memorials/[id] - 删除英灵
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // 处理 Next.js 15 中 params 可能是 Promise 的情况
    const resolvedParams = params instanceof Promise ? await params : params;
    const id = parseInt(resolvedParams.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    // 检查英灵是否存在
    const existingMemorial = await memorialRepository.getById(id);
    if (!existingMemorial) {
      return NextResponse.json(
        { error: 'Memorial not found' },
        { status: 404 }
      );
    }

    // 删除英灵
    await memorialRepository.delete(id);

    return NextResponse.json({ message: 'Memorial deleted successfully' });
  } catch (error) {
    console.error('Failed to delete memorial:', error);
    return NextResponse.json(
      { error: 'Failed to delete memorial' },
      { status: 500 }
    );
  }
}
// 服务层：处理与英灵相关的业务逻辑

// 获取所有英灵
import {Memorial} from "@prisma/client";

export async function getMemorials(): Promise<Memorial[]> {
  try {
    const response = await fetch('/api/memorials');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch memorials:', error);
    throw error;
  }
}

// 获取单个英灵
export async function getMemorialById(id: number): Promise<Memorial> {
  try {
    const response = await fetch(`/api/memorials/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('英灵未找到');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch memorial:', error);
    throw error;
  }
}

// 创建新的英灵
export async function createMemorial(data: { title: string; name: string; description: string }) {
  try {
    const response = await fetch('/api/memorials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create memorial:', error);
    throw error;
  }
}

// 更新英灵信息
export async function updateMemorial(id: number, data: { title: string; name: string; description: string }) {
  try {
    const response = await fetch(`/api/memorials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update memorial:', error);
    throw error;
  }
}

// 删除英灵
export async function deleteMemorial(id: number) {
  try {
    const response = await fetch(`/api/memorials/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to delete memorial:', error);
    throw error;
  }
}
// 服务层：处理与英灵相关的业务逻辑

// 获取所有英灵
import {Memorial, Tag} from "@prisma/client";
import { getClientAuthToken, isClientAuthenticated } from "./authService";

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
export async function createMemorial(data: { title: string; name: string; description: string; deed?: string; tags?: Tag[] }) {
  // 检查客户端是否已认证
  if (!isClientAuthenticated()) {
    throw new Error('用户未登录');
  }

  const authToken = getClientAuthToken();
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // 如果提供了认证令牌，则添加到请求头中
    if (authToken) {
      headers['Authorization'] = `Basic ${authToken}`;
    }
    
    const response = await fetch('/api/memorials', {
      method: 'POST',
      headers,
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
export async function updateMemorial(id: number, data: { title: string; name: string; description: string; deed?: string; tags?: Tag[] }) {
  // 检查客户端是否已认证
  if (!isClientAuthenticated()) {
    throw new Error('用户未登录');
  }

  const authToken = getClientAuthToken();

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // 如果提供了认证令牌，则添加到请求头中
    if (authToken) {
      headers['Authorization'] = `Basic ${authToken}`;
    }
    
    const response = await fetch(`/api/memorials/${id}`, {
      method: 'PUT',
      headers,
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
  // 检查客户端是否已认证
  if (!isClientAuthenticated()) {
    throw new Error('用户未登录');
  }

  const authToken = getClientAuthToken();

  try {
    const headers: Record<string, string> = {};
    
    // 如果提供了认证令牌，则添加到请求头中
    if (authToken) {
      headers['Authorization'] = `Basic ${authToken}`;
    }
    
    const response = await fetch(`/api/memorials/${id}`, {
      method: 'DELETE',
      headers,
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
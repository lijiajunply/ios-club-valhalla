import { NextResponse } from 'next/server';

// 这个API路由处理OAuth2回调
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  // 在实际应用中，你可能需要在这里处理回调逻辑
  // 但在这个实现中，我们将在客户端处理回调以保持简单
  
  if (code) {
    // 重定向回登录页面，让客户端处理回调
    const redirectUrl = `/login?code=${code}${state ? `&state=${state}` : ''}`;
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  
  return NextResponse.redirect(new URL('/login', request.url));
}
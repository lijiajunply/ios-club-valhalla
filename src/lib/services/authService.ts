// 认证服务：处理用户身份验证逻辑

// 简单的身份验证函数 - 预留位置，后续可以扩展为真实的认证逻辑
export async function authenticate(username: string, password: string): Promise<boolean> {
    // 当前只是一个占位符实现，只要提供了用户名和密码就返回true
    // 后续可以替换为数据库查询、JWT令牌等真实认证逻辑
    if (username === 'iOS Club of XAUAT' && password === '2019090108') {
        console.log(`User ${username} authenticated`);
        const credentials = btoa(`${username}:${password}`);
        localStorage.setItem("authToken", credentials);
        return true;
    }
    return false;
}

// 验证请求是否有权限访问资源
export async function isAuthenticated(request: Request): Promise<boolean> {
    // 从请求头中获取认证信息
    const authHeader = request.headers.get('authorization');

    // 如果没有认证头，则未认证
    if (!authHeader) {
        return false;
    }

    // 解析Basic Auth格式的认证头
    if (authHeader.startsWith('Basic ')) {
        const encodedCredentials = authHeader.substring(6);
        const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
        const [username, password] = decodedCredentials.split(':');

        // 使用认证函数验证凭据
        return await authenticate(username, password);
    }

    // 不支持的认证类型
    return false;
}

// 客户端检查是否已登录
export function isClientAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
        const authToken = localStorage.getItem('authToken');
        return !!authToken;
    }
    return false;
}

// 获取客户端认证令牌
export function getClientAuthToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
}
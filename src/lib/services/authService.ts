// 认证服务：处理用户身份验证逻辑

// OAuth2配置
const OAUTH_CONFIG = {
    clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID || '',
    redirectUri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || 'http://localhost:3000/',
    authorizationEndpoint: process.env.NEXT_PUBLIC_OAUTH_AUTHORIZATION_ENDPOINT || '',
    tokenEndpoint: process.env.NEXT_PUBLIC_OAUTH_TOKEN_ENDPOINT || '',
    userInfoEndpoint: process.env.NEXT_PUBLIC_OAUTH_USER_INFO_ENDPOINT || '',
};

// 生成随机state参数用于防止CSRF攻击
function generateState(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// 重定向到OAuth2授权服务器
export function redirectToOAuth(): void {
    const state = generateState();
    localStorage.setItem('oauth_state', state);
    
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: OAUTH_CONFIG.clientId,
        redirect_uri: OAUTH_CONFIG.redirectUri,
        scope: 'openid profile email',
        state: state,
    });
    
    window.location.href = `${OAUTH_CONFIG.authorizationEndpoint}?${params.toString()}`;
}

// 处理OAuth2回调
export async function handleOAuthCallback(searchParams: URLSearchParams): Promise<boolean> {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const storedState = localStorage.getItem('oauth_state');
    
    // 验证state参数防止CSRF攻击
    if (!state || state !== storedState) {
        console.error('Invalid state parameter');
        return false;
    }
    
    // 清除state
    localStorage.removeItem('oauth_state');
    
    if (!code) {
        console.error('No authorization code received');
        return false;
    }
    
    try {
        // 用授权码换取访问令牌
        const tokenResponse = await fetch(OAUTH_CONFIG.tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: OAUTH_CONFIG.clientId,
                code: code,
                client_secret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET || '',
                redirect_uri: OAUTH_CONFIG.redirectUri,
            }),
        });
        
        if (!tokenResponse.ok) {
            throw new Error(`Token exchange failed: ${tokenResponse.statusText}`);
        }
        
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;
        
        // 获取用户信息
        const userResponse = await fetch(OAUTH_CONFIG.userInfoEndpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        
        if (!userResponse.ok) {
            throw new Error(`Failed to fetch user info: ${userResponse.statusText}`);
        }
        
        const userData = await userResponse.json();
        
        // 存储认证信息
        const authInfo = {
            accessToken,
            refreshToken: tokenData.refresh_token,
            expiresAt: Date.now() + (tokenData.expires_in * 1000),
            user: userData,
        };
        
        localStorage.setItem("authToken", JSON.stringify(authInfo));
        return true;
    } catch (error) {
        console.error('OAuth callback handling failed:', error);
        return false;
    }
}

// 验证请求是否有权限访问资源
export async function isAuthenticated(request: Request): Promise<boolean> {
    // 从请求头中获取认证信息
    let authHeader: string | null = null;
    
    // 兼容不同的 headers 访问方式
    if (typeof request.headers.get === 'function') {
        // 标准的 Headers 对象
        authHeader = request.headers.get('authorization');
    } else if (request.headers.hasOwnProperty('authorization')) {
        // 直接访问 headers 对象属性
        authHeader = (request.headers as unknown as Record<string, string>)['authorization'] || null;
    }

    // 如果没有认证头，则未认证
    if (!authHeader) {
        return false;
    }

    // 解析Basic Auth格式的认证头
    if (authHeader.startsWith('Basic ')) {
        const encodedCredentials = authHeader.substring(6);
        
        try {
            // 解析JWT令牌
            // JWT格式: header.payload.signature
            const tokenParts = encodedCredentials.split('.');
            
            if (tokenParts.length !== 3) {
                console.error('Invalid JWT format');
                return false;
            }
            
            // 解析payload部分（中间部分）
            // 注意：JWT中的base64可能缺少padding，需要添加
            const payload = tokenParts[1];
            const paddedPayload = payload.padEnd(payload.length + (4 - payload.length % 4) % 4, '=');
            const decodedPayload = Buffer.from(paddedPayload, 'base64').toString('utf-8');
            
            console.log('Decoded JWT payload:', decodedPayload);
            const data = JSON.parse(decodedPayload);
            
            // 尝试从常见的角色字段中获取角色信息
            const role = data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 
                         data.role || 
                         data.roles || 
                         data['role'];
            
            // 处理单个角色或角色数组的情况
            return Array.isArray(role)
                ? role.some(r => ['President', 'Minister', 'Founder'].includes(r))
                : ['President', 'Minister', 'Founder'].includes(role);
        } catch (error) {
            console.error('Failed to parse JWT:', error);
            return false;
        }
    }

    // 不支持的认证类型
    return false;
}

// 客户端检查是否已登录
export function isClientAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) return false;
        
        try {
            // 对于OAuth2，我们需要解析JSON格式的令牌
            const authInfo = JSON.parse(authToken);
            // 检查令牌是否过期
            return authInfo.expiresAt > Date.now();
        } catch {
            // 如果不是JSON格式，则使用旧的认证方法
            return !!authToken;
        }
    }
    return false;
}

// 获取客户端认证令牌
export function getClientAuthToken(): string | null {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('authToken');
        if (data) {
            try {
                const authInfo = JSON.parse(data);
                return authInfo.accessToken;
            } catch {
                // 如果不是JSON格式，则返回原始数据
                return data;
            }
        }
    }
    return null;
}

// OAuth2登出
export function oauthLogout(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('oauth_state');
    }
}
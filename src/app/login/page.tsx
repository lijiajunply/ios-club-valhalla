"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleOAuthCallback, redirectToOAuth } from "@/lib/services/authService";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    // 检查是否是OAuth2回调
    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            handleOAuthLogin();
        }
    }, [searchParams]);

    const handleOAuthLogin = async () => {
        setIsLoading(true);
        setError("");

        try {
            const success = await handleOAuthCallback(searchParams);
            if (success) {
                // 登录成功后跳转到主页
                router.push("/");
                router.refresh();
            } else {
                setError("OAuth登录失败");
            }
        } catch (err) {
            setError("登录失败，请稍后再试");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSSOLogin = () => {
        setIsLoading(true);
        setError("");
        redirectToOAuth();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div
                    className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div
                                className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                                <span className="text-white font-bold text-2xl">V</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">登录凌烟阁</h1>
                            <p className="text-gray-600 mt-2">请使用SSO账户登录</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleSSOLogin}
                            disabled={isLoading}
                            className={`w-full mt-8 py-3 px-4 rounded-xl font-medium text-white transition-all flex items-center justify-center ${
                                isLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg"
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                              strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    登录中...
                  </span>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                    </svg>
                                    使用SSO登录
                                </>
                            )}
                        </button>
                    </div>

                    <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                        <p className="text-center text-sm text-gray-600">
                            © {new Date().getFullYear()} iOS Club 凌烟阁. 保留所有权利.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
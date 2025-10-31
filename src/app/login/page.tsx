"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {authenticate} from "@/lib/services/authService";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // 将用户名和密码存储到 localStorage 中作为认证信息
            // 在实际应用中，这里应该发送到服务器进行验证
            if (await authenticate(username, password)) {
                // 登录成功后跳转到主页
                router.push("/");
                router.refresh();
            } else {
                setError("用户名或密码错误");
            }
        } catch (err) {
            setError("登录失败，请稍后再试");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
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
                            <p className="text-gray-600 mt-2">请输入您的账户信息以继续</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                        用户名
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="请输入用户名"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        密码
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="请输入密码"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full mt-8 py-3 px-4 rounded-xl font-medium text-white transition-all ${
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
                                    "登录"
                                )}
                            </button>
                        </form>
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
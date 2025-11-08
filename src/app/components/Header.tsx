"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">凌烟阁</span>
            </Link>
            <nav className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/"
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  首页
                </Link>
                <Link
                  href="/about"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/about"
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  关于
                </Link>
                {isAuthenticated && (
                  <Link
                    href="/memorials/new"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === "/memorials/new"
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    }`}
                  >
                    新建纪念
                  </Link>
                )}
              </div>
            </nav>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                登出
              </button>
            ) : (
              <Link
                href="/login"
                className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
"use client";

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Memorial} from '@prisma/client';
import {deleteMemorial, getMemorialById} from '@/lib/services/memorialService';

export default function MemorialDetailPage({params}: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [memorial, setMemorial] = useState<Memorial | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

    useEffect(() => {
        const resolveParams = async () => {
            const resolved = await params;
            setResolvedParams(resolved);
        };

        resolveParams();
    }, [params]);

    useEffect(() => {
        const fetchMemorial = async () => {
            if (!resolvedParams?.id) return;

            try {
                // 将字符串ID转换为数字ID
                const memorialId = parseInt(resolvedParams.id, 10);
                if (isNaN(memorialId)) {
                    setError('无效的英灵ID');
                    return;
                }

                const data = await getMemorialById(memorialId);
                setMemorial(data);
            } catch (err: unknown) {
                if (err.message === '英灵未找到') {
                    setError('英灵未找到');
                } else {
                    setError('获取英灵信息失败');
                }
                console.error('Failed to fetch memorial:', err);
            } finally {
                setLoading(false);
            }
        };

        if (resolvedParams?.id) {
            fetchMemorial();
        }
    }, [resolvedParams?.id]);

    const handleDelete = async () => {
        if (!memorial) return;

        if (window.confirm('确定要删除这位英灵吗？此操作不可撤销。')) {
            try {
                await deleteMemorial(memorial.id);
                router.push('/');
                router.refresh();
            } catch (err) {
                console.error('Failed to delete memorial:', err);
                alert('删除失败');
            }
        }
    };

    const handleEdit = () => {
        if (memorial) {
            router.push(`/memorials/${memorial.id}/edit`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">正在加载英灵信息...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">错误</h1>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        返回
                    </button>
                </div>
            </div>
        );
    }

    if (!memorial) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">英灵未找到</h1>
                    <button
                        onClick={() => router.back()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        返回
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                        返回
                    </button>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center mb-4">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                        <span
                                            className="text-sm font-medium text-gray-500 uppercase tracking-wider">{memorial.title}</span>
                                    </div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{memorial.name}</h1>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleEdit}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                    >
                                        编辑
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                    >
                                        删除
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">简介</h2>
                                <p className="text-gray-600 leading-relaxed">{memorial.description}</p>
                            </div>

                            {memorial.deed && (
                                <div className="mt-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">具体事迹</h2>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{memorial.deed}</p>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    ID: {memorial.id}
                  </span>
                                    <span className="text-sm text-gray-500">
                    创建时间: {new Date(memorial.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
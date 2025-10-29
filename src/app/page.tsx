"use client";
import {useEffect, useState} from 'react';
import Hero from './components/Hero';
import MemorialCard from './components/MemorialCard';
import {getMemorials} from '@/lib/services/memorialService';
import {Memorial} from "@prisma/client";
import Link from 'next/link';

// 静态数据作为后备
const staticMemorialData = [
    {id: 1, title: "高祖", name: "韩晨超", description: "创始人，奠定基石"},
    {id: 2, title: "高宗", name: "邵涧泽", description: "继任者，开疆拓土"},
    {id: 3, title: "太宗", name: "韩天昂", description: "中兴之主，再创辉煌"},
    {id: 4, title: "仁宗", name: "李嘉俊", description: "仁德之君，惠及众人"},
    {id: 5, title: "宪宗", name: "张硕航", description: "制度建设，规范发展"},
] as Memorial[];

export default function Home() {
    const [memorials, setMemorials] = useState<Memorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [incenseCount, setIncenseCount] = useState(0);
    const [isBurning, setIsBurning] = useState(false);

    useEffect(() => {
        const fetchMemorials = async () => {
            try {
                const data = await getMemorials();
                if (data.length === 0) {
                    console.warn('获取英灵数据失败，使用静态数据');
                    setMemorials(staticMemorialData);
                    return;
                }
                setMemorials(data);
            } catch (err) {
                // 如果API调用失败，使用静态数据
                console.warn('获取英灵数据失败，使用静态数据', err);
                setMemorials(staticMemorialData);
            } finally {
                setLoading(false);
            }
        };

        fetchMemorials();
    }, []);

    const handleBurnIncense = () => {
        if (!isBurning) {
            setIsBurning(true);
            setIncenseCount(prev => prev + 1);

            // 3秒后重置动画状态
            setTimeout(() => {
                setIsBurning(false);
            }, 3000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">正在加载英灵数据...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Hero/>

            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">社团英雄名录</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        他们用自己的智慧和汗水，为俱乐部的发展做出了不可磨灭的贡献
                    </p>
                    {/*<Link href="/memorials/new" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">*/}
                    {/*  添加英灵*/}
                    {/*</Link>*/}
                </div>

                {memorials.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">暂无英灵数据</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {memorials.map((memorial) => (
                            <Link href={''} key={memorial.id} className="block">
                                <MemorialCard
                                    title={memorial.title}
                                    name={memorial.name}
                                    description={memorial.description}
                                />
                            </Link>
                            // href={`/memorials/${memorial.id}`}
                        ))}
                    </div>
                )}

                {/* 赛博烧香功能 */}
                <div className='text-center mt-16'>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">赛博烧香</h2>
                    <p className="text-gray-600 mb-6">先烧再说</p>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-12">
                        <div className="text-center">
                            <div className="relative flex justify-center items-center mb-6">
                                <div
                                    className={`transition-all duration-1000 ${isBurning ? 'scale-110' : 'scale-100'}`}>
                                    <div className="relative w-16 h-24 mx-auto">
                                        <div
                                            className="absolute bottom-0 w-8 h-20 bg-amber-800 rounded-t-lg mx-auto left-1/2 transform -translate-x-1/2"></div>
                                        <div
                                            className="absolute bottom-0 w-4 h-4 bg-amber-600 rounded-full mx-auto left-1/2 transform -translate-x-1/2"></div>

                                        {/* 烟雾效果 */}
                                        {isBurning && (
                                            <>
                                                <div
                                                    className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-300 rounded-full animate-ping opacity-75"></div>
                                                <div
                                                    className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                                                <div
                                                    className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-500 rounded-full animate-ping opacity-50"></div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleBurnIncense}
                                disabled={isBurning}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                    isBurning
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                }`}
                            >
                                {isBurning ? '燃烧中...' : '点燃香火'}
                            </button>

                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <p className="text-gray-700">
                                    已有 <span className="font-bold text-amber-600">{incenseCount}</span> 柱香火被点燃
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
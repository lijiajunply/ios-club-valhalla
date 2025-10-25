"use client";
import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import MemorialCard from './components/MemorialCard';
import { getMemorials } from '@/lib/services/memorialService';
import {Memorial} from "@prisma/client";

// 静态数据作为后备
const staticMemorialData = [
  { id: 1, title: "高祖", name: "韩晨超", description: "创始人，奠定基石" },
  { id: 2, title: "高宗", name: "邵涧泽", description: "继任者，开疆拓土" },
  { id: 3, title: "太宗", name: "韩天昂", description: "中兴之主，再创辉煌" },
  { id: 4, title: "仁宗", name: "李嘉俊", description: "仁德之君，惠及众人" },
  { id: 5, title: "宪宗", name: "张硕航", description: "制度建设，规范发展" },
] as Memorial[];

export default function Home() {
  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">正在加载英灵数据...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">英灵名录</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            他们用自己的智慧和汗水，为俱乐部的发展做出了不可磨灭的贡献
          </p>
        </div>
        
        {memorials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无英灵数据</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memorials.map((memorial) => (
              <MemorialCard 
                key={memorial.id}
                title={memorial.title}
                name={memorial.name}
                description={memorial.description}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
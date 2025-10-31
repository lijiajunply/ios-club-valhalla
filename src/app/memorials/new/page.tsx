"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createMemorial } from '@/lib/services/memorialService';
import { Tag } from '@prisma/client';

export default function NewMemorialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    description: '',
    deed: '',
    tags: [] as Tag[]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (tag: Tag, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.filter(t => t !== tag)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await createMemorial(formData);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Failed to create memorial:', err);
      setError('创建英灵失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const tagOptions = [
    { value: Tag.FOUNDER, label: '创始人' },
    { value: Tag.LEADER, label: '领导者' },
    { value: Tag.CONTRIBUTOR, label: '贡献者' },
    { value: Tag.INNOVATOR, label: '创新者' },
    { value: Tag.MENTOR, label: '导师' },
    { value: Tag.VOLUNTEER, label: '志愿者' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            返回
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">添加英灵</h1>
              <p className="text-gray-600 mb-8">填写以下信息，将新的英灵加入名人堂</p>
              
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}
                
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    称号 *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="例如：创始人、领袖等"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    姓名 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="英灵的姓名"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    简介 *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="描述这位英灵的贡献和事迹"
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="deed" className="block text-sm font-medium text-gray-700 mb-2">
                    具体事迹
                  </label>
                  <textarea
                    id="deed"
                    name="deed"
                    value={formData.deed}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="详细描述这位英灵的具体事迹（可选）"
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    标签
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {tagOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`tag-${option.value}`}
                          type="checkbox"
                          value={option.value}
                          checked={formData.tags.includes(option.value)}
                          onChange={(e) => handleTagChange(option.value, e.target.checked)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`tag-${option.value}`} className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? '创建中...' : '创建英灵'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
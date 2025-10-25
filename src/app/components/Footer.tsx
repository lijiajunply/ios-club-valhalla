import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <h2 className="text-xl font-bold">iOS Club 英灵殿</h2>
            </div>
            <p className="mt-2 text-gray-400 text-sm">纪念传奇，传承精神</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">首页</Link>
            <Link href="/about/page" className="text-gray-400 hover:text-white transition-colors">关于</Link>
            <a href="mailto:valhalla@iosclub.com" className="text-gray-400 hover:text-white transition-colors">联系</a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} iOS Club 英灵殿. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
}
export default function Hero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          致敬传奇
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          纪念那些曾经为 iOS Club 发展做出卓越贡献的伟大人物
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            了解更多
          </button>
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors">
            参观英灵殿
          </button>
        </div>
      </div>
    </section>
  );
}
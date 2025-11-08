export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-2xl">V</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">加载中...</h1>
              <p className="text-gray-600 mt-2">正在加载登录页面</p>
            </div>
            <div className="flex justify-center">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
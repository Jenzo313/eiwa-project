import { useState } from 'react';
const logo = new URL('../assets/logo.png', import.meta.url).href;

function Layout({ children, currentPage, onPageChange, userType, onUserTypeChange }) {
  const [showUserTypeMenu, setShowUserTypeMenu] = useState(false);

  const handleUserTypeToggle = () => {
    setShowUserTypeMenu(!showUserTypeMenu);
  };

  const handleSelectUserType = (type) => {
    onUserTypeChange(type);
    setShowUserTypeMenu(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 font-sans text-right">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-emerald-600 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="شعار إيواء" className="h-10 w-10 ml-3" />
          <h1 className="text-2xl font-bold">إيواء</h1>
        </div>
        <nav>
          {/* يمكنك إضافة عناصر تنقل علوية هنا إذا لزم الأمر */}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t border-gray-200 p-4 shadow-lg fixed bottom-0 left-0 right-0 z-10">
        <nav className="flex justify-around items-center">
          <button
            className={`flex flex-col items-center text-sm font-medium ${currentPage === 'search' ? 'text-green-700' : 'text-gray-600'}`}
            onClick={() => onPageChange('search')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>بحث</span>
          </button>
          <div className="relative">
            <button
              className={`flex flex-col items-center text-sm font-medium ${userType === 'host' ? 'text-green-700' : 'text-gray-600'}`}
              onClick={handleUserTypeToggle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>الملف الشخصي</span>
            </button>
            {showUserTypeMenu && (
              <div className="absolute bottom-full mb-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                  onClick={( ) => handleSelectUserType('visitor')}
                >
                  وضع الزائر
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
                  onClick={() => handleSelectUserType('host')}
                >
                  وضع المضيف
                </button>
              </div>
            )}
          </div>
          {/* يمكنك إضافة عناصر تنقل سفلية أخرى هنا */}
        </nav>
      </footer>
    </div>
  );
}

export default Layout;

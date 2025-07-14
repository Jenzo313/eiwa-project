
import { useState } from 'react';

function HostDashboard({ onAddAccommodation }) {
  const [stats, setStats] = useState({
    totalVisitors: 1250,
    currentOccupancy: 300,
    availableCapacity: 950,
  });

  const [accommodations, setAccommodations] = useState([
    {
      id: 1,
      name: 'موكب الإمام الرضا (ع)',
      type: 'موكب',
      capacity: 500,
      occupied: 300,
      rating: 4.5,
      requests: [
        { id: 1, visitorName: 'أحمد', count: 5, status: 'pending', priority: 'high' },
        { id: 2, visitorName: 'فاطمة', count: 2, status: 'accepted', priority: 'medium' },
      ],
    },
    {
      id: 2,
      name: 'حسينية الإمام علي (ع)',
      type: 'حسينية',
      capacity: 200,
      occupied: 0,
      rating: 4.8,
      requests: [
        { id: 3, visitorName: 'علي', count: 10, status: 'pending', priority: 'high' },
      ],
    },
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-green-800 mb-4 text-right">لوحة تحكم المضيف</h2>

      {/* احصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">إجمالي الزوار</h3>
          <p className="text-4xl font-bold text-green-600">{stats.totalVisitors}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">الإشغال الحالي</h3>
          <p className="text-4xl font-bold text-blue-600">{stats.currentOccupancy}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">السعة المتاحة</h3>
          <p className="text-4xl font-bold text-orange-600">{stats.availableCapacity}</p>
        </div>
      </div>

      {/* أماكن الإيواء الخاصة بي */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-green-800 text-right">أماكن الإيواء الخاصة بي</h3>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={onAddAccommodation}
          >
            إضافة إقامة جديدة
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {accommodations.map(acc => (
            <div key={acc.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 text-right">{acc.name} ({acc.type})</h4>
              <p className="text-gray-600 text-right">السعة: {acc.capacity} زائر</p>
              <p className="text-gray-600 text-right">الإشغال: {acc.occupied} زائر</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(acc.occupied / acc.capacity) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center mt-2 justify-end">
                <span className="text-yellow-500 ml-1">⭐️</span>
                <span className="text-gray-700">{acc.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* الطلبات الأخيرة */}
      <div>
        <h3 className="text-xl font-bold text-green-800 mb-4 text-right">الطلبات الأخيرة</h3>
        <div className="grid grid-cols-1 gap-4">
          {accommodations.flatMap(acc => acc.requests.map(req => (
            <div key={req.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center border border-gray-200">
              <div>
                <p className="text-lg font-semibold text-gray-800 text-right">طلب من: {req.visitorName}</p>
                <p className="text-gray-600 text-right">عدد الزوار: {req.count}</p>
                <p className="text-gray-600 text-right">الإقامة: {acc.name}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(req.priority)}`}>
                {req.status === 'pending' ? 'معلق' : req.status === 'accepted' ? 'مقبول' : 'مرفوض'}
              </span>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}

export default HostDashboard;

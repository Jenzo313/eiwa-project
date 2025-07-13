import { useState, useEffect } from 'react';

function SearchPage() {
  const [accommodations, setAccommodations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // هنا سيتم جلب البيانات من الواجهة الخلفية
    // لأغراض العرض، سنستخدم بيانات وهمية
    const dummyData = [
      {
        id: 1,
        name: 'موكب الإمام الرضا (ع)',
        type: 'موكب',
        location: 'طريق يا حسين، عمود 200',
        capacity: 500,
        contact: '07701234567',
        description: 'موكب كبير يوفر المنام والطعام والخدمات الطبية.',
        rating: 4.5,
        features: ['طعام', 'منام', 'خدمات طبية', 'إنترنت'],
        isAvailable: true,
      },
      {
        id: 2,
        name: 'حسينية الإمام علي (ع)',
        type: 'حسينية',
        location: 'كربلاء المقدسة، شارع القبلة',
        capacity: 200,
        contact: '07809876543',
        description: 'حسينية توفر إيواء للعوائل والرجال، مع وجبات طعام.',
        rating: 4.8,
        features: ['طعام', 'منام للعوائل', 'مياه شرب'],
        isAvailable: true,
      },
      {
        id: 3,
        name: 'منزل الحاج أبو أحمد',
        type: 'منزل',
        location: 'النجف الأشرف، حي الأنصار',
        capacity: 50,
        contact: '07901122334',
        description: 'منزل خاص يستقبل الزوار، يوفر غرف نوم وحمامات.',
        rating: 4.2,
        features: ['منام', 'حمامات', 'مطبخ'],
        isAvailable: false,
      },
    ];
    setAccommodations(dummyData);
  }, []);

  const filteredAccommodations = accommodations.filter(acc => {
    const matchesSearch = acc.name.includes(searchTerm) || acc.location.includes(searchTerm) || acc.description.includes(searchTerm);
    const matchesType = filterType === 'all' || acc.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-green-800 mb-4 text-right">البحث عن أماكن الإيواء</h2>
      <div className="mb-4 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="ابحث بالاسم أو الموقع أو الوصف..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">جميع الأنواع</option>
          <option value="موكب">موكب</option>
          <option value="حسينية">حسينية</option>
          <option value="منزل">منزل</option>
          <option value="مركز مجتمعي">مركز مجتمعي</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAccommodations.map(acc => (
          <div key={acc.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col border border-gray-200">
            <h3 className="text-xl font-semibold text-green-700 mb-2 text-right">{acc.name}</h3>
            <p className="text-gray-600 text-right mb-1">النوع: {acc.type}</p>
            <p className="text-gray-600 text-right mb-1">الموقع: {acc.location}</p>
            <p className="text-gray-600 text-right mb-1">الطاقة الاستيعابية: {acc.capacity} زائر</p>
            <p className="text-gray-600 text-right mb-2">الوصف: {acc.description}</p>
            
            <div className="flex items-center mb-2 justify-end">
              <span className="text-yellow-500 ml-1">⭐</span>
              <span className="text-gray-700">{acc.rating}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3 justify-end">
              {acc.features.map((feature, index) => (
                <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {feature}
                </span>
              ))}
            </div>

            <div className="mt-auto flex justify-end">
              {acc.isAvailable ? (
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  طلب إيواء
                </button>
              ) : (
                <span className="bg-red-500 text-white px-4 py-2 rounded-lg opacity-75 cursor-not-allowed">
                  غير متاح حالياً
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;

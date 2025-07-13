import { useState } from 'react';
import { Label } from './ui/label'; // تأكد من وجود هذا المكون
import { Textarea } from './ui/textarea'; // تأكد من وجود هذا المكون

function AddAccommodation({ onSave, onBack }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('موكب');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAccommodation = {
      name,
      type,
      location,
      capacity: parseInt(capacity),
      contact,
      description,
      features: features.split(',').map(f => f.trim()),
    };
    onSave(newAccommodation);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-green-800 mb-4 text-right">إضافة مكان إيواء جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-right block mb-1">اسم مكان الإيواء</Label>
          <input
            type="text"
            id="name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="type" className="text-right block mb-1">نوع الإيواء</Label>
          <select
            id="type"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="موكب">موكب</option>
            <option value="حسينية">حسينية</option>
            <option value="منزل">منزل</option>
            <option value="مركز مجتمعي">مركز مجتمعي</option>
          </select>
        </div>
        <div>
          <Label htmlFor="location" className="text-right block mb-1">الموقع الدقيق</Label>
          <input
            type="text"
            id="location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="capacity" className="text-right block mb-1">الطاقة الاستيعابية (عدد الزوار)</Label>
          <input
            type="number"
            id="capacity"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="contact" className="text-right block mb-1">معلومات التواصل</Label>
          <input
            type="text"
            id="contact"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description" className="text-right block mb-1">الوصف</Label>
          <Textarea
            id="description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>
        <div>
          <Label htmlFor="features" className="text-right block mb-1">الميزات (افصل بينها بفاصلة)</Label>
          <input
            type="text"
            id="features"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={onBack}
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            حفظ مكان الإيواء
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAccommodation;

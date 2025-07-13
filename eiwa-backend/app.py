from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///eiwa.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# تمكين CORS للسماح بالطلبات من الواجهة الأمامية
CORS(app)

db = SQLAlchemy(app)

# نماذج قاعدة البيانات
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)  # 'visitor' or 'host'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Accommodation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(500), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    contact = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    features = db.Column(db.Text)  # JSON string
    host_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    rating = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    visitor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    accommodation_id = db.Column(db.Integer, db.ForeignKey('accommodation.id'), nullable=False)
    visitor_count = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), default='pending')  # 'pending', 'accepted', 'rejected'
    priority = db.Column(db.String(20), default='medium')  # 'high', 'medium', 'low'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# إنشاء الجداول
with app.app_context():
    db.create_all()

# المسارات (Routes)
@app.route('/')
def home():
    return jsonify({"message": "مرحباً بكم في تطبيق إيواء"})

@app.route('/api/accommodations', methods=['GET'])
def get_accommodations():
    accommodations = Accommodation.query.filter_by(is_available=True).all()
    result = []
    for acc in accommodations:
        result.append({
            'id': acc.id,
            'name': acc.name,
            'type': acc.type,
            'location': acc.location,
            'capacity': acc.capacity,
            'contact': acc.contact,
            'description': acc.description,
            'features': acc.features.split(',') if acc.features else [],
            'rating': acc.rating,
            'isAvailable': acc.is_available
        })
    return jsonify(result)

@app.route('/api/accommodations', methods=['POST'])
def add_accommodation():
    data = request.get_json()
    
    new_accommodation = Accommodation(
        name=data['name'],
        type=data['type'],
        location=data['location'],
        capacity=data['capacity'],
        contact=data['contact'],
        description=data.get('description', ''),
        features=','.join(data.get('features', [])),
        host_id=1  # مؤقت - سيتم ربطه بنظام المستخدمين لاحقاً
    )
    
    db.session.add(new_accommodation)
    db.session.commit()
    
    return jsonify({"message": "تم إضافة مكان الإيواء بنجاح", "id": new_accommodation.id}), 201

@app.route('/api/requests', methods=['POST'])
def create_request():
    data = request.get_json()
    
    new_request = Request(
        visitor_id=1,  # مؤقت
        accommodation_id=data['accommodation_id'],
        visitor_count=data['visitor_count'],
        priority=data.get('priority', 'medium')
    )
    
    db.session.add(new_request)
    db.session.commit()
    
    return jsonify({"message": "تم إرسال طلب الإيواء بنجاح", "id": new_request.id}), 201

@app.route('/api/stats', methods=['GET'])
def get_stats():
    total_accommodations = Accommodation.query.count()
    total_capacity = db.session.query(db.func.sum(Accommodation.capacity)).scalar() or 0
    pending_requests = Request.query.filter_by(status='pending').count()
    
    return jsonify({
        'totalVisitors': 1250,  # مؤقت
        'currentOccupancy': 300,  # مؤقت
        'availableCapacity': total_capacity - 300,
        'totalAccommodations': total_accommodations,
        'pendingRequests': pending_requests
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

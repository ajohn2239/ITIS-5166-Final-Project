from flask import Blueprint, request, jsonify
import jwt
import datetime
from config import SECRET_KEY
from functools import wraps

auth_bp = Blueprint('auth_bp', __name__)

# Middleware for authentication
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token is missing'}), 403
        try:
            jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 403
        return f(*args, **kwargs)
    return decorated

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if data['username'] == 'Aminah' and data['password'] == 'Aminah':
        token = jwt.encode(
            {'user': data['username'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
            SECRET_KEY
        )
        return jsonify({'token': token})
    return jsonify({'message': 'Invalid username or password'}), 401

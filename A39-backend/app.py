from flask import Flask, redirect, url_for, jsonify
from flask_cors import CORS
from auth import auth_bp
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config.from_object('config')

# Register the blueprint
app.register_blueprint(auth_bp, url_prefix='/')

# Default route to redirect to the login page
@app.route('/')
def home():
    return "Welcome to the A39 backend!"

# Handle 404 errors with JSON response
@app.errorhandler(404)
def page_not_found(e):
    return jsonify({'error': 'The requested URL was not found on the server.'}), 404

# Running port
if __name__ == '__main__':
    app.run(port=3000, debug=True)

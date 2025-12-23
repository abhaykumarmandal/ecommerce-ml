# backend/app.py
import uuid
import random
from flask import Flask, jsonify, request
from flask_cors import CORS
from data import PRODUCTS
from recommender import RecommenderSystem

app = Flask(__name__)
CORS(app)

recommender = RecommenderSystem()

# Mock Database for Orders (In-Memory)
ORDERS = {}

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(PRODUCTS)

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_detail(product_id):
    product = next((item for item in PRODUCTS if item["id"] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

@app.route('/api/recommend/<int:product_id>', methods=['GET'])
def recommend(product_id):
    recommendations = recommender.get_recommendations(product_id, num_recommendations=4)
    return jsonify(recommendations)

# --- NEW: ORDER & TRACKING APIS ---

@app.route('/api/order', methods=['POST'])
def create_order():
    data = request.json
    # Generate a fake tracking ID (e.g., TRK-1234-5678)
    tracking_id = f"TRK-{random.randint(1000,9999)}-{random.randint(1000,9999)}"
    
    order_details = {
        "tracking_id": tracking_id,
        "items": data.get('items'),
        "total": data.get('total'),
        "status": "Processing", # Default status
        "address": data.get('address')
    }
    
    ORDERS[tracking_id] = order_details
    return jsonify({"success": True, "tracking_id": tracking_id})

@app.route('/api/track/<string:tracking_id>', methods=['GET'])
def track_order(tracking_id):
    order = ORDERS.get(tracking_id)
    if order:
        # Simulate status updates based on random chance for demo
        statuses = ["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"]
        # In a real app, this would change over time. Here we just return the stored status.
        return jsonify(order)
    return jsonify({"error": "Tracking ID not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)

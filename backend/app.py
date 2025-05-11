# app.py
from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load .env into environment
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration for MySQL database connection from env vars
app.config['MYSQL_HOST']     = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER']     = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB']       = os.getenv('MYSQL_DB')

mysql = MySQL(app)

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Flask API"})

@app.route('/data', methods=['GET'])
def get_data():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM logs')
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

@app.route('/users', methods=['GET'])
def get_users():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users')
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

@app.route('/log_storage', methods=['GET'])
def get_log_storage():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM log_storage')
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

@app.route('/log_storage/filter', methods=['GET'])
def filter_log_storage():
    severity = request.args.get('severity')
    ip = request.args.get('ip')

    query = 'SELECT * FROM log_storage WHERE 1=1'
    params = []

    if severity:
        query += ' AND severity = %s'
        params.append(severity)
    if ip:
        query += ' AND ip_address = %s'
        params.append(ip)

    cursor = mysql.connection.cursor()
    cursor.execute(query, params)
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(
        debug=True,
        host='0.0.0.0',
        port=int(os.getenv('PORT', 5000))
    )

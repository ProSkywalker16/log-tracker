# app.py
from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from dotenv import load_dotenv
import os
from utils.ipinfofetcher import getIPDetails
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

# Load .env into environment
load_dotenv()

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)

# Configuration for MySQL database connection from env vars
app.config['MYSQL_HOST']     = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER']     = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB']       = os.getenv('MYSQL_DB')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

mysql = MySQL(app)

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Flask API"})

@app.route('/login',methods = ['POST'])
def login():
    #if request.method == 'OPTIONS':
    #    return '',200
    if request.method == 'POST':
        try:
            email = request.form['email']
            pwd = request.form['pwd']
        except Exception as e:
            return jsonify({
                'status_code': 400,
                'msg': 'Baje Request'
            }), 400

        try:
            cursor = mysql.connection.cursor()
            cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
            data = cursor.fetchall()
            cursor.close()
        except Exception as e:
            return jsonify({
                'status_code': 500,
                'msg': 'Internal Server Error'
            }), 500
        
        if not data:
            return jsonify({
                'msg': 'User not found'
            }), 404
        else:
            if check_password_hash(data[0][3], pwd):
                access_token = create_access_token(identity=data[0][2])
                return jsonify({
                    'status_code': 200,
                    'msg': 'Success',
                    'access_token': access_token
                }), 200
            else:
                return jsonify({
                    'status_code': 401,
                    'msg': 'Incorrect Email or Password'
                }), 401

@app.route('/data', methods=['GET'])
@jwt_required()
def get_data():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM logs')
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

@app.route('/log_storage/ipinfo', methods=['GET'])
@jwt_required()
def get_ipinfo():
    ip_address = request.args.get('ip_address')
    return jsonify(getIPDetails(ip_address))

@app.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users')
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

@app.route('/log_storage', methods=['GET'])
@jwt_required()
def get_log_storage():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM log_storage')
    data = cursor.fetchall()
    cursor.close()
    print(data[0][4])
    return jsonify(data)

@app.route('/log_storage/filter', methods=['GET'])
@jwt_required()
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

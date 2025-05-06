from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS globally (you can specify specific origins later if needed)
CORS(app)

# Configuration for MySQL database connection
app.config['MYSQL_HOST'] = '192.168.196.67'  # Use remote IP for remote machine
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'hello123'  # Replace with your root password
app.config['MYSQL_DB'] = 'flaskdb'  # Replace with your database name

mysql = MySQL(app)

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Flask API"})

@app.route('/data', methods=['GET'])
def get_data():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM logs')  # Replace with your table name
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # 0.0.0.0 allows external access

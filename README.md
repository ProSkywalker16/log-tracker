
# 📘 Log Tracker

**Log Tracker** is a lightweight real‑time log‑monitoring web app. Run the Python/Flask backend on one machine, connect any number of clients (web browsers) over a secure virtual LAN (ZeroTier), and watch logs stream in live.

---

## 💡 Why This Project Matters

**Log Tracker** demonstrates how an **old laptop** can be **repurposed into a lightweight Linux server** to run a full-stack web application backend. In doing so, it offers an **accessible, cost-effective alternative** to commercial cloud platforms like **AWS, GCP, or Azure**—especially for:

- Small teams  
- Hackathons  
- Prototyping  
- Education or learning projects  
- Offline or limited-connectivity environments

### 🖥️ Turn Any Old Laptop into a Flask-Based Server

This project intentionally avoids bloated cloud setups. Instead:

- Install a lightweight Linux distribution (like Ubuntu Server or Debian) on an old laptop.
- Set up Python + Flask + MySQL on the device.
- Use **ZeroTier** to form a **secure virtual network**, making the backend reachable from any device.

✅ Result: You have a **mini cloud server**, with no monthly fees, full control, and zero vendor lock-in.

### 🔄 Why It Works Well

- **Flask** is lightweight and ideal for running on low-resource machines.
- **MySQL** (or MariaDB) is proven and efficient for small to medium datasets.
- **ZeroTier** ensures secure, encrypted networking between devices—even behind NAT or firewalls—without exposing ports publicly.
- **CORS support** means the frontend can be run from any device without backend changes.

### 🌍 Who Should Use This Pattern

This architecture is especially useful if you're:

- A student or hobbyist learning web development  
- Running a demo for a client or class  
- Building an internal tool for your team  
- Working in environments with no cloud access or budget

### 💸 Cloud-Free Doesn't Mean Feature-Free

| Feature          | Traditional Cloud (AWS/GCP) | This Project (Old Laptop + ZeroTier) |
|------------------|------------------------------|--------------------------------------|
| Hosting          | Paid VMs                     | Free local machine                   |
| Security         | IAM + VPC                    | ZeroTier overlay + .env secrets      |
| Accessibility    | Public IP / Firewall config  | Secure private IP via ZeroTier       |
| Scalability      | Auto-scaling infrastructure  | Manual scaling (for small apps)      |
| Deployment       | CI/CD pipelines              | Git pull + restart Flask             |

> 💡 **Log Tracker isn't just a log viewer—it's a proof of concept that your dusty old laptop can still power real backend applications, securely and efficiently.**

---

## 🚀 Features

- **Real‑time** log streaming via WebSockets  
- **Browser‑based** dashboard—no install on clients  
- **Secure overlay network** using ZeroTier  
- **Cross‑platform**: Windows, macOS, Linux, mobile  

---

## 🛠️ Quickstart

### 1. Clone the Repository

```bash
git clone https://github.com/ProSkywalker16/log-tracker.git
cd log-tracker
```

---

### 2. Set Up a ZeroTier Network

1. Sign up at [https://my.zerotier.com/](https://my.zerotier.com/)
2. Create a network → note your **Network ID**
3. On **each** device (server + clients):

```bash
zerotier-cli join <NETWORK_ID>
```

4. In ZeroTier Central, **authorize** each device under "Members"

---

## 📦 Dependencies

### Backend

- Python 3.8+
- Flask
- Flask-SocketIO
- Flask-CORS
- Flask-MySQLdb
- python-dotenv

### Frontend

- HTML/CSS/JS
- socket.io-client

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## ⚙️ Configuration

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Edit `.env` with your DB credentials:

```ini
MYSQL_HOST=192.168.x.x
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DB=flaskdb
PORT=5000
```

3. Ensure `.env` is listed in `.gitignore`:

```bash
echo ".env" >> .gitignore
```

4. Remove previously committed `.env` if any:

```bash
git rm --cached .env
git commit -m "Stop tracking .env"
git push
```

---

## 🖥️ Running the Server

On the host machine:

```bash
flask run --host=0.0.0.0 --port=5000
```

---

## 🌐 Access from Other Devices

1. Get the ZeroTier IP of the host:

```bash
zerotier-cli listnetworks
```

2. From a client device:

```
http://<SERVER_ZEROTIER_IP>:5000/
```

Example:

```
http://10.147.17.5:5000/
```

---

## 🔄 IP Changes on ZeroTier

- IPs may change unless statically assigned in ZeroTier Central.
- To avoid issues:
  - Assign static IP under network settings
  - Or check using:

```bash
zerotier-cli listnetworks
```

---

## 🔒 Security Tips

- Never commit `.env` to GitHub
- Use strong `.env` secrets
- Use HTTPS and authentication for production
- Limit access to trusted ZeroTier members

---

## 🤝 Contributing

1. Fork this repo  
2. Create a new branch  
3. Commit your changes  
4. Submit a pull request

---

## 📄 License

Licensed under the [MIT License](LICENSE)

---

> Need help? Open an issue or contact @ProSkywalker16

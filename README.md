# 📘 Log Tracker

**Log Tracker** is a lightweight real‑time log‑monitoring web app. Run the Python/Flask backend on one machine, connect any number of clients (web browsers) over a secure virtual LAN (ZeroTier), and watch logs stream in live.

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

### 2. Set Up a ZeroTier Network

1. Sign up at [https://my.zerotier.com/](https://my.zerotier.com/)
2. Create a network → note your **Network ID**
3. On **each** device (server + clients):
   - Install ZeroTier (from [https://www.zerotier.com/download/](https://www.zerotier.com/download/))
   - Join the network:
     ```bash
     zerotier-cli join <NETWORK_ID>
     ```
4. In ZeroTier Central, **authorize** each device under the "Members" section.

---

## 📦 Dependencies

### Backend

- Python 3.8 or higher
- Flask
- Flask‑SocketIO
- python‑dotenv

### Frontend

- HTML/CSS/JS
- socket.io‑client

Install backend dependencies:

```bash
pip install -r requirements.txt
```

---

## ⚙️ Configuration

1. Copy `.env.example` to `.env`  
```bash
cp .env.example .env
```

2. Edit `.env`:  
```ini
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=<your_secret_key_here>
```

> 🔐 Replace `<your_secret_key_here>` with a strong random string.

3. Make sure `.env` is listed in `.gitignore`

---

## 🖥️ Running the Server

On the **host/server device** (connected to ZeroTier):

```bash
flask run --host=0.0.0.0
```

- This exposes the server on all interfaces, including the ZeroTier network.
- Default port: `5000`

---

## 🌐 Accessing from Other Devices

1. On the server, check the ZeroTier IP address:

```bash
zerotier-cli listnetworks
```

Look for the IP under "Assigned Addresses" (e.g., `10.147.17.5`)

2. On any other device (also connected to the same ZeroTier network), open a browser and go to:

```
http://<SERVER_ZEROTIER_IP>:5000/
```

Example:

```
http://10.147.17.5:5000/
```

---

## 🔄 IP Changes on ZeroTier

- ZeroTier IPs can change unless statically assigned.
- You can:
  - Assign a **static IP** in ZeroTier Central → Network Settings → IPv4 Auto-Assign
  - Or check the current IP using:
    ```bash
    zerotier-cli listnetworks
    ```

---

## 🔒 Security Tips

- Never commit `.env` to GitHub  
- Always use a strong `SECRET_KEY`  
- Keep Flask and all dependencies updated  
- Use HTTPS and auth if deploying publicly

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repo  
2. Create a new branch  
3. Commit your changes  
4. Submit a pull request  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Need help? Open an issue on the repo or contact @ProSkywalker16

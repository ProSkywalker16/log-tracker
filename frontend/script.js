// — Username prompt & display —
let user = localStorage.getItem('username');
if (!user) {
  user = prompt('Welcome! Please enter your name:') || 'Guest';
  localStorage.setItem('username', user);
}
document.querySelector('#username strong').textContent = user;

// — Elements & state —
const logList        = document.getElementById('log-list');
const logCountEl     = document.getElementById('log-count');
const lastUpdateEl   = document.getElementById('last-update-time');
const refreshBtn     = document.getElementById('refresh-btn');
const severityFilter = document.getElementById('severity-filter');
const searchBox      = document.getElementById('search-box');
const chatBtn        = document.getElementById('chat-btn');

let allLogs = [];  // will hold fetched logs

// — Update “last updated” timestamp —
function updateLastUpdatedTime() {
  const now = new Date();
  lastUpdateEl.innerHTML = `Last updated: <strong>${now.toLocaleTimeString()}</strong>`;
}

// — Render logs with filters applied —
function renderLogs() {
  const level  = severityFilter.value;
  const search = searchBox.value.toLowerCase();

  const filtered = allLogs.filter(r => {
    const msg = r[1].toLowerCase();
    return ( !level || r[2] === level )
        && ( !search || msg.includes(search) );
  });

  logList.innerHTML = '';
  filtered.forEach(r => {
    const d = document.createElement('div');
    d.className = 'log-item';
    d.innerHTML = `
      <p><strong>ID:</strong> ${r[0]}</p>
      <p><strong>Message:</strong> ${r[1]}</p>
      <p><strong>Level:</strong> ${r[2]}</p>
      <p><strong>Timestamp:</strong> ${r[3]}</p>
    `;
    logList.appendChild(d);
  });

  logCountEl.textContent = filtered.length;
}

// — Fetch logs from backend —
async function fetchLogs() {
  try {
    const resp = await fetch('http://192.168.0.141:5000/data');
    const data = await resp.json();
    allLogs = data;
    renderLogs();
    updateLastUpdatedTime();
  } catch (err) {
    console.error('Error fetching logs:', err);
    logList.innerHTML = '<p style="color:red;">Failed to load logs.</p>';
  }
}

// — Event listeners —
refreshBtn.addEventListener('click', fetchLogs);
severityFilter.addEventListener('change', renderLogs);
searchBox.addEventListener('input', renderLogs);
chatBtn.addEventListener('click', () => window.location.href = 'chat.html');

// — Auto‑refresh every 20 seconds —
setInterval(fetchLogs, 20000);

// — Initial load —
window.onload = fetchLogs;

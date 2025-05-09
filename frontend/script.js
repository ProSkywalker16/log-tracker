// — Username prompt & display —
let user = localStorage.getItem('username');
if (!user) {
  user = prompt('Welcome! Please enter your name:') || 'Guest';
  localStorage.setItem('username', user);
}
document.querySelector('#username strong').textContent = user;

// — Logout logic —
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    location.reload();
  });
}

// — Elements & state —
const logList        = document.getElementById('log-list');
const logCountEl     = document.getElementById('log-count');
const lastUpdateEl   = document.getElementById('last-update-time');
const refreshBtn     = document.getElementById('refresh-btn');
const severityFilter = document.getElementById('severity-filter');
const searchBox      = document.getElementById('search-box');
const chatBtn        = document.getElementById('chat-btn');

let allLogs = [];
let categoryChart = null;

// — Define custom colors for each severity level —
const severityColors = {
  INFO:      '#800080',   // purple
  LOW:       '#008000',   // green
  MEDIUM:    '#FFD700',   // yellow
  HIGH:      '#FFA500',   // orange
  CRITICAL:  '#FF0000',   // red
  EMERGENCY: '#A52A2A'    // brown
};

// — Count logs by severity (r[2]) —
function getCategoryData(logs) {
  const counts = logs.reduce((acc, log) => {
    const level = String(log[2]).toUpperCase().trim();
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});
  const labels = Object.keys(counts);
  const data   = Object.values(counts);
  const colors = labels.map(l => severityColors[l] || '#cccccc');
  return { labels, data, colors };
}

// — Create or update pie chart —
function updatePieChart(labels, data, colors) {
  const ctx = document.getElementById('categoryPieChart').getContext('2d');
  if (!categoryChart) {
    categoryChart = new Chart(ctx, {
      type: 'pie',
      data: { labels, datasets: [{ data, backgroundColor: colors, hoverOffset: 10 }] },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Logs by Severity Level' }
        }
      }
    });
  } else {
    categoryChart.data.labels = labels;
    categoryChart.data.datasets[0].data = data;
    categoryChart.data.datasets[0].backgroundColor = colors;
    categoryChart.update();
  }
}

// — Update “last updated” timestamp —
function updateLastUpdatedTime() {
  const now = new Date();
  lastUpdateEl.innerHTML = `Last updated: <strong>${now.toLocaleTimeString()}</strong>`;
}

// — Render logs with inline colored border —
function renderLogs() {
  const level  = severityFilter.value;
  const search = searchBox.value.toLowerCase();

  const filtered = allLogs.filter(r => {
    const sev = String(r[2]).toUpperCase().trim();
    const msg = r[1].toLowerCase();
    return (!level || sev === level) && (!search || msg.includes(search));
  });

  logList.innerHTML = '';
  filtered.forEach(r => {
    const sev = String(r[2]).toUpperCase().trim();
    const d = document.createElement('div');
    d.className = 'log-item';
    // set inline left border color according to severity
    const color = severityColors[sev] || '#cccccc';
    d.style.borderLeft = `5px solid ${color}`;
    d.innerHTML = `
      <p><strong>ID:</strong> ${r[0]}</p>
      <p><strong>Message:</strong> ${r[1]}</p>
      <p><strong>Level:</strong> ${sev}</p>
      <p><strong>Timestamp:</strong> ${r[3]}</p>
    `;
    logList.appendChild(d);
  });

  logCountEl.textContent = filtered.length;
}

// — Fetch logs from backend —
async function fetchLogs() {
  try {
    const resp = await fetch('http://192.168.0.170:5000/data');
    allLogs = await resp.json();

    renderLogs();

    // Compute chart data & update chart
    const { labels, data: counts, colors } = getCategoryData(allLogs);
    updatePieChart(labels, counts, colors);

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

// — Auto‑refresh every 10 seconds —
setInterval(fetchLogs, 10000);

// — Initial load —
window.onload = fetchLogs;

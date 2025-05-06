// Simulate logged-in user info (replace with real data from backend)
const loggedInUser = 'John Doe';

// Update last updated time
function updateLastUpdatedTime() {
    const lastUpdate = new Date();
    const formattedTime = `${lastUpdate.getHours()}:${lastUpdate.getMinutes()}:${lastUpdate.getSeconds()}`;
    document.getElementById('last-update-time').innerHTML = `Last updated: <strong>${formattedTime}</strong>`;
}

// Fetch logs from the backend
async function fetchLogs() {
    try {
        const response = await fetch('http://192.168.196.67:5000/data');  // Adjust URL when backend is ready
        const data = await response.json();

        const logList = document.getElementById('log-list');
        logList.innerHTML = '';  // Clear any existing content

        if (data && data.length > 0) {
            data.forEach(item => {
                const logItem = document.createElement('div');
                logItem.classList.add('log-item');
                logItem.innerHTML = `
                    <p><strong>Timestamp:</strong> ${item.timestamp}</p>
                    <p><strong>Log Data:</strong> ${item.data}</p>
                `;
                logList.appendChild(logItem);
            });
        } else {
            logList.innerHTML = 'No logs available.';
        }

        // Update last updated time
        updateLastUpdatedTime();
    } catch (error) {
        console.error('Error fetching logs:', error);
    }
}

// Display the logged-in user info
document.getElementById('username').innerHTML = `Logged in as: <strong>${loggedInUser}</strong>`;

// Fetch logs every 10 seconds to keep the display updated
setInterval(fetchLogs, 10000);

// Run fetchLogs when the page loads
window.onload = fetchLogs;

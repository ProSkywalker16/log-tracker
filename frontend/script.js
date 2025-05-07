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
        const response = await fetch('http://192.168.0.141:5000/data');
        const data = await response.json();

        const logList = document.getElementById('log-list');
        logList.innerHTML = ''; // Clear any existing content

        if (data && data.length > 0) {
            data.forEach(item => {
                const logItem = document.createElement('div');
                logItem.classList.add('log-item');
                logItem.innerHTML = `
                    <p><strong>ID:</strong> ${item[0]}</p>
                    <p><strong>Message:</strong> ${item[1]}</p>
                    <p><strong>Level:</strong> ${item[2]}</p>
                    <p><strong>Timestamp:</strong> ${item[3]}</p>
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
        document.getElementById('log-list').innerHTML = 'Failed to load logs.';
    }
}

// Display the logged-in user info
document.getElementById('username').innerHTML = `Logged in as: <strong>${loggedInUser}</strong>`;

// Fetch logs every 10 seconds to keep the display updated
setInterval(fetchLogs, 10000);

// Run fetchLogs when the page loads
window.onload = fetchLogs;

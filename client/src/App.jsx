import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


const severityColors = {
  INFO: "#800080",
  LOW: "#008000",
  MEDIUM: "#FFD700",
  HIGH: "#FFA500",
  CRITICAL: "#FF0000",
  WARNING: "#A52A2A",
  ERROR: "#FF0000",
};

const App = () => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const chartRef = useRef(null);
  const pieChart = useRef(null);

  useEffect(() => {
    if (!username) {
      const name = prompt("Welcome! Please enter your name:") || "Guest";
      setUsername(name);
      localStorage.setItem("username", name);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://192.168.0.182:5000/data");
      const data = await res.json();
      setLogs(data);
      setLastUpdate(new Date().toLocaleTimeString());
      updatePieChart(data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  };

  const updatePieChart = (logData) => {
    const counts = logData.reduce((acc, log) => {
      const level = String(log[2]).toUpperCase().trim(); // normalize
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(counts);
    const data = Object.values(counts);
    const colors = labels.map((l) => severityColors[l] || "#cccccc");

    if (pieChart.current) {
      pieChart.current.destroy();
    }

    pieChart.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          hoverOffset: 10,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          title: { display: true, text: "Logs by Severity Level" },
        },
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    location.reload();
  };

  const filteredLogs = logs.filter((r) => {
    const sev = String(r[2]).toUpperCase().trim();
    const msg = r[1].toLowerCase();
    return (!filter || sev === filter) && (!search || msg.includes(search));
  });

  return (
    <div className="w-full text-white">
      <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
      <header className="bg-slate-800 rounded-lg mb-5 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Log Tracker</h1>
        <div className="text-beige text-sm text-right">
          <div>Logged in as: <strong>{username}</strong></div>
          <div>Last updated: <strong>{lastUpdate || "Loading..."}</strong></div>
        </div>
        <nav className="flex flex-wrap gap-2">
          <button className="bg-slate-700 hover:bg-slate-600 border border-slate-500 px-3 py-1 rounded" onClick={fetchLogs}>🔄 Refresh</button>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-slate-700 text-beige border border-slate-500 px-2 py-1 rounded">
            <option value="">All Levels</option>
            <option value="INFO">INFO</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="EMERGENCY">EMERGENCY</option>
          </select>
          <input type="text" placeholder="Search messages…" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-slate-700 text-beige border border-slate-500 px-2 py-1 rounded w-[150px]" />
          <button onClick={() => window.location.href = 'chat.html'} className="bg-slate-700 hover:bg-slate-600 border border-slate-500 px-3 py-1 rounded">💬 Chat</button>
          <button onClick={handleLogout} className="bg-red-700 hover:bg-red-600 border border-red-500 px-3 py-1 rounded">🚪 Logout</button>
        </nav>
      </header>

      <main className="w-full  text-white p-5 rounded shadow-md">
        <div className="flex flex-col lg:flex-row gap-6">

          <div className="w-full lg:max-w-[400px] flex justify-center items-center bg-gradient-to-r from-[#15102d] to-[#1b1137] text-white rounded shadow p-4">
            <canvas ref={chartRef} className="w-[300px] h-[300px]" />
          </div>

          <div className="flex-1 overflow-x-auto rounded shadow bg-gradient-to-r from-[#15102d] to-[#1b1137] text-white p-4">
            <h2 className="text-lg font-semibold mb-2">Log Data (<span className="text-red-600">{filteredLogs.length}</span>)</h2>
            <table className="min-w-full text-sm text-left text-white border border-white/20 rounded-md border-collapse">
              <thead className="text-xs uppercase bg-[#19163F] text-white/80">
                <tr>
                  <th className="px-4 py-3 font-medium border border-white/20">ID</th>
                  <th className="px-4 py-3 font-medium border border-white/20">Message</th>
                  <th className="px-4 py-3 font-medium border border-white/20">Level</th>
                  <th className="px-4 py-3 font-medium border border-white/20">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-[#0D0B36]">
                {filteredLogs.map((r, idx) => {
                  const sev = String(r[2]).toUpperCase().trim();
                  const sevColor = {
                    INFO: "#800080",
                    WARNING: "#A52A2A",
                    ERROR: "#FF0000",
                    HIGH: "#FFA500",
                    LOW: "#008000",
                    MEDIUM: "#FFD700",
                    CRITICAL: "#FF0000",
                  } [sev] || "#FFF";
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-indigo-950 transition"
                      style={{ borderLeft: `5px solid ${severityColors[sev] || "#cccccc"}` }}
                    >
                      <td className="px-4 py-3 border border-white/20">{r[0]}</td>
                      <td className="px-4 py-3 border border-white/20">{r[1]}</td>
                      <td className="px-4 py-3 font-semibold border border-white/20" style={{ color: sevColor }}>
                        {sev}
                      </td>
                      <td className="px-4 py-3 border border-white/20">{r[3]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>


          </div>
        </div>
      </main>


      <footer className="text-center text-sm text-slate-400 mt-10">
        &copy; 2025 Log Tracker by Peter Sorkar INC (Part Time Vigilante in DHORMOTAL BALLYGUNJE). All rights reserved.
      </footer>
    </div>
  );
};

export default App;

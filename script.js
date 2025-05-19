function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('mainContent').classList.toggle('shift');
  }
  
  function showSection(id) {
    document.querySelectorAll('.table-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
  }
  
  function loadData() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const fillTable = (id, rows, columns) => {
          const tbody = document.querySelector(`#${id} tbody`);
          tbody.innerHTML = "";
          rows.forEach(row => {
            const tr = document.createElement('tr');
            columns.forEach(col => {
              const td = document.createElement('td');
              td.textContent = row[col];
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
        };
  
        fillTable("cpuUtilizationTable", data.cpuUtilization, ["processId", "processName", "cpu", "memory", "timestamp"]);
        fillTable("cpuAlarmsTable", data.cpuAlarms, ["processId", "processName", "cpu", "threshold", "triggeredAt"]);
        fillTable("userActivityTable", data.userActivity, ["userAction", "processId", "time"]);
        fillTable("processManipulationTable", data.processManipulation, ["userAction", "targetProcess", "status", "time"]);
        fillTable("networkPacketsTable", data.networkPackets, ["sourceIp", "destinationIp", "protocol", "packetSize", "timestamp"]);
        renderCharts(data);

      });
  }
  
  loadData();
  function renderCharts(data) {
    if (window.charts) window.charts.forEach(c => c.destroy());
    window.charts = [];
  
    const createChart = (id, labels, label, dataPoints, color) => {
      const ctx = document.getElementById(id).getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: dataPoints,
            borderColor: color,
            backgroundColor: color + '33',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'top' } },
          scales: {
            x: { title: { display: true, text: 'Timestamp' } },
            y: { beginAtZero: true }
          }
        }
      });
      window.charts.push(chart);
    };
  
    // CPU Utilization
    const cpuLabels = data.cpuUtilization.map(row => row.timestamp);
    const cpuData = data.cpuUtilization.map(row => row.cpu);
    createChart("cpuUtilizationChart", cpuLabels, "CPU Utilization (%)", cpuData, "#007bff");
  
    // CPU Alarms
    const alarmLabels = data.cpuAlarms.map(row => row.triggeredAt);
    const alarmData = data.cpuAlarms.map(row => row.cpu);
    createChart("cpuAlarmsChart", alarmLabels, "Triggered CPU (%)", alarmData, "#dc3545");
  
    // User Activity
    const userLabels = data.userActivity.map(row => row.time);
    const userData = data.userActivity.map((_, i) => i + 1);
    createChart("userActivityChart", userLabels, "User Actions", userData, "#28a745");
  
    // Process Manipulation
    const processLabels = data.processManipulation.map(row => row.time);
    const processData = data.processManipulation.map((_, i) => i + 1);
    createChart("processManipulationChart", processLabels, "Manipulation Count", processData, "#ffc107");
  
    // Network Packets
    const networkLabels = data.networkPackets.map(row => row.timestamp);
    const packetSizes = data.networkPackets.map(row => row.packetSize);
    createChart("networkPacketsChart", networkLabels, "Packet Size", packetSizes, "#17a2b8");
  }
  
  setInterval(loadData, 3000);
  
const io = require('socket.io')(4000, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("Client connected");

  setInterval(() => {
    socket.emit("dashboardData", {
      purchaseStatus: [
        { timestamp: '3:00', value: Math.random() * 10 },
        { timestamp: '3:05', value: Math.random() * 12 }
      ],
      successRate: [
        { label: 'Purchase succeeded', value: 234 },
        { label: 'Purchase failed', value: 118 }
      ],
      bestSelling: [
        { name: '23434300', count: 1023 },
        { name: '09869878', count: 780 }
      ],
      topErrors: [
        { id: '10622978', message: '500 Internal Server Error', count: 120 },
        { id: '12521561', message: 'Reason: p...ver error', count: 100 }
      ]
    });
  }, 4000);
});
const WebSocket = require('ws');
const port = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
    console.log('Phát hiện kết nối mới!');
    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});
console.log(`Proxy đang chạy trên port ${port}`);
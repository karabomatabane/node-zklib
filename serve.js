const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').Server(app); // Create an HTTP server
const ZKLib = require('./zklib')
const io = require('socket.io')(http); // Attach Socket.IO to the HTTP server
const port = 3000;
const ip = '192.168.88.1';

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    test();
});

const test = async () => {
    const zkInstance = new ZKLib(ip, 4370, 10000, 4000);
    try {
        await zkInstance.createSocket();
        console.log("Get Attendance");
        
        // Get general info like logCapacity, user counts, logs count, etc.
        console.log(await zkInstance.getInfo());

        // zkInstance.connectTCP();
        await zkInstance.enableDevice();

        // Use Socket.IO to emit real-time updates to connected clients
        zkInstance.getRealTimeLogs((data) => {
            // Emit the data to all connected clients
            io.emit('realtime-event', data);
        });
    } catch (err) {
        console.log("Error");
        console.log(err);
    }
}



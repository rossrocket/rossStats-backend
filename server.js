const net = require('net');
const express = require('express');
const app = express();
const httpport = 8000;
const tcpport = 7327;
const host = 'localhost';

// stringifies json and concats a null then writes to the TCP socket
const writeToDatalinq = (socket,json) => {
    let buffer = Buffer.from(JSON.stringify(json));
    const nullBuffer = Buffer.from([0x00]);
    buffer = Buffer.concat([buffer, nullBuffer]);
    socket.write(buffer);
}

//Create a new TCP client.
const tcpClient = new net.Socket();

// Create connection with TCP server (DataLinq).
tcpClient.connect({ port: tcpport, host }, () => {
    console.log('TCP connection established.');
});

tcpClient.on('error', (error) => {
    console.error('There was a client error', error);
});

// response when receiving a get request
app.get('/', (request, response) => {
    const json = { info: 'Lets connect!'}
    response.json(json)
    writeToDatalinq(tcpClient,json)
})

app.get('/sports', (request, response) => {
    const json = { info: 'I love games!'}
    response.json(json)
    writeToDatalinq(tcpClient,json)
})

// listens for a connection at httpport
app.listen(httpport, () => {
    console.log(`App is running on ${httpport}`)
})



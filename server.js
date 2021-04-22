const net = require('net');
const express = require('express');
const app = express();
const httpport = 8000;
const tcpport = 7327;
const host = 'localhost';

// Creat a new TCP client.
// const tcpClient = new Net.Socket();
// // Send a connection requres to the server.
// tcpClient.connect({ port: tcpport, host }, () => {
//     console.log('TCP connection established.');
//     tcpClient.write(JSON.stringify({name:"Taylor",age:32}));
// });
    
// tcpClient.on('error', (error) => {
//     console.error('There was an error', error);
// });


const server = net.createServer((socket) => {
    const obj = {name:"Taylor", dog:"Mattie"};
    let buffer = Buffer.from(JSON.stringify(obj));
    const nullBuffer = Buffer.from([0x00]);
    buffer = Buffer.concat([buffer, nullBuffer]);
    socket.write(buffer);
    socket.pipe(socket);
})

server.on('error', (error) => {
    console.error('There was an error', error);
})
server.listen(tcpport,host);





app.get('/', (request, response) => {
    response.json({ info: 'This is my string!'})
})

app.listen(httpport, () => {
    console.log(`App is running on ${httpport}`)
})
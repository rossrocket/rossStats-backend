const Election = require('./endpoints.js')
const { tcpClient } = require('./tcpClient.js');
const express = require('express');
const cors = require('cors');
const app = express();
const httpport = 8000;
const tcpport = 7327;
const host = 'localhost';

const allowedOrigins = [
    "http://localhost:3000"
].map(domain => new RegExp(`https?${domain.replace(/https?/, '')}`))

const corsOptions = {
    origin: allowedOrigins,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));

// response when receiving a get request
app.get('/', (request, response) => {
    const json = { info: 'Lets connect!' }
    response.json(json)
    writeToDatalinq(json)
})

app.get('/election/state/:state', Election.presByState)

// listens for a connection at httpport
app.listen(httpport, () => {
    console.log(`App is running on ${httpport}`)
})

// Create connection with TCP server (DataLinq).
tcpClient.connect({ port: tcpport, host }, () => {
    console.log('TCP connection established.');
});

tcpClient.on('error', (error) => {
    console.error('There was a client error', error);
});
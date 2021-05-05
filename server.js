require('dotenv').config();

const Election = require('./endpoints.js')
const Tcp = require('./tcpClient.js');
const express = require('express');
const cors = require('cors');
const app = express();
const httpport = 8000;


const allowedOrigins = [
    process.env.FRONTEND_BASE_URL_LOCAL,
    process.env.FRONTEND_BASE_URL_IP,
].map(domain => new RegExp(`https?${domain.replace(/https?/, '')}`))

const corsOptions = {
    origin: allowedOrigins,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// list of endpoints
app.get('/', (request, response) => {
    const json = { info: 'Lets connect!' }
    response.json(json)
    Tcp.writeToDatalinq(json)
});
app.get('/election/state/:state', Election.presByState);
app.post('/tcp/start', Tcp.startConnection);
app.post('/tcp/stop', Tcp.endConnection);

// listens for a connection at httpport
app.listen(httpport, () => {
    console.log(`App is running on ${httpport}`);
})


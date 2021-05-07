const net = require('net');

//Create a new TCP client.
const tcpClient = new net.Socket();
let isConnected = false;

const startConnection = (request, response) => {
    request.setTimeout(1000 * 60 * 5);
    if (!request.body) {
        return response.status(400).json({ error: { message: "host and port are required in body" } });
    };

    if (!request.body.host) {
        return response.status(400).json({ error: { message: "'host' is required" } });
    };

    if (!request.body.port) {
        return response.status(400).json({ error: { message: "'port' is required" } });
    };

    const { host, port } = request.body;

    try {
        // Create connection with TCP server (DataLinq).
        tcpClient.connect({ port, host }, () => {
            console.log(`TCP connection established at ${host}:${port}`);
            console.log(tcpClient.address());
            isConnected = true;
            return response.status(200).json({ message: "Connection established", host, port });
        });

        tcpClient.on('error', (error) => {
            console.error('There was a client error', error);
            return response.status(404).json({ error });
        });

        tcpClient.on('close', (hadError) => {
            isConnected = false;
            if (hadError) {
                console.log("TCP connection closed due to transmission error.");
            } else {
                console.log("TCP connection closed.");
            }
        });
    } catch (error) {
        console.log(JSON.stringify(error));
        return response.status(400).json({ error });
    }


};

const endConnection = (request, response) => {
    tcpClient.end();
    return response.status(200).json({ message: "TCP connection has been closed" })
};

const connectionStatus = (request, response) => {
    return response.status(200).json({ isConnected })
};

// stringifies json and concats a null then writes to the TCP socket
const writeToDatalinq = (json) => {
    if (!isConnected) {
        console.log("Tried to write to DataLinq, not connected");
        return;
    }
    let buffer = Buffer.from(JSON.stringify(json));
    const nullBuffer = Buffer.from([0x00]);
    buffer = Buffer.concat([buffer, nullBuffer]);
    tcpClient.write(buffer);
};

module.exports = {
    writeToDatalinq,
    startConnection,
    endConnection,
    connectionStatus,
};
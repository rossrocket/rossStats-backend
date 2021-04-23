const net = require('net');

//Create a new TCP client.
const tcpClient = new net.Socket();



// stringifies json and concats a null then writes to the TCP socket
const writeToDatalinq = (json) => {
    let buffer = Buffer.from(JSON.stringify(json));
    const nullBuffer = Buffer.from([0x00]);
    buffer = Buffer.concat([buffer, nullBuffer]);
    tcpClient.write(buffer);
}

module.exports = { 
    tcpClient,
    writeToDatalinq,
}
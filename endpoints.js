const convert = require('xml-js');
const fetch = require('node-fetch');
const { writeToDatalinq } = require('./tcpClient.js');

const presByState = async (request, response) => {
    console.log("GET /election/state/:state");
    const state = request.params.state.toUpperCase();
    const url = `https://www.secure1.newsroomsolutions.com/elx/presByCounty.cgi?state=${state}&apikey=7HvLor3CRW7rfGpNICLcBOoWCwE67dI4`;
    const result = await fetch(url);
    const asString = await result.text();
    const json = JSON.parse(convert.xml2json(asString));
    writeToDatalinq(json);
    return response.status(200).json(json);
}

module.exports = {
    presByState,
}
const convert = require('xml-js');
const fetch = require('node-fetch');
const { writeToDatalinq } = require('./tcpClient.js');

const presByState = async (request, response) => {
    console.log("GET /election/state/:state");
    const state = request.params.state.toUpperCase();
    const url = `https://www.secure1.newsroomsolutions.com/elx/presByCounty.cgi?state=${state}&apikey=7HvLor3CRW7rfGpNICLcBOoWCwE67dI4`;
    try {
        const result = await fetch(url);
        const asString = await result.text();
        const json = JSON.parse(convert.xml2json(asString));
        if (!json.elements[0].elements) {
            return response.status(404).json({ error: { message: `'${request.params.state}' is not a valid state abbreviation` } });
        }
        writeToDatalinq(json);
        return response.status(200).json(json);
    } catch (error) {
        return response.status(400).json({ error });
    }
}

module.exports = {
    presByState,
}
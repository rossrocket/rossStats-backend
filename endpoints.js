const convert = require('xml-js');
const fetch = require('node-fetch');

const presByState = async (request, response) => {
    const state = request.params.state.toUpperCase();
    const url = `https://www.secure1.newsroomsolutions.com/elx/presByCounty.cgi?state=${state}&apikey=7HvLor3CRW7rfGpNICLcBOoWCwE67dI4`;
    const result = await fetch(url);
    const asString = await result.text();
    return JSON.parse(convert.xml2json(asString));
}

module.exports = {
    presByState,
}
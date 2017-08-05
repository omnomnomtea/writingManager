const pg = require('pg');

let URL = 'postgres://localhost/twitter';
let client = new pg.Client(URL);

client.connect();

module.exports = client;

'use strict';

require('dotenv').config();

require('babel-register');

const server = require('./src/app.js');
const PORT = process.env.PORT;

server.start(PORT);
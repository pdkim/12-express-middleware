'use strict';

const debug = require('debug')('app');

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

let app = express();

let corsOptions = {
  origin: 'http://example.com',
};

app.use(cors(corsOptions));
app.use(morgan('dev'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));


import router from './api/api.js';
app.use(router);


app.use(notFound);
app.use(errorHandler);

let alreadyRunning = false;

let server;

module.exports = {
  start: (port) => {
    if(!alreadyRunning) {
      server = app.listen(port, (err) =>{
        if(err) {throw err;}

        alreadyRunning = true;
        console.log(`Server is up on port ${port}`);
      });
    }
    else {
      debug('Server already running on port', port);
    }
  },

  stop: () => {
    server.close( () => {
      alreadyRunning = false;
      console.log('Server is closed');
    });
  },
};

'use strict';

const debug = require('debug')('api');

import express from 'express';
const router = express.Router();

import modelFinder from '../middleware/models.js';
router.param('model', modelFinder);


/**
* @param res
* @param data
*/

let sendJSON = (res, data) => {
  res.status(200);
  res.json(data);
};


//GET ONE
router.get('/api/v1/:model/:id', (req, res, next) => {
  if (req.params.id) {
    req.model.findOne(req.params.id)
      .then(data => sendJSON(res, data))
      .catch(next);
  }
});

//GET ALL
router.get('/api/v1/:mmdel', (req, res, next) => {
  debug('Get all');
  if (req.params.body === undefined) {
    res.status(400).send('Bad Request');
  }
  else {
    req.model.fetchAll()
      .then(data => sendJSON(res, data))
      .catch(next);
  }
});

//DELETE
router.delete('/api/v1/:model/:id', (req, res, next) => {
  if (req.params.id === '' || !req.params.id) {
    res.status(400).send('Bad Request');
  }
  else {
    Worker.deleteOne(req.params.id)
      .then(() => {
        res.statusCode = 204;
        res.statusMessage = 'OK';
        res.end();
      })
      .catch(next);
  }
});

//POST
router.post('/api/v1/:model', (req, res, next) => {
  if (req.body.firstName === undefined && req.body.lastName === undefined && req.body.hourlyWage === undefined) {
    res.status(400).send('Bad Request');
  }
  else {
    let record = new req.model(req.body);

    record.save()
      .then(data => sendJSON(res, data))
      .catch(next);
  }
});


export default router;
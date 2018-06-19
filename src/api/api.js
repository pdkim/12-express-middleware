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
  req.model.findOne(req.params.id)
    .then(data => sendJSON(res, data))
    .catch(next);
});

//GET ALL
router.get('/api/v1/:model', (req, res, next) => {
  req.model.fetchAll()
    .then(data => sendJSON(res, data))
    .catch(next);
});

//DELETE
router.delete('/api/v1/:model/:id', (req, res, next) => {
  Worker.deleteOne(req.params.id)
    .then(() => {
      res.statusCode = 204;
      res.statusMessage = 'OK';
      res.end();
    })
    .catch(next);
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

router.put('/api/v1/:model/:id', (req, res, next) => {
  if (req.params.body === '' || req.params.body === undefined) {
    res.status(400).send('Bad Request');
  }
  else {
    Worker.put(req.params.id)
      .then(() => {
        res.status(200).send(JSON.stringify(req.body));
      })
      .catch(next);
  }
});


export default router;
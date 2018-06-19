'use strict';

/**
 * @param req
 * @param res
 * @param next
 */

export default (err, req, res, next) => {
  console.log('In the error handler');
  res.status(500);
  res.statusMessage = 'Server Error';
  res.send(JSON.stringify(err));
  console.log(next);
};
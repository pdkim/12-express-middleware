'use strict';

/**
 * @param req
 * @param res
 * @param next
 */

export default (err, req, res, next) => {
  console.log('In the error handler');
  res.status(500);
  res.send('error found');
};
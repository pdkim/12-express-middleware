'use strict';

/**
 * @param req
 * @param res
 * @returns {*}
 */

import requireAll from 'require-directory';
const models = requireAll(module, '../models');

export default (req, res, next) => {
  try {
    let model = req && req.params && req.params.model;
    if(model && models[model] && models[model].default) {
      req.model = models[model].default;
      next();
    }
    else {throw 'Model not found';}
  }
  catch(err) {
    throw err;
  }
};
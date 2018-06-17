'use strict';

jest.mock('require-dir');

import modelFinder from '../../src/middleware/models.js';

describe('Middelware module should', () => {
  
  xit('throw an error if a vaid model is not present', () => {
    let req = {};
    let res = {};
    let next = () => {};
    expect(() => {
      modelFinder(req, res, next);
    }).toThrow();
  });

  xit('return an object/function when a valid model is requested', () => {
    let req = {params: {model:'work please'}};
    let res = {};
    let next = () => {};
    modelFinder(res, req, next);
    expect(req.model).toBeDefined();
  });
});
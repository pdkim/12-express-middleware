'use strict';

import superAgent from 'superagent';

import app from '../../src/app.js';

const apiUrl = 'http://localhost:3003/api/v1/worker';


describe('the application should', () => {

  beforeAll(() => {
    app.start(3003);
  });

  afterAll(() => {
    app.stop();
  });

  it('return an empty object', () => {

    return superAgent
      .get(apiUrl)
      .then(results => {
        const worker = JSON.parse(results.text);
        expect(worker).toEqual({});

      });

  });

  it('create a new worker', () => {

    const newWorker = {
      'firstName': 'Phil',
      'lastName': 'Kim',
      'hourlyWage': '100',
    };

    return superAgent.post(apiUrl).send(newWorker).then(results => {

      const worker = JSON.parse(results.text);
      expect(worker.firstName).toBe('Phil');
    });

  });

  it('retrieve a single worker', () => {

    const newWorker = {
      'firstName': 'Phil',
      'lastName': 'Kim',
      'hourlyWage': '100',
    };

    return superAgent.post(apiUrl)
      .send(newWorker)
      .then(results => {

        const postedWorker = JSON.parse(results.text);

        return superAgent.get(apiUrl + '/' + postedWorker.id)
          .then(results => {
            const dataWorker = JSON.parse(results.text);
            expect(dataWorker.firstName).toBe('Phil');

          });
      });
  });

  it('change content to new values', () => {

    const newWorker = {
      'firstName': 'Phil',
      'lastName': 'Kim',
      'hourlyWage': '100',
    };

    const betterWorker = {
      'firstName': 'JB',
      'lastName': 'Tellez',
      'hourlyWage': 'over 9000!!!',
    };

    return superAgent.post(apiUrl)
      .send(newWorker)
      .then(results => {

        const postedWorker = JSON.parse(results.text);

        return superAgent.put(apiUrl + '/' + postedWorker.id)
          .send(betterWorker)
          .then(results => {
            const dataWorker = JSON.parse(results.text);
            expect(dataWorker.firstName).toBe('JB');
          });
      });
  });

});
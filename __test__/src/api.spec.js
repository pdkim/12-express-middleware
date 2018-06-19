'use strict';

import superagent from 'superagent';

import app from '../../src/app.js';


describe('API module should', () => {

  beforeAll(() => {
    app.start(3002);
  });

  afterAll(() => {
    app.stop();
  });

  it('return 404 status code when passed a non-registered route', () => {
    return superagent
      .get('http://localhost:3002/pokemon')
      .catch(res => {
        expect(res.status).toBe(404);
      });
  });

  it('return 500 status code when an invalid id is passed', () => {
    return superagent
      .get('http://localhost:3002/api/v1/worker/1223')
      .catch(res => {
        expect(res.status).toBe(500);
      });
  });

  it('return 200 status code when a valid id is entered', () => {
    let id;
    return superagent
      .post('http://localhost:3002/api/v1/worker/')
      .send({
        firstName: 'Phil',
        lastName: 'Kim',
        hourlyWage: '$50',
      })
      .then(data => {
        id = data.params.id;
        return superagent
          .get(`http://localhost:3002/api/v1/worker/${id}`)
          .then(res => {
            expect(res.statusCode).toBe(200);
          })
          .catch(res => console.error(res));
      })
      .catch(res => console.error('post failed at ', res));
  });


  it('return 200 status code when posting with content', () => {
    return superagent
      .post('http://localhost:3002/api/v1/worker/')
      .send({
        firstName: 'Phil',
        lastName: 'Kim',
        hourlyWage: '$50',
      })
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
      })
      .catch(res => console.error(res));
  });
});
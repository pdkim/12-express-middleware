'use strict';

import storage from '../storage/data-store.js';

import uuid from 'uuid/v1';


class Worker {
  /**
   * @param config
   */

  constructor(config) {
    this.id = uuid();
    this.hireDate = new Date();
    this.firstName = config && config.firstName || '';
    this.lastName = config && config.lastName || '';
    this.hourlyWage = config && config.hourlyWage || '';
  }

  /**
   * @returns {*}
   */
  save() {
    return storage.save(this);
  }

  /**
   * @returns {*}
   */

  static fetchAll() {
    return storage.getAll();
  }

  static findOne(id) {
    return storage.get(id);
  }

  static updateOne(criteria) {
    console.log(criteria);
    return storage.update(this);
  }

  static deleteOne(id) {
    return storage.delete(id);
  }

}

export default Worker;
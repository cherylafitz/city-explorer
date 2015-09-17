/**
* Location.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    lon: {
      type: 'string'
    },
    lat: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    // associations
    users: {
      collection: 'User',
      via: 'locations'
    },

    ll: function() {
      return this.lat + ',' + this.lon;
    }

  }
};


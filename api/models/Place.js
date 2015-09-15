/**
* Place.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    kind: {
      type: 'string'
    },
    img_url: {
      type: 'string'
    },
    rating: {
      type: 'float'
    },
    url: {
      type: 'string'
    },
    lon: {
      type: 'float'
    },
    lat: {
      type: 'float'
    },
    yelp_id: {
      type: 'string',
      required: true
    },
    snippet_text: {
      type: 'string'
    },
    display_address: {
      type: 'array'
    },
    visited: {
      type: 'boolean'
    },
    willVisit: {
      type: 'boolean'
    },
    url: {
      type: 'string'
    },

    // associations
    owner:{
      model:'User',
      defaultsTo:null
    }

  }
};


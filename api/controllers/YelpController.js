/**
 * YelpController
 *
 * @description :: Server-side logic for managing yelps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var yelp = require("yelp").createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});
var request = require('request');
var async = require('async');

module.exports = {

  search: function(req,res) {
    // if (currentUser) {
    //   var uid = req.session.user.id;
    // }
    var ip = '157.130.186.54';
    var ll = '';
    var term = req.query.term;
    var location = req.query.location;
    console.log('my ip', ip);
    // var manipData = function(error, data) {
    //   res.send(data.businesses);
    // };
    var manipData = function(error, data) {
      console.log(data)
      var newData = {};
      data.businesses.forEach(function(item){
        var id = item.id;
        newData[id] = item
      })
      // });
      res.send(newData);
    };

    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log('session', req.session)

    async.waterfall([
      function(callback){
        console.log('first waterfall function');
        request({
          url:'http://ip-api.com/json/' + ip
        },function(error,response, body){
          if(!error && response.statusCode === 200){
            //optionally do some pre-proccessing here
            // console.log(body)
            body = JSON.parse(body)
            ll = body.lat + ',' + body.lon
            // console.log('ll',ll)
          }else{
            console.log({
              error:error,
              code:response.statusCode || 'not connected'
            });
          }
          console.log('ll before callback',ll);
          callback(null,ll);
        });
      },
      function(ll, callback) {
        // console.log('ll~!!!', ll)
        if (req.query.location) {
          yelp.search({location: req.query.location, sort: 2, term: term}, manipData);
        } else if (ll) {
          yelp.search({ll: ll, sort: 2, term: term}, manipData);
        } else if (req.query.ll) {
          yelp.search({ll: req.query.ll, sort: 2, term: term}, manipData);
        } else {
          yelp.search({location: 'New York City', sort: 2, term: term}, manipData);
        }
        callback(null,'data');
      }
      ],function(err,data) {
      console.log('err',err);
      console.log('DONE!!!',data)
    });

    // res.send('test')


    // yelp.business("s", function(error, data) {
    //   // res.send(error);
    //   res.send(data);
    // });
  }

};


/// 5 things do do with async waterfall:
// check location?, call to yelp, call to yelp again?, manipulate data for user



// yelpIds = yelpData.map(function(item){
//   return {yelpId: item.id}
// });

// var searchCritera = { where:
//   {
//     or : [
//       { yelpId: '123' },
//       { yelpId: '456' }
//     ]
//   }
// }

// User.findOne(req.session.user.id).populate('places',searchCritera).then(function(user){

// });




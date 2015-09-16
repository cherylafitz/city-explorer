/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');

// var bcrypt = require('bcrypt');

module.exports = {

  // create: function(req,res) {
  //   User.create({
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     email: req.body.email,
  //     password: req.body.password,

  //   })
  // }

  createPlace: function(req, res){
    res.send(req.body);
  },

  setLocation: function(req,res){
    // function(callback){
    var ip = '157.130.186.54';
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (req.session.user) {
      var uid = req.session.user.id;
        console.log('setting location');
        request({
          url:'http://ip-api.com/json/' + ip
        },function(error,response, body){
          if(!error && response.statusCode === 200){
            //optionally do some pre-proccessing here
            // console.log(body)
            body = JSON.parse(body)
            ll = body.lat + ',' + body.lon
            location = body.city + ', ' + body.region
            // console.log('ll',ll)
            User.findOneById(uid).then(function(user){
              user.ll = ll;
              user.location = location;
              user.save();
            })
          }else{
            console.log({
              error:error,
              code:response.statusCode
            });
          }
          console.log('ll before callback',ll);
        });
      }
    res.send(req.session.user)

  }

};


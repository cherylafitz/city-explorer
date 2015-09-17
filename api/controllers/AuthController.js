/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

  login: function(req,res) {
    User.findOneByEmail(req.body.email).then(function(user){
      if(user){
        bcrypt.compare(req.body.password, user.password, function(err, result){
          if(err) return res.send({result:false, error: err});

          if(result){
            req.session.user = user;
            res.send({
              result: true,
              user: user
            });
          }else{
            res.send({
              result: false,
              error: 'Invalid Password.'
            })
          }
        });
      }else{
        res.send({
          result:false,
          error:'Unknown User.'
        });
      }
      if (req.session.user && user.defaultLocation.length === 0) {
        // development ip
        var ip = '157.130.186.54';
        // production ip
        // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (req.session.user) {
        var uid = req.session.user.id;
          console.log('setting location');
          request({
            url:'http://ip-api.com/json/' + ip
          },function(error,response, body){
            if(!error && response.statusCode === 200){
              body = JSON.parse(body)
              ll = body.lat + ',' + body.lon
              location = body.city + ', ' + body.region
              // console.log('ll',ll)
              User.findOneById(uid).then(function(user){
                user.ll = ll;
                user.defaultLocation = location;
                user.save();
              })
            }else{
              console.log({
                error:error,
                code:response.statusCode
              });
            }
            // console.log('ll before callback',ll);
          });
        }
      }
    });
  },

  logout: function(req,res) {
    delete req.session.user;
    res.send({result: true});
  },

  check: function(req,res) {
    res.send({user: req.session.user || false})
  }

};




module.exports = function(req, res, next) {

  User.findOneById("55f4c5e7749a6fe3b6428b18").then(function(user){
    if(user){
      req.session.user = user;
    }else{
      console.log('failed to auto login')
    }
    next();
  }).catch(function(err){
    console.log('failed to auto login', err)
    next();
  });

};
CityExplorer.factory('UserService', ['$http', function($http) {

  return {
    //log the user in via $http
    //trigger callback function when finished
    login: function(email, password, callback) {
      var self = this;
      $http.post('/api/auth',{
        email:email,
        password:password
      }).success(function(data){
        if(data && data.result && data.user) {
          self.currentUser = data.user;
        }else{
          self.currentUser = false;
        }
        callback(null, data);
      }).error(callback);
    },
    //check user login status via $http
    //trigger callback function with results
    check: function(callback) {
      var self = this;
      $http.get('/api/auth').success(function(data){
        if(data && data.user) {
          self.currentUser = data.user;
        }else{
          self.currentUser = false;
        }
        callback(null, data);
      }).error(callback);
    },
    //log the user out via $http
    //trigger callback function when finished
    logout: function(callback) {
      this.currentUser = false;

      $http.delete('/api/auth')
      .success(function(data){
        callback(null,data);
      }).error(callback);
    }
  }

}]);
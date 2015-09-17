CityExplorer.controller('AuthSignupCtrl', ['$scope','$mdDialog','UserService','$http','$rootScope', function($scope,$mdDialog,UserService,$http,$rootScope){


  $scope.user={
    firstName: '',
    lastName: '',
    email:'',
    password:'',
    location:''
  };

  $scope.cancel = function () {
    $mdDialog.cancel('data sent back');
  }

  $scope.signup = function(){
    $http.post('/api/user',$scope.user).success(function(data){
      console.log('data',data);
      // $modalInstance.close();
      $mdDialog.hide(data);
      $http.get('api/user/setLocation',$scope.user).success(function(data){
        console.log('success?',$scope.user);
        User.findOneById($scope.user.id).then(function(user){
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
      });
    }).error(function(err){
      alert('Nope... could not create a user.');
      console.log('err',err);
    });
  }
}]);



CityExplorer.controller('AuthSignupCtrl', ['$scope','$mdDialog','UserService','$http','$rootScope','User', function($scope,$mdDialog,UserService,$http,$rootScope,User){


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
        UserService.login($scope.user.email, $scope.user.password, function(err, data){
          if(err){
            console.log(err);
            alert('Something terrible happened.');
          } else if(data && data.result) {
            console.log(data);
            $mdDialog.hide();
          } else {
            console.log(data);
            // $mdDialog.hide();
            alert('Unable to login.');
          }
        });
      });
    }).error(function(err){
      alert('Nope... could not create a user.');
      console.log('err',err);
    });
  }
}]);



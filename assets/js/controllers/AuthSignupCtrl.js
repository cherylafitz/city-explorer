CityExplorer.controller('AuthSignupCtrl', ['$scope','$mdDialog','UserService','$http', function($scope,$mdDialog,UserService,$http){


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
      });
    }).error(function(err){
      alert('Nope... could not create a user.');
      console.log('err',err);
    });
  }
}]);



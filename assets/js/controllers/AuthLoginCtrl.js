CityExplorer.controller('AuthLoginCtrl', ['$scope','$mdDialog','UserService','$http', function($scope,$mdDialog,UserService,$http){


  $scope.user={email:'',password:''};

  $scope.cancel = function () {
    $mdDialog.cancel('data sent back');
  }

  $scope.login = function(){
    console.log('login')
    console.log('email',$scope.user.email)
    console.log('email',$scope.user.password)
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
  }
}]);



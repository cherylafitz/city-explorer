CityExplorer.controller('NavCtrl', ['$scope','$mdDialog','$http','$rootScope','UserService', function($scope,$mdDialog,$http,$rootScope,UserService){

  console.log('nav controller');

  console.log('location',$rootScope.location);


  $scope.UserService = UserService;
  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
  });
  // $scope.currentUser = UserService.currentUser

  console.log('current user',$scope.currentUser);

  $scope.showLogin = function(ev) {
    $mdDialog.show({
      controller: 'AuthLoginCtrl',
      templateUrl: '/views/auth/login.html',
      // template: 'test',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
    // .then(function(data) {
    //   //triggered by hide
    //   // alert('hide');
    //   // console.log(data);
    // }, function(data) {
    //   //triggered by cancel
    //   // alert('cancel');
    //   // console.log(data);
    // });
  };
  $scope.showSignup = function(ev) {
    $mdDialog.show({
      controller: 'AuthSignupCtrl',
      templateUrl: '/views/auth/signup.html',
      // template: 'test',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
  };

  $scope.logout = function(){
    UserService.logout(function(err,data){
      //do nothing...
    });
  }
  console.log('current user',$scope.currentUser);

}]);



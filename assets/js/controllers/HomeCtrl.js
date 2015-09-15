CityExplorer.controller('HomeCtrl', ['$scope', '$http','$rootScope','UserService','Place','User','UserPlace', function($scope,$http,$rootScope,UserService,Place,User,UserPlace){

  console.log('home controller');

  $scope.chosenLocation = '';
  $scope.attractions = [];
  $scope.restaurants = [];
  $scope.detectedLocation = '';
  $scope.currentUser = UserService.currentUser;
  // $scope.willVisit
  // $scope.visited
  // $scope.place

  // $scope.$watchCollection('UserService',function(){
  //   $scope.currentUser = UserService.currentUser;
  // });

  $scope.addPlace = function(attraction,idx,status) {
      var visited;
      var willVisit;
    if (status === 'visited') {
      visited = true;
      willVisit = false;
    } else if (status === 'willVisit') {
      willVisit = true;
      visit = false;
    } else {
      willVisit = false;
      visit = false;
    }

    console.log('item', idx)
    console.log('status', status)

    // console.log('willVisit', willVisit)

    console.log('attraction',attraction);
    // $scope.visited = !$scope.visited;
    // $scope.willVisit = !$scope.willVisit;
    $scope.place = {
      name:attraction.name,
      img:attraction.image_url,
      snippet_text: attraction.snippet_text,
      display_address: attraction.display_address,
      lon: attraction.location.coordinate.longitude,
      lat: attraction.location.coordinate.latitude,
      yelp_id: attraction.id,
      visited: visited,
      willVisit: willVisit
    }

    var newPlace = new Place($scope.place)
    if ($scope.currentUser) {
      newPlace.$save().then(function(place){
        console.log('saved',place);
      }).catch(function(err){
        console.log('err',err);
      });
    }
  }

  //   $scope.$watchCollection('UserService',function(){
  //   $scope.currentUser = UserService.currentUser;
  // });

  console.log('current user',$scope.currentUser);

  $scope.UserService = UserService;
  $scope.User = User;
  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
    // $scope.places = user;
  });

  $scope.setLocation = function() {
    console.log($scope.chosenLocation);
    getRestaurants();
    getAttractions();
  }

  var getRestaurants = function(searchTerm) {
    console.log('searching... and testing', $scope.detectedLocation && ($scope.chosenLocation.length === 0));

    $rootScope.location = $scope.detectedLocation && ($scope.chosenLocation.length === 0) ? 'll=' + $scope.detectedLocation : 'location=' + $scope.chosenLocation;
    // var locTerms = 'location=' + location
    return $http({
      url:'/api/yelp/search?' + $rootScope.location + '&term=restaurants',
    }).then(function(data){
      console.log('food', data.data.businesses)
      $scope.restaurants = data.data.businesses;
      // return $scope.restaurants;
    });
  }

  var getAttractions = function(searchTerm) {
    console.log('searching...');
    $rootScope.location = $scope.detectedLocation && ($scope.chosenLocation.length === 0) ? 'll=' + $scope.detectedLocation : 'location=' + $scope.chosenLocation;
    return $http({
      url:'/api/yelp/search?' + $rootScope.location + '&term=attractions',
    }).then(function(data){
      console.log('attractions', data.data.businesses)
      $scope.attractions = data.data.businesses;
      // return $scope.attractions;
    });
  }

  $scope.$evalAsync(function(){
      getAttractions();
      getRestaurants();
  })

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position){
  //     $scope.$evalAsync(function(){
  //       $scope.detectedLocation = position.coords.latitude + ',' + position.coords.longitude;
  //       console.log($scope.detectedLocation)
  //     });
  //   });
  // }

}]);
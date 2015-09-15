CityExplorer.controller('HomeCtrl', ['$scope', '$http','$rootScope','UserService','Place','User','UserPlace', function($scope,$http,$rootScope,UserService,Place,User,UserPlace){

  console.log('home controller');

  $scope.chosenLocation = '';
  $scope.attractions = [];
  $scope.restaurants = [];
  // $scope.detectedLocation = '';
  $scope.currentUser = UserService.currentUser;

  $scope.addPlace = function(attraction,idx,status) {
      var visited;
      var willVisit;
    if (status === 'visited') {
      visited = true;
      willVisit = false;
    } else if (status === 'willVisit') {
      visited = false;
      willVisit = true;
    } else {
      visited = false;
      willVisit = false;
    }

    console.log('item', idx)
    console.log('status', status)

    // console.log('willVisit', willVisit)

    console.log('attraction',attraction);
    // $scope.visited = !$scope.visited;
    // $scope.willVisit = !$scope.willVisit;
    $scope.place = {
      name:attraction.name,
      kind: 'attraction',
      image_url:attraction.image_url,
      snippet_text: attraction.snippet_text,
      display_address: attraction.display_address,
      // lon: attraction.location.coordinate.longitude || lon,
      // lat: attraction.location.coordinate.latitude || lat,
      yelp_id: attraction.id,
      visited: visited,
      willVisit: willVisit,
      index: idx
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

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
  });

  $scope.setLocation = function() {
    console.log($scope.chosenLocation);
    getRestaurants();
    getAttractions();
  }

  var getRestaurants = function(searchTerm) {
    $scope.location = $scope.detectedLocation && ($scope.chosenLocation.length === 0) ? 'll=' + $scope.detectedLocation : 'location=' + $scope.chosenLocation;
    return $http({
      url:'/api/yelp/search?' + $scope.location + '&term=restaurants',
    }).then(function(data){
      console.log('food', data.data)
      $scope.restaurants = data.data;
      // return $scope.restaurants;
    });
  }

  Place.query().then(function(all_places){
    UserPlace.query({
      user_id:$scope.currentUser.id
    }).then(function(places){
      console.log('userid',$scope.currentUser.id)
      console.log('places',places)
    });
      $scope.places = all_places;
  });
  // UserPlace.query({
  //   user_id:$scope.currentUser.id
  // }).then(function(places){
  //   console.log('userid',$scope.currentUser.id)
  //   console.log('places',places)
  //   $scope.places = places;
  // });
  // $scope.places =

  // var getUserPlaces = function(){
  //   return $http({
  //     url:'/api/user/' + $scope.currentUser.id + '/places'
  //   }).then(function(places){
  //     console.log('places from http',places)
  //      $scope.myPlaces = places
  //   })
  // }

  var getAttractions = function(searchTerm) {
    // $scope.places = getUserPlaces();
    $scope.location = $scope.detectedLocation && ($scope.chosenLocation.length === 0) ? 'll=' + $scope.detectedLocation : 'location=' + $scope.chosenLocation;
    return $http({
      url:'/api/yelp/search?' + $scope.location + '&term=attractions',
    }).then(function(data){

      $scope.places.forEach(function(place, index) {
        console.log('place in for each',place);
        console.log('index in for each',index);
        for (key in data.data) {
          console.log('key',key);
          console.log('place',place.yelp_id);
          console.log('does key = place.id?', key === place.yelp_id)
          console.log($scope.places[index]);
          if (key === place.yelp_id) {
            data.data[key] = $scope.places[index];
          }
        }
      })

      console.log('attractions', data)
      $scope.attractions = data.data;
    });
  }
  $scope.$watch('attractions', function(newVal, oldVal){
    // alert('change!')
    console.log(newVal,oldVal);
    console.log('change')
  },true);

  $scope.$evalAsync(function(){
      getAttractions();
      getRestaurants();
  })

}]);

CityExplorer.controller('HomeCtrl', ['$scope', '$http','$rootScope','UserService','Place','User','UserPlace', function($scope,$http,$rootScope,UserService,Place,User,UserPlace){

  console.log('home controller');

  $scope.chosenLocation = '';
  $scope.attractions = [];
  $scope.restaurants = [];
  // not using detected location unless proves necessary
  // $scope.detectedLocation = '';
  $scope.currentUser = UserService.currentUser;


  // adds place to database, or updates values if it already exists
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
    console.log('attraction',attraction);

    var id = attraction.yelp_id || attraction.id;
    if (attraction.location) {
      var longitude = attraction.location.coordinate.longitude;
      var latitude = attraction.location.coordinate.latitude;
    } else {
      var lattitude = attraction.lat
      var longitude = attraction.lon;
    }
    var place = {
      name:attraction.name,
      kind: 'attraction',
      image_url:attraction.image_url,
      snippet_text: attraction.snippet_text,
      display_address: attraction.display_address,
      lon: longitude,
      lat: latitude,
      yelp_id: id,
      visited: visited,
      willVisit: willVisit,
      index: idx,
      url: attraction.url
    }

    var newPlace = new Place(place)
    if ($scope.currentUser) {
      newPlace.$save().then(function(place){
        console.log('saved',place);
        //$scope.attractions[idx].visted = visited;
        attraction.visited = visited;
        attraction.willVisit = willVisit;
      }).catch(function(err){
        console.log('err',err);
      });
    }
  }

  // watches current user
  $scope.UserService = UserService;
  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
  });

  // to be used for changing default location
  $scope.setLocation = function() {
    console.log($scope.chosenLocation);
    getRestaurants();
    getAttractions();
  }

  // calls for yelp restaurant data
  var getRestaurants = function(searchTerm) {
    $scope.location = $scope.detectedLocation && ($scope.chosenLocation.length === 0) ? 'll=' + $scope.detectedLocation : 'location=' + $scope.chosenLocation;
    return $http({
      url:'/api/yelp/search?' + $scope.location + '&term=restaurants',
    }).then(function(data){
      console.log('food', data.data)
      $scope.restaurants = data.data;
    });
  }

  // gets all places in database to load and compare to api data (needs to be for current user)
  // Place.query().then(function(all_places){
  //     $scope.places = all_places;
  // });

  // attempts to get places only for current user.

  UserPlace.query({
    user_id:$scope.currentUser.id
  }).then(function(places){
    console.log('userid',$scope.currentUser.id)
    console.log('UserPlaces',places)
    $scope.places = places;
  });


  // function(){
  //   if ($scope.currentUser) {
  //     return $http({
  //       url:'/api/user/' + $scope.currentUser.id + '/places'
  //     }).then(function(places){
  //       console.log('places from http',places)
  //        $scope.myPlaces = places
  //     })
  //   } else {
  //     $scope.myPlaces = [];
  //   }
  // }

  // calls for yelp attraction data
  var getAttractions = function(searchTerm) {
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
  // $scope.$watchCollection('attractions', function(){
  //   // alert('change!')
  //   console.log('change')
  // },true);
  // $scope.$watch('attractions', function(){
  //   // alert('change!')
  //   console.log('change')
  // },true);

  $scope.$evalAsync(function(){
      getAttractions();
      getRestaurants();
  })

}]);

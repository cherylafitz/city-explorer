CityExplorer.controller('HomeCtrl', ['$scope', '$http','$rootScope','UserService','Place','User','UserPlace','AlertService','$mdSidenav','$timeout', function($scope,$http,$rootScope,UserService,Place,User,UserPlace,AlertService,$mdSidenav,$timeout){

  console.log('home controller');

  $scope.chosenLocation = '';
  $scope.attractions = [];
  $scope.restaurants = [];
  // not using detected location unless proves necessary
  // $scope.detectedLocation = '';
  $scope.currentUser = UserService.currentUser;


  // adds place to database, or updates values if it already exists
  $scope.addPlace = function(yelpPlace,idx,status,type) {
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
    // console.log('attraction',attraction);

    var id = yelpPlace.yelp_id || yelpPlace.id;
    if (yelpPlace.location) {
      var longitude = yelpPlace.location.coordinate.longitude;
      var latitude = yelpPlace.location.coordinate.latitude;
    } else {
      var latitude = yelpPlace.lat
      var longitude = yelpPlace.lon;
    }
    var place = {
      name:yelpPlace.name,
      kind: type,
      image_url:yelpPlace.image_url,
      snippet_text: yelpPlace.snippet_text,
      display_address: yelpPlace.display_address,
      lon: longitude,
      lat: latitude,
      yelp_id: id,
      visited: visited,
      willVisit: willVisit,
      index: idx,
      url: yelpPlace.url
    }

    var newPlace = new Place(place)
    if ($scope.currentUser) {
      newPlace.$save().then(function(place){
        console.log('saved',place);
        //$scope.yelpPlaces[idx].visted = visited;
        yelpPlace.visited = visited;
        yelpPlace.willVisit = willVisit;
      }).catch(function(err){
        console.log('err',err);
      });
    } else {
      AlertService.add('forbidden','Please log in to save your preferences.')
      $rootScope.showLogin();
    }
  }

  // watches current user
  $scope.UserService = UserService;
  $scope.$watchCollection('UserService',function(){
    console.log('change')
    $scope.currentUser = UserService.currentUser;
    $timeout(function(){
        $scope.attractions = [];
      $scope.$evalAsync(function(){
        getAttractions('&term=attractions','attractions');
        getAttractions('&term=restaurants&limit=10','restaurants');
      })
        // getAttractions();
    },1000)
  });

  // to be used for changing default location
  $scope.setLocation = function() {
    console.log($scope.chosenLocation);
    getRestaurants();
    getAttractions();
  }
  $scope.replaceApiData = function(data) {
      $scope.places.forEach(function(place, index) {
      // console.log('place in for each',place);
      // console.log('index in for each',index);
      for (key in data.data) {
        // console.log('key',key);
        // console.log('place',place.yelp_id);
        // console.log('does key = place.id?', key === place.yelp_id)
        // console.log($scope.places[index]);
        if (key === place.yelp_id) {
          data.data[key] = $scope.places[index];
        } else {
          data.data[key] = data.data[key];
        }
      }
    })
  }

  // calls for yelp restaurant data
  var getRestaurants = function(searchTerm) {
    $scope.getPlaces();
    $scope.location = $scope.detectedLocation && ($scope.chosenLocation.length === 0) ? 'll=' + $scope.detectedLocation : 'location=' + $scope.chosenLocation;
    return $http({
      url:'/api/yelp/search?' + $scope.location + '&term=restaurants&limit=10',
    }).then(function(data){
      $scope.replaceApiData(data);

      console.log('food', data.data)
      $scope.restaurants = data.data;
    });
  }

  // gets all places in database to load and compare to api data (needs to be for current user)
  // Place.query().then(function(all_places){
  //     $scope.places = all_places;
  // });

  // attempts to get places only for current user.
  $scope.getPlaces = function() {
    if ($scope.currentUser) {
      UserPlace.query({
        user_id:$scope.currentUser.id
      }).then(function(places){
        console.log('userid',$scope.currentUser.id)
        console.log('UserPlaces',places)
        $scope.places = places;
      });
    } else {
      $scope.places = ['none'];
    }
  }


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
  var getAttractions = function(searchTerm,category) {
    $scope.getPlaces();
    $scope.location = $scope.detectedLocation && ($scope.chosenLocation.length === 0) ? 'll=' + $scope.detectedLocation : 'location=' + $scope.chosenLocation;
    return $http({
      url:'/api/yelp/search?' + $scope.location + searchTerm,
    }).then(function(data){
      $scope.replaceApiData(data);

      console.log('attractions', data)
      if (category === 'attractions') {
        $scope.attractions = data.data;
      } else if (category === 'restaurants') {
        $scope.restaurants = data.data;
      }
    });
  }

  $scope.$evalAsync(function(){
      getAttractions('&term=attractions','attractions');
      getAttractions('&term=restaurants&limit=10','restaurants');
      // getRestaurants();
  })


// map sidenav

  // $scope.toggleRight = buildToggler('right');
  //   /**
  //    * Build handler to open/close a SideNav; when animation finishes
  //    * report completion in console
  //    */
  //   function buildToggler(navID) {
  //     var debounceFn =  $mdUtil.debounce(function(){
  //           $mdSidenav(navID)
  //             .toggle()
  //             .then(function () {
  //               $log.debug("toggle " + navID + " is done");
  //             });
  //         },200);
  //     return debounceFn;
  //   }
  // })

}]);

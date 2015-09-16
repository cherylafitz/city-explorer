CityExplorer.controller('MapCtrl', ['$scope','UserService','UserPlace', function($scope,UserService,UserPlace){

  console.log('map controller');

  $scope.currentUser = UserService.currentUser;

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
  });

  if ($scope.currentUser) {
    UserPlace.query({
      user_id:$scope.currentUser.id
    }).then(function(places){
      console.log('userid',$scope.currentUser.id)
      console.log('UserPlaces',places)

      $scope.markers = {};
      places.forEach(function(item,index) {
        if (item.visited === true || item.willVisit === true) {
        $scope.markers['m' + (index + 1)] = {'lat': item.lat,'lng': item.lon,'visited': item.visited, 'willVisit': item.willVisit}
        }
      })
      console.log($scope.markers)
    });
  } else {
    $scope.places = ['none'];
  }

    var mainMarker = {
        lat: 51,
        lng: 0,
        focus: true,
        message: "Hey, drag me if you want",
        draggable: true
    };
    angular.extend($scope, {
        seattle: {
          lat: 47.6097,
          lng: -122.3331,
          zoom: 13
        },
        zoom: 5,
        defaults: {
        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        maxZoom: 14,
        path: {
            weight: 10,
            color: '#800000',
            opacity: 1,
            zoom:20
          }
        },

        markers: $scope.markers,
        position: {
            lat: 51,
            lng: 0
        },
        events: { // or just {} //all events
            markers:{
              enable: [ 'dragend' ]
              //logic: 'emit'
            }
        }
    });

    $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
        $scope.position.lat = args.model.lat;
        $scope.position.lng = args.model.lng;
    });

}]);
CityExplorer.factory('ToastService', ['$rootScope','$mdToast', function($rootScope,$mdToast){

  return {

    showSimpleToast: function() {
      $mdToast.show(
        $mdToast.simple()
          .content('Simple Toast!')
          .position($rootScope.getToastPosition())
          .hideDelay(3000)
      );
    },
    last: {
          bottom: false,
          top: true,
          left: false,
          right: true
        },
    toastPosition: angular.extend({},this.last),
    getToastPosition: function() {
      sanitizePosition();
      return Object.keys($rootScope.toastPosition)
        .filter(function(pos) { return $rootScope.toastPosition[pos]; })
        .join(' ');
    },
    sanitizePosition: function(){
      var current = $rootScope.toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
    }
  }

}]);
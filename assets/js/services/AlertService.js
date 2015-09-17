CityExplorer.factory('AlertService', function(){

  var alerts = [];

  return {
    clear: function(){
      alerts = [];
    },
    add: function(type, text) {
      alerts.push({type:type, text:text});
    },
    get: function() {
      return alerts;
    },
    remove: function(idx){
      alerts.splice(idx, 1);
    }
  }

});
CityExplorer.factory('UserPlace', ['sailsResource', function(sailsResource){

  return sailsResource('Place',{

    query:{
      method: 'GET',
      url: '/api/user/:user_id/places',
      isArray: true
    },
    get:{
      method:'GET',
      url:'/api/user/:user_id/places/:id'
    },
    save:{
      method:'POST',
      url:'/api/user/:user_id/places'
    }
    // delete:{
    //   method:'DESTROY',
    //   url:'/api/person/:person_id/contacts/:id'
    // }

  });

}]);
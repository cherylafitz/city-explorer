/**
 * PlaceController
 *
 * @description :: Server-side logic for managing places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {

  create: function(req, res){
    var uid = req.session.user.id;
    var data = {
      name:req.body.name,
      kind: req.body.kind,
      image_url:req.body.image_url,
      snippet_text:req.body.snippet_text,
      display_address:req.body.display_address,
      lon:req.body.lon,
      lat:req.body.lat,
      yelp_id:req.body.yelp_id,
      visited:req.body.visited,
      willVisit:req.body.willVisit,
      owner: uid,
      index: req.body.index,
      url: url
    };
    Place.findOne({
      owner:uid,
      yelp_id:req.body.yelp_id}).then(function(place){
        if(place){
          Place.update(place.id,data).then(function(place){
              res.send(place);
            }).catch(function(err){
              res.send(400, err);
            });
        }else {
          Place.create(data).then(function(place){
              res.send(place);
            }).catch(function(err){
              res.send(400, err);
            });
        }
      });
  }


};


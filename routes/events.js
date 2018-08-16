var express = require('express');
var router = express.Router();

var Event = require('../models/Event');
var limit = 6;

// /* GET events page. */
router.get('/', function(req, res, next) {
  Event.getEvents(function(err, events) {
      if(err)   {
        console.log(err);
        res.send(err);
      } else    {
        res.render('events/index', { "events": events, "limit": limit });
      }
  })  //Limit goes here
});

router.get('/:id/details', function(req, res, next) {
  Event.getEventById([req.params.id], function(err, eventName) {
      if(err)   {
        console.log(err);
        res.send(err);
      } else    {
        res.render('events/details', { "event": eventName });
      }
  })
});

module.exports = router;

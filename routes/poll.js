const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/vote');

//bring in pusher
const Pusher = require('pusher')
//copied from pushet domain app
var channels_client = new Pusher({
    appId: '886597',
    key: 'f95f421097f5e04d3e1e',
    secret: 'f7343d5ffb533960e505',
    cluster: 'eu',
    encrypted: true
  });


router.get('/', (req,res)=> {
    Vote.find().then(votes => res.json({success: true,
    votes: votes}));
});


router.post('/', (req,res)=> {
const newVote = {
  book: req.body.book,
  points:1
}

new Vote(newVote).save().then(vote=>{
  channels_client.trigger('book-poll', 'book-vote', {
    points: parseInt(vote.points),
    book: vote.book
  });

  return res.json({success: true, 
                    message: 'Thank you for voting'});
});


});

    
module.exports = router;
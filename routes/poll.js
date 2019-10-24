const express = require('express');
const router = express.Router();


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
    res.send('POLL');
});


router.post('/', (req,res)=> {
    channels_client.trigger('book-poll', 'book-vote', {
        points: 1,
        book: req.body.book
      });

      return res.json({success: true, 
                        message: 'Thank you for voting'});
});

module.exports = router;
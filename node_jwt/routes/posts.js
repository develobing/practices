const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
  // Send a Post
  res.json( {
    post: {
      writer: req.user._id,
      title: 'My first post',
      description: 'This is a first description.'
    }
  })
})

module.exports = router;

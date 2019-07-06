const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// Getting All
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    console.log('subscribers : ', subscribers)
    res.send(subscribers)

  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getSubscriber, async (req, res) => {
  res.json(res.subscriber)
})

// Creating One
router.post('/', async (req, res) => {
  let name = req.body.name
  let subscribedToChannel = req.body.subscribedToChannel
  console.log('name: %s, subscribedToChannel: %s', name, subscribedToChannel)

  const subscriber = new Subscriber({
    name,
    subscribedToChannel
  })

  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})


// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
  if(req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if(req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }

  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleting Success.'})

  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if(subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber.'})
    }
  } catch(err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

module.exports = router

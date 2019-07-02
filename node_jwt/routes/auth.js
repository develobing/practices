const router = require('express').Router()
const User = require('../model/User')
const { registerValidation } = require('../validation')

router.post('/register', async (req, res) => {
  // Validate the data beofre we make a new user
  const { error } = registerValidation(req.body)
  if(error) {
    return res.status(400).send(error.details[0].message)
  }

  // Checking if the user is already in the databases
  const emailExist = await User.findOne({ email: req.body.email })
  if(emailExist) {
    return res.status(400).send('Email already exists')
  }

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch(err) {
    res.status(400).send({ message: err })
  }
})

router.post('/login', (req, res) => {
  res.send('')
})

module.exports = router;

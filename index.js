
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

// This middleware is required for the POST method:
app.use(express.json())

const { users } = require('./state')

/* BEGIN - create routes here */
app.get('/users', (req,res) => {

  res.json(users);
})

app.get('/users/1', (req,res) => {

  res.json(users[0]);
})

app.post('/users', (req,res) => {
  const newUser = {
    _id: users.length+1,
    name: 'Jane Doe',
    occupation: 'engineer',
    avatar: "http://66.media.tumblr.com/5ea59634756e3d7c162da2ef80655a39/tumblr_nvasf1WvQ61ufbniio1_400.jpg"
  }
  users.push(newUser)
  res.json(users[users.length-1])
})

app.put('/users/1', (req,res) => {
  const selectedUser = users[0]
  
  selectedUser.occupation = 'waiter'
  res.json(selectedUser)
})

app.delete('/users/1', (req,res) => {
  users.splice(0,1)
  res.send('deleted')
})


// Assignment Part 2:

app.post('/users', (req,res) => {
  const newUser = {
        _id: users.length+1,
        ...req.body
  }
  console.log(newUser);
  users.push(newUser);
  res.json(newUser)
})

// Assignment Part 3:

app.get('/users/:userId', (req,res) => {
  const foundUser = users.find(user => user._id == req.params.userId)
  res.json(foundUser);
})

app.put('/users/:userId', (req,res) => {
  const selectedUser = users.find(user => user._id == req.params.userId)

  selectedUser.occupation = 'waiter'
  res.json(selectedUser)
})

app.delete('/users/:userId', (req,res) => {
  const selectedUser = users.find(user => user._id == req.params.userId)

  selectedUser.isActive = false
  console.log(selectedUser)
  users.splice(parseInt(selectedUser._id)-1,1)
  res.send('deleted')
})
/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))
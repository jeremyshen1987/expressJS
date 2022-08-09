const express = require('express')
const router = express.Router()

const message_model = require('../model/message-model')
const admin = require('../Controller/admin')


router.get("/", (req, res) => {

  message_model.find({}, (err, data) => {


    if(err){
      res.send('Error while retrieving messages')
    }

    res.render("index", {msg: data, user: req.user})

  }).select({__v: 0})
  
});

router.get("/login", (req, res) => res.render("login", {user: req.user}));

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get('/success', (req, res) => res.send('login successful'))
router.get('/signup', (req, res) => res.render('signup'))
router.get('/new', (req, res) => {

  res.render('new', {user: req.user})
})

//delete post

router.post('/delete', admin.deleteMsg)

module.exports = router
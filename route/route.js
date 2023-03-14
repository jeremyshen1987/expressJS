const express = require('express')
const router = express.Router()





router.get("/login", (req, res) => res.render("login", {user: req.user}));

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
});

router.get('/success', (req, res) => res.send('login successful'))
router.get('/failure', (req, res) => res.send('login failed!'))
router.get('/signup', (req, res) => res.render('signup'))
router.get('/new', (req, res) => {
  if(!req.user){
    return res.redirect('/login')
  }
  res.render('new', {user: req.user})
})

//delete post


module.exports = router
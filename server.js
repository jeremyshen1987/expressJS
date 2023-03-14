const dotenv = require('dotenv').config()

const express = require("express");
const cors = require("cors")
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require('express-flash')
const bcrypt = require('bcryptjs')

const User = require('./model/user-model')

const Router = require('./route/route')




const app = express();
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");


passport.use(

  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {

      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      if( !bcrypt.compareSync(password, user.password) ){
        return done(null, false, { message: "Incorrect password" });
        
      }

      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});


app.use(express.static(__dirname + '/style'))
app.use(flash())
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())
app.use(Router)



app.get("/test",  (req, res, next) => {


  console.log('req.session:', req.session)
  console.log('req.cookies:', req.cookies)
  console.log('req.user:', req.user)
  console.log('req.passport:', req.passport)


  res.json({test: 'success'})
  // res.json({'reqUser': req.user})
  

});

app.get('/', (req, res) => {

  console.log('test root')
  res.send('pass!')
})

// test = {orderNum:1, items:[{name:'orange', price: 30}, {name:'pear', price: 50}]}


//new POST

app.post('/checkout', (req, res) => {

  console.log('req.body:', req.body)

  User.findById(req.body.uid, (err, user) => {
    if(err){
      res.send('An error occured')
    }

    user.credits -= req.body.priceTotal
    user.orders.push( {orderNum: req.body.orderNum, items: req.body.cart} )

    user.save(err => {
      if(err){
        res.send('error saving to userObj')
      }
      res.json({
        statusCode: 200,
        result: 'success',
        orders: user.orders,
        credits: user.credits
      })
    })
  })

})


  


app.post('/register', (req, res, next) => {

  console.log('backend triggered')
  console.log(req.body)

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  })
  
  user.save(err => {
    if (err) { 
      res.json({error: err});
    }
    else{
      res.status(200).json({
        toMongoDB: 'success'
      })
    }

  });
})


app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {

    console.log('req.body', req.body)

    if (err) {
      throw err
    }

    if (info) {
      res.json({error: info.message})
    }
    else {
      res.json({
        username: user.username,
        uid: user.id,
        orders: user.orders,
        credits: user.credits,
        email: user.email
      })
    }
  })(req, res, next);
});

const port = process.env.PORT || 5000

// const sslServer = https.createServer({
//   key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }, app)

// sslServer.listen(port, () => console.log(`secure app listening on port ${port}`));

app.listen(port, () => console.log(`app listening on port ${port}`));

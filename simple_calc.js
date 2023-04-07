const passport = require("passport");
const express = require('express');
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const app = express();

//Need to import Express libraries to read POST body data (e.g. req.body)
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());

const port = 3000;
const users = [
{role: "manager", username: "abhi", password: "hello1"},
{role: "user", username: "navi", password: "hello2"},
];

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {
  secretOrKey: "secret",
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JWTStrategy(jwtOptions, (jwtPayload, done) => {
    const user = users.find(
      (use) =>
      use.username === jwtPayload.username && use.password === jwtPayload.password);
      if (user){
        return done(null, user);
      } else{
        return done(null, false);
      }
  })
);

app.post("/login", (req, res) => {
  const user = users.find(
    (use) => use.username === req.body.username && use.password === req.body.password
  );
  if(!user) {
    return res.status(401).json({message: "Invalid username or password"});
  }
  const token = jwt.sign(user, "secret");
  res.json({
    token,
    message: 
    "Copy this token please and add it to your auth header (use postman for testing)",
  });
});



//Start an instance of our Express server, listening on port 3000
app.listen(3000, () => {
    console.log('Note: My Server is now listening on port 3000');
})

//Home page request
//curl http://localhost:3000/
app.get( '/', (req, res) => {
    res.send("Hello mate, thats my server for SIT323!!");
});

function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1*n2;
}

function divide(n1, n2) {
  return n1/n2;
}

function power(n1, n2) {
  return n1**n2;
}

app.get('/add', passport.authenticate ("jwt", {session: false, failureRedirect: "/login" }), (req, res) => { 

  if (req.user.role === "user") {
    res.json ({ message: "you must be admin to use this functionality" });
  }
    try {

      if (req.query.n1 === undefined) {
        console.log("Error missing n1");
        res.status(400).send(`Error: failed to receive parameter n1!`);
        throw new Error("failed to receive value");
      }

      if (req.query.n2 === undefined) {
        console.log("Error missing n1");
        res.status(400).send(`Error: failed to receive parameter n2!`);
        throw new Error("failed to receive value");
      }

      const n1 = parseFloat(req.query.n1);
      const n2 = parseFloat(req.query.n2);

      if (isNaN(n1)) {
        res.status(400).send(`Error: Received n1 value of '${req.query.n1}' is not a number!`);
        throw new Error("incorrect value");
      }

      if (isNaN(n2)) {
        res.status(400).send(`Error: Received n2 value of '${req.query.n2}' is not a number!`);
        throw new Error("incorrect value");
      }

      const result = add(n1, n2);
      console.log(result);
      res.status(200).send(`Sum of ${n1} and ${n2} is ${result}`);
    }

    catch (error) {
      res.status(500).send(`Unknwon server error occurred. Error: ${error}`);
      console.log(`Server error occurred: ${error}`);
    }
}); 

app.get('/subtract', passport.authenticate ("jwt", {session: false, failureRedirect: "/login" }), (req, res) => { 
  if (req.user.role === "user") {
    res.json ({ message: "you must be admin to use this functionality" });
  }
    try {

      if (req.query.n1 === undefined) {
        console.log("Error missing n1");
        res.status(400).send(`Error: failed to receive parameter n1!`);
        throw new Error("failed to receive value");
      }

      if (req.query.n2 === undefined) {
        console.log("Error missing n1");
        res.status(400).send(`Error: failed to receive parameter n2!`);
        throw new Error("failed to receive value");
      }

      const n1 = parseFloat(req.query.n1);
      const n2 = parseFloat(req.query.n2);

      if (isNaN(n1)) {
        res.status(400).send(`Error: Received n1 value of '${req.query.n1}' is not a number!`);
        throw new Error("incorrect value");
      }

      if (isNaN(n2)) {
        res.status(400).send(`Error: Received n2 value of '${req.query.n2}' is not a number!`);
        throw new Error("incorrect value");
      }

      const result = subtract(n1, n2);
      console.log(result);
      res.status(200).send(`Subtraction of ${n1} and ${n2} is ${result}`);
    }

    catch (error) {
      res.status(500).send(`Unknwon server error occurred. Error: ${error}`);
      console.log(`Server error occurred: ${error}`);
    }
}); 

app.get('/multiply', passport.authenticate ("jwt", {session: false, failureRedirect: "/login" }),(req, res) => { 
  if (req.user.role === "user") {
    res.json ({ message: "you must be admin to use this functionality" });
  }
  try {

    if (req.query.n1 === undefined) {
      console.log("Error missing n1");
      res.status(400).send(`Error: failed to receive parameter n1!`);
      throw new Error("failed to receive value");
    }

    if (req.query.n2 === undefined) {
      console.log("Error missing n1");
      res.status(400).send(`Error: failed to receive parameter n2!`);
      throw new Error("failed to receive value");
    }

    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    if (isNaN(n1)) {
      res.status(400).send(`Error: Received n1 value of '${req.query.n1}' is not a number!`);
      throw new Error("incorrect value");
    }

    if (isNaN(n2)) {
      res.status(400).send(`Error: Received n2 value of '${req.query.n2}' is not a number!`);
      throw new Error("incorrect value");
    }

    const result = multiply(n1, n2);
    console.log(result);
    res.status(200).send(`Multiplication of ${n1} and ${n2} is ${result}`);
  }

  catch (error) {
    res.status(500).send(`Unknwon server error occurred. Error: ${error}`);
    console.log(`Server error occurred: ${error}`);
  }
}); 

app.get('/divide', passport.authenticate ("jwt", {session: false, failureRedirect: "/login" }), (req, res) => { 
  if (req.user.role === "user") {
    res.json ({ message: "you must be admin to use this functionality" });
  }
  try {

    if (req.query.n1 === undefined) {
      console.log("Error missing n1");
      res.status(400).send(`Error: failed to receive parameter n1!`);
      throw new Error("failed to receive value");
    }

    if (req.query.n2 === undefined) {
      console.log("Error missing n1");
      res.status(400).send(`Error: failed to receive parameter n2!`);
      throw new Error("failed to receive value");
    }

    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    if (isNaN(n1)) {
      res.status(400).send(`Error: Received n1 value of '${req.query.n1}' is not a number!`);
      throw new Error("incorrect value");
    }

    if (isNaN(n2)) {
      res.status(400).send(`Error: Received n2 value of '${req.query.n2}' is not a number!`);
      throw new Error("incorrect value");
    }

    const result = divide(n1, n2);
    console.log(result);
    res.status(200).send(`Division of ${n1} and ${n2} is ${result}`);
  }

  catch (error) {
    res.status(500).send(`Unknwon server error occurred. Error: ${error}`);
    console.log(`Server error occurred: ${error}`);
  }
}); 

app.get('/power', passport.authenticate ("jwt", {session: false, failureRedirect: "/login" }), (req, res) => { 
  if (req.user.role === "user") {
    res.json ({ message: "you must be admin to use this functionality" });
  }
  try {

    if (req.query.n1 === undefined) {
      console.log("Error missing n1");
      res.status(400).send(`Error: failed to receive parameter n1!`);
      throw new Error("failed to receive value");
    }

    if (req.query.n2 === undefined) {
      console.log("Error missing n1");
      res.status(400).send(`Error: failed to receive parameter n2!`);
      throw new Error("failed to receive value");
    }

    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    if (isNaN(n1)) {
      res.status(400).send(`Error: Received n1 value of '${req.query.n1}' is not a number!`);
      throw new Error("incorrect value");
    }

    if (isNaN(n2)) {
      res.status(400).send(`Error: Received n2 value of '${req.query.n2}' is not a number!`);
      throw new Error("incorrect value");
    }

    const result = power(n1, n2);
    console.log(result);
    res.status(200).send(`power of ${n1} and ${n2} is ${result}`);
  }

  catch (error) {
    res.status(500).send(`Unknwon server error occurred. Error: ${error}`);
    console.log(`Server error occurred: ${error}`);
  }
}); 

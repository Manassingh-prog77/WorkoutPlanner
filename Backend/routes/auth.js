const express = require("express");
const router = express.Router();
const User = require("../schema/LoginSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "your_JSON_web_Token";

// Route 1 -> Logged In existing User
router.post("/login",
    [
      body("email", "Enter a valid Email").isEmail(),
      body("password", "Password cannot be blank").exists(),
    ], async (req, res) => {
      let success = false;
        // If there are errors, return Bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success, errors: errors.array() });
        } 

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, message: "Please try to Login with correct credentials" });
            }

            // Compare the provided password with the hashed password
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, message: "Please try to Login with correct credentials" });
            }

            const data  = {
              user:{
                  id: user.id
              }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
            res.json({ success, message: "You have Successfully Logged In" ,"authtoken":authtoken});
            
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success, message: "Internal Server Error" });
        }
    }
);

// Route 2 -> Logged In existing Premium User
router.post("/PUserLogin",
    [
      body("email", "Enter a valid Email").isEmail(),
      body("password", "Password cannot be blank").exists(),
    ], async (req, res) => {
      let success = false;
        // If there are errors, return Bad requests and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success, errors: errors.array() });
        } 

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, message: "Please try to Login with correct credentials" });
            }

            // Compare the provided password with the hashed password
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, message: "Please try to Login with correct credentials" });
            }

            if (user.subscriptionType === "Free") {
                success = false;
                return res.json({ success, message: "Not a Premium User" });
            } 
            const data  = {
              user:{
                  id: user.id
              }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
            res.json({ success, message: "You have Successfully Logged Into your Account" , "authtoken": authtoken});
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success, message: "Internal Server Error" });
        }
    }
);

// Route 3 -> Create New User
router.post("/createUser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be minimum 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email});

      if (user) {
        return res.status(400).json({ error: "Sorry, a User with this Email already exists", success });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      // Create a New User
      user = await User.create({
        username: name,
        email: email,
        password: secPass,
      });
      const data = {
        user: {
            id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
    
      res.json({ authtoken, success });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Some Error Occurred", success });
    }
  }
);


//Route- 3 Get logged User Details 

router.post("/getuser", fetchuser, async (req, res) => {

  try {
      let userid = req.user.id;
      const user = await User.findById(userid).select("-password");
      res.send(user);
  } catch (error) {
              console.error(error.message);
              res.status(500).send("Internal Server Error");
          }
  })

//Route- 4 - Route to upgrade user to premium (Silver plan)

router.post("/MakePremium", fetchuser, async (req, res) => {
  try {
    // Get user from the request
    const userId = req.user.id; // Assuming fetchuser middleware adds user id to req.user
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is already a premium user
    if (user.subscriptionType !== "Free") {
      return res.status(400).json({ error: "User is already a premium user" });
    }

    // Set the current date as lastPaymentDate
    const currentDate = new Date();
    
    // Set the renewalDate to one year from the current date
    const renewalDate = new Date();
    renewalDate.setFullYear(renewalDate.getFullYear() + 1);

    // Upgrade the user to Silver plan and set the dates
    user.subscriptionType = "Silver";
    user.lastPaymentDate = currentDate;
    user.renewalDate = renewalDate;

    await user.save();

    // Respond with success message
    return res.json({ 
      message: "Your account has been upgraded to the Silver plan.", 
      user 
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

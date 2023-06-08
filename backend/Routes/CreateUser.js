const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken")
const bcrypt=require('bcryptjs')
const jwtSecret="IamSoulHacker"

router.post('/createuser', 
[
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name').isLength({ min: 3 })
], 

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10);
    let secpassword =await bcrypt.hash(req.body.password,salt)
      try {
      
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secpassword
 
      }).then(res.json({ success: true }));
 
  
    }
    catch (error) {
      console.log("error", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  });



  router.post('/loginuser', 
  [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
  
    try {
      const userData = await User.findOne({ email });
      if (!userData) {

        return res.status(400).json({ errors: [{ msg: 'Invalid email address' }] });
      }
  
      const validPassword = await bcrypt.compare(password, userData.password);
     
      if(!validPassword) {
       return res.status(401).json({ errors: [{ msg: 'Invalid password please enter a valid password' }] });
      }
     
  
       const data = {
        user: {
          id: userData._id
        }
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken });
      console.log("success")
  
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
  });
  
  module.exports = router;


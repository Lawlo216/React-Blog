const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidation } = require('../validation');
const verify = require('./verifyToken');

const User = require('../models/User');

// @route     GET blog/auth
// @desc      Get logged in user
// @access    Private
router.get('/',verify, async (req,res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route     POST blog/auth
// @desc      Log in
// @access    Public
router.post('/', async (req,res)=> {
    //Validate the data before make a user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the email is already in db
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Credentials');

    //Password id correct
    const vaildPass = await bcrypt.compare(req.body.password, user.password);
    if(!vaildPass) return res.status(400).send('Invalid Credentials');

    //Create and assign a token
    // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // res.header('auth-token', token).send(token);


      // create a token
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
      res.status(200).send({ auth: true, token: token });

});

module.exports = router;
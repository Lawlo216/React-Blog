const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../validation');

// @route     POST blog/users
// @desc      Regiter a user
// @access    Public
router.post('/', async (req,res)=> {
    //Validate the data before make a user
    const {error} = registerValidation(req.body);
    if(error) return res.send(error.details[0].message);

    //Checking if the user is already in db
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.status(200).send({ auth: true, token: token });


    // try {
    //     // const savedUser = await user.save();
    //     // // res.send({savedUser});
    //     // res.send({ user: user._id });
    //     const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    //     res.status(200).send({ auth: true, token: token });
    // } catch (err) {
    //     res.status(400).send(err);
    // }
});

module.exports = router;
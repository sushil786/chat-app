const express = require('express');
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// route for registration
router.post('/register', (req, res, next) => {
    //find for email
    User.findOne({ email: req.body.email })
        .then(user => {
            // if email exists return conflict email response
            if (user) {
                return res.status(409).json({
                    message: 'Mail id exist..'
                })
            }
            // otherwise hash the password first
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    //if error return error
                    if (err) {
                        return res.status(500), json({
                            error: err
                        })
                    }
                    //otherwise create new User with hashed password
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        // store the User
                        user.save()
                            // success handle
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created successfully..'
                                })
                            })
                            //error handle
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
})

//route for login

router.post('/login', (req, res, next) => {
    //find for email
    User.findOne({ email: req.body.email })
        .then(user => {
            // if user not found return auth failed response
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed..'
                })
            }
            // otherwise hash the password and compare with stored User password
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                // if error return auth failed
                if (err) {
                    return res.status(401).json({
                        message: 'Auth Failed..'
                    });
                }
                // otherwise create json web token and send it as response
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, "secretKey",
                        { expiresIn: "1h" })
                    return res.status(200).json({
                        message: 'Auth successful..',
                        token: token
                    });
                }
                // error if any error
                return res.status(401).json({
                    message: 'Auth Failed..'
                });
            })
        })
        // handle promise
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;
require("dotenv").config();
const JWT = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

signToken = user => {
    return JWT.sign({
        iss: "T2",
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() +1)
    }, JWT_SECRET)
}

module.exports = {
    signUp: async (req, res, next) => {
        console.log("TriggeredDDD");
        const {email, password} = req.body;

        const foundUser = await User.findOne({"email": email})

        if (foundUser) {
            return res.status(403).send({
                error: "Email is already in use"
            })
        }


        const newUser = new User({
            email,
            password
        })

        await newUser.save();
        
        const token = signToken(newUser);
        res.status(200).json({ token });

    },
    signIn: async (req, res, next) => {
        // generate token
        const token = signToken(req.user);
        res.cookie("token", token).send("successful"); 
    },
    facebookOAUTH: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.cookie("token", token).send("successful")
    },

    secret: async (req, res, next) => {
        console.log("I managed to get here");
        res.json({
            secret: "resource"
        })
    }
}
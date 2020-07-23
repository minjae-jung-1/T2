const Game = require("../models/game");


module.exports = {
    createMatch: async (req, res, next) => {
        console.log("match formation", req.body);

        // const newMatch = new Game({

        // })
        res.send("Match is being created");
    },
    signUp: async (req, res, next) => {
        console.log("TriggeredDDD");
        const {email, password} = req.body;

        const foundUser = await User.findOne({"email": email}).select("username email _id");

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
        res.cookie("token", token).send(newUser);

    },
    signIn: async (req, res, next) => {
        console.log("is anything fucking happening")
        // generate token
        const token = signToken(req.user);
        res.cookie("token", token).send(req.user); 
    },
    secret: async (req, res, next) => {
        console.log("I managed to get here");
        res.json({
            secret: "resource"
        })
    }
}
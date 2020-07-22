const express = require("express");
const passport = require("passport");
const passportConf = require("../passport");
const UsersController = require("../controllers/users");
const passportJWT = passport.authenticate("jwt", {session: false});
const passportFacebook = passport.authenticate("facebookToken", {session: false});
const User = require("../models/user"); 
const db_pass = process.env.DB_PASS;
const JWT = require("jsonwebtoken");


const url = `mongodb://chatRoyale:${db_pass}@18.221.11.205:27017`;

const router = express.Router();

router.route("/oauth/facebook")
    .post(passportFacebook, UsersController.facebookOAUTH)

router.route("/secret")
    .get(passportJWT, UsersController.secret)

router.route("/signup")
    .post(UsersController.signUp);

router.route("/signin")
    .post(passport.authenticate("local", { session: false }), UsersController.signIn);

    //TODO REWRITE THIS :)
router.get("/:userId", async (req, res) => {
    let userId = req.params.userId;
    console.log(userId)

    let selectedUser = await User.findOne({"_id": userId}, (err, user) => {
            return user.toObject();
        });
        returnValue = {...selectedUser._doc};
        delete returnValue.password;
        if (selectedUser)
            res.status(200).send(returnValue);
        else
            res.status(404).send("User not found");
    });

router.put("/:userId", async (req, res) => {
    let tokenId = JWT.decode(req.cookies.token).sub;
    let userId = req.params.userId;

    if (tokenId === userId){
        let update = generateUpdate(req.body.payload.field, req.body.payload.value);

        let selectedUser = await User.findByIdAndUpdate(userId, update).select("-password").lean();
            if (selectedUser)
                res.status(200).send(selectedUser);
            else
                res.status(404).send("User not found");
    } else {
        res.status(404).send("Not Authorized");
    }
});
    
    
    

// router.get("/details", async (req, res) => {
//     // TODO:  Use projection instead of doing this jank ass shit
//     let userId = req.query.userId;
//     console.log(userId)
//     let selectedUser = await User.findOne({"facebook.id": userId}, (err, user) => {
//             return user.toObject();
//         });
//         returnValue = {};
//         returnValue["facebook_id"] = selectedUser.facebook.id;
//         returnValue["firstName"] = selectedUser.facebook.firstName;
//         returnValue["lastName"] = selectedUser.facebook.lastName;
//         returnValue["_id"] = selectedUser._id;
//         if (selectedUser)
//             res.status(200).send(returnValue);
//         else
//             res.status(404).send("User not found");
//     });

function generateUpdate(field, value) {
    const update = {"$set": {}}
    if(typeof value !== "undefined"){
        update.$set[field] = value;
    }
    return update;
}

module.exports = router;
const express = require("express");
const passport = require("passport");
const passportConf = require("../passport");
const UsersController = require("../controllers/users");
const passportJWT = passport.authenticate("jwt", {session: false});
const passportFacebook = passport.authenticate("facebookToken", {session: false});
const User = require("../models/user"); 
const db_pass = process.env.DB_PASS;
const JWT = require("jsonwebtoken");
const axios = require("axios")
const TeemoJS = require('teemojs');
const riotApiKey = process.env.RIOT_API_KEY;
console.log("RiotAPi: ", riotApiKey);
const api = TeemoJS(riotApiKey);

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

router.put("/:userId/league", async (req, res) => {
    
    let tokenId = JWT.decode(req.cookies.token).sub
    let userId = req.params.userId;
    let { username } = req.body;
    let leagueId = "";
    if (tokenId === userId){
        await api.get('na1', 'summoner.getBySummonerName', username)
          .then(data => {
            leagueId = data.id;
          });
        console.log("LeagueId: ", leagueId);
          if (leagueId){
            let rank = await axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${leagueId}?api_key=${riotApiKey}`)
              .then(res => {
                let soloRank = res.data.find(queueObj => queueObj.queueType === "RANKED_SOLO_5x5");
                if (soloRank){
                    return `${(soloRank.tier)[0].toLowerCase()}${mapTier(soloRank.rank)}`;
                } else {
                    return "";
                }
            });
            if (rank) {
                let usernameUpdate = generateUpdate("league.username", username);
                await User.findByIdAndUpdate(userId, usernameUpdate).select("-password").lean();
                let rankUpdate = generateUpdate("league.rank", rank);
                await User.findByIdAndUpdate(userId, rankUpdate).select("-password").lean();
            };
            
            res.send({rank, username});
          }
    } else {
        res.send("never gonna make it");
    }
    
    // api.get("na1", "league.getLeagueEntriesForSummoner", userid)
    // .then(data => {
    //     console.log(data);
    // })
    
    
})




// let userid = "";
// api.get('na1', 'summoner.getBySummonerName', 'Karadania')
//   .then(data => {
//       userid = data.id;
//     });

// api.get("na1", "league.getLeagueEntriesForSummoner", userid)
// .then(data => {
//     console.log(data);
// })

// axios.get("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/tCgfqmwTTE_Iux5YT7j-8_A6nCKJawqZgaoiiIh8mOIjWSRb?api_key=RGAPI-41024e2f-cdad-4fa3-94c4-3c2c6d34c5bb")
// .then(data => {
//     console.log(data.data);
// })
    
    
    

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
function mapTier(num) {
    switch(num) {
        case "I":
            return "1";
        case "II":
            return "2";
        case "III":
            return "3";
        case "IV":
            return "4";
        default:
           return "4";
    }
}

module.exports = router;
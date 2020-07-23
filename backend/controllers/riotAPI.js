const TeemoJS = require('teemojs');
const axios = require("axios")

var api = TeemoJS("RGAPI-41024e2f-cdad-4fa3-94c4-3c2c6d34c5bb");

let userid = "";
api.get('na1', 'summoner.getBySummonerName', 'Karadania')
  .then(data => {
      userid = data.id;
    });

api.get("na1", "league.getLeagueEntriesForSummoner", userid)
.then(data=>{
    console.log(data);
})

axios.get("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/tCgfqmwTTE_Iux5YT7j-8_A6nCKJawqZgaoiiIh8mOIjWSRb?api_key=RGAPI-41024e2f-cdad-4fa3-94c4-3c2c6d34c5bb")
.then(data=>{
    console.log(data.data);
})
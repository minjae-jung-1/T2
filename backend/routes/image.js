const express = require("express");
const router = express.Router();
const upload = require("../services/image-upload");
const User = require("../models/user");
const JWT = require("jsonwebtoken");

// add mongoose stuff here for user updates

const singleUpload = upload.single('image');


router.post('/image-upload', function(req, res) {
  let userId = JWT.decode(req.cookies.token).sub;

  console.log(userId, "uploadfunc")
  singleUpload(req, res, async function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }
    // save the file's url to a property on the user's db record --> will use that to render their profile picture
    let update = {"$set": {"avi": req.file.location}};
    let selectedUser = await User.findByIdAndUpdate(userId, update).lean();
      if(selectedUser) {
        return res.json({'imageUrl': req.file.location});
      } else {
        res.status(404).send("User not found");
      }
  });
});

module.exports = router;

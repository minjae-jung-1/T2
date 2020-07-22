const express = require("express");
const router = express.Router();
const upload = require("../services/image-upload");
// add mongoose stuff here for user updates

const singleUpload = upload.single('image');


router.post('/image-upload', function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }
    // save the file's url to a property on the user's db record --> will use that to render their profile picture
    return res.json({'imageUrl': req.file.location});
  });
});

module.exports = router;

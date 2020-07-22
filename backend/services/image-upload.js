require("dotenv").config({path: "../.env"});
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3")

AWS.config.update({
    secretAccessKey: process.env.aws_secret_access_key,
    accessKeyId: process.env.aws_access_key_id,
    region: "us-east-1"
})

const s3 = new AWS.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
      acl: 'public-read',
      s3,
      bucket: 'tenmen2',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'TESTING_METADATA'});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  });

  module.exports = upload;

const AWS = require("aws-sdk");
import { v4 as uuidv4 } from "uuid";

import envVars from "../config";

const s3 = new AWS.S3({
  accessKeyId: envVars.AWS_ACCESS,
  secretAccessKey: envVars.AWS_SECRET,
});

interface file {
  name: string;
}

const uploadToS3 = (file: file, extension: string) => {
  const params = {
    Bucket: "planning-project",
    Key: uuidv4()+"."+extension,
    Body: file.name,
    ACL: "public-read",
  };

  s3.upload(params, function (err: Error, data: any) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

export default uploadToS3;

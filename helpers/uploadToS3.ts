const AWS = require("aws-sdk");
import { v4 as uuidv4 } from "uuid";

import envVars from "../config";

const s3 = new AWS.S3({
  accessKeyId: envVars.AWS_ACCESS,
  secretAccessKey: envVars.AWS_SECRET,
});

interface file {
  name: string;
  data: any;
}

const uploadToS3 = async (file: file) => {
  const params = {
    Bucket: "planning-project-aws",
    Key: uuidv4()+"-"+file.name,
    Body: file.data,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err: Error, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export default uploadToS3;

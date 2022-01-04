"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../config"));
const s3 = new AWS.S3({
    accessKeyId: config_1.default.AWS_ACCESS,
    secretAccessKey: config_1.default.AWS_SECRET,
});
const uploadToS3 = (file, extension) => {
    const params = {
        Bucket: "planning-project",
        Key: (0, uuid_1.v4)() + "." + extension,
        Body: file.name,
        ACL: "public-read",
    };
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};
exports.default = uploadToS3;
//# sourceMappingURL=uploadToS3.js.map
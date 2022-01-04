"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const uploadToS3 = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: "planning-project-aws",
        Key: (0, uuid_1.v4)() + "-" + file.name,
        Body: file.data,
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
});
exports.default = uploadToS3;
//# sourceMappingURL=uploadToS3.js.map
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
exports.deleteFileFromTicket = exports.uploadFileToTicket = void 0;
const config_1 = __importDefault(require("../config"));
const cloudinary = require("cloudinary").v2;
const ticket_1 = __importDefault(require("../models/ticket"));
cloudinary.config(config_1.default.CLOUDINARY_URL);
const validExtensions = ["jpg", "png", "jpeg"];
const uploadFileToTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const file = req.files.file;
    // Check if ticket exists
    const ticketExists = yield ticket_1.default.findByPk(id);
    if (!ticketExists) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }
    // Check if file extension is valid
    const fileExtension = file.name.split(".").pop();
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            message: "Invalid file extension",
        });
    }
    // Upload file to cloudinary
    const { secure_url } = yield cloudinary.uploader.upload(file.tempFilePath);
    // Update ticket
    yield ticket_1.default.update({
        files: [...ticketExists.files, secure_url],
    }, {
        where: {
            id,
        },
    });
    return res.status(200).json({
        message: "File uploaded successfully",
        image: secure_url,
    });
});
exports.uploadFileToTicket = uploadFileToTicket;
const deleteFileFromTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { file } = req.body;
    // Check if ticket exists
    const ticketExists = yield ticket_1.default.findByPk(id);
    if (!ticketExists) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }
    // Delete file from cloudinary
    file.split("/").pop();
    yield cloudinary.uploader.destroy(file);
    // Update ticket
    yield ticket_1.default.update({
        files: ticketExists.files.filter((file) => file !== file),
    }, {
        where: {
            id,
        },
    });
    return res.status(200).json({
        message: "File deleted successfully",
    });
});
exports.deleteFileFromTicket = deleteFileFromTicket;
//# sourceMappingURL=upload.js.map
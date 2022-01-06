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
exports.uploadFile = exports.changePriority = exports.changeStatus = exports.updateTicket = exports.createTicket = void 0;
const uuid_1 = require("uuid");
const ticket_1 = __importDefault(require("../models/ticket"));
const project_1 = __importDefault(require("../models/project"));
const uploadToS3_1 = __importDefault(require("../helpers/uploadToS3"));
const validExtensions = ["jpg", "png", "jpeg"];
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const project = req.params.id;
    // Check if project exists
    const projectExists = yield project_1.default.findByPk(project);
    if (!projectExists) {
        return res.status(404).json({
            message: "Project not found",
        });
    }
    const user = req.user.id;
    // Create ticket
    const ticket = yield ticket_1.default.create({
        id: (0, uuid_1.v4)(),
        title,
        description,
        project,
        workspace: projectExists.workspace,
        creator: user,
    });
    return res.status(201).json({
        message: "Ticket created successfully",
        ticket,
    });
});
exports.createTicket = createTicket;
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const ticket = req.params.id;
    // Check if ticket exists
    const ticketExists = yield ticket_1.default.findByPk(ticket);
    if (!ticketExists) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }
    // Update ticket
    yield ticket_1.default.update({
        title,
        description,
    }, {
        where: {
            id: ticket,
        },
    });
    return res.status(200).json({
        message: "Ticket updated successfully",
    });
});
exports.updateTicket = updateTicket;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = req.params.id;
    const { status } = req.body;
    // Check if ticket exists
    const ticketExists = yield ticket_1.default.findByPk(ticket);
    if (!ticketExists) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }
    // Update ticket
    yield ticket_1.default.update({
        status,
    }, {
        where: {
            id: ticket,
        },
    });
});
exports.changeStatus = changeStatus;
const changePriority = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = req.params.id;
    const { priority } = req.body;
    // Check if ticket exists
    const ticketExists = yield ticket_1.default.findByPk(ticket);
    if (!ticketExists) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }
    // Update ticket
    yield ticket_1.default.update({
        priority,
    }, {
        where: {
            id: ticket,
        },
    });
});
exports.changePriority = changePriority;
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = req.params.id;
    // Check if there are files
    if (!req.files) {
        return res.status(400).json({
            message: "No files were uploaded.",
        });
    }
    // Check if ticket exists
    const ticketExists = yield ticket_1.default.findByPk(ticket);
    if (!ticketExists) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }
    const file = req.files.file;
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop();
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            message: "Invalid file extension",
        });
    }
    // Upload file to S3
    const fileUrl = (0, uploadToS3_1.default)(file);
    // Add file to ticket
    yield ticket_1.default.update({
        files: [...ticketExists.files, fileUrl],
    }, {
        where: {
            id: ticket,
        },
    });
    return res.status(200).json({
        message: "File uploaded successfully",
    });
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=ticket.js.map
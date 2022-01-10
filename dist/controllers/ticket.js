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
exports.deleteTicket = exports.updateTicket = exports.createTicket = void 0;
const uuid_1 = require("uuid");
const ticket_1 = __importDefault(require("../models/ticket"));
const project_1 = __importDefault(require("../models/project"));
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, assignee } = req.body;
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
        status: status || "1",
        priority: priority || "1",
        assignee: assignee || null,
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
// update ticket by optional query params, title, description, status, priority
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority } = req.body;
    const { id } = req.params;
    // Check if ticket exists
    const ticketExists = yield ticket_1.default.findByPk(id);
    if (!ticketExists) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }
    // Update ticket
    yield ticket_1.default.update({
        title: title || ticketExists.title,
        description: description || ticketExists.description,
        status: status || ticketExists.status,
        priority: priority || ticketExists.priority,
    }, {
        where: {
            id,
        },
    });
    return res.status(200).json({
        message: "Ticket updated successfully",
        ticket: ticketExists,
    });
});
exports.updateTicket = updateTicket;
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Check if ticket exists
    const ticketExists = yield ticket_1.default.findByPk(id);
    if (!ticketExists) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }
    // Delete ticket
    yield ticket_1.default.destroy({
        where: {
            id,
        },
    });
    return res.status(200).json({
        message: "Ticket deleted successfully",
    });
});
exports.deleteTicket = deleteTicket;
//# sourceMappingURL=ticket.js.map
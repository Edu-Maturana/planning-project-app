"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../routes/users"));
class Server {
    constructor() {
        this.apiPaths = {
            users: '/api/users',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.routes();
    }
    routes() {
        this.app.use(this.apiPaths.users, users_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
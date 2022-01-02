"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const saltRounds = 10;
const encryptPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
};
exports.default = {
    encryptPassword,
};
//# sourceMappingURL=encryptPassword.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const getUsers = (req, res) => {
    res.json({
        msg: "Get users",
    });
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: `Get user ${id}`,
    });
};
exports.getUser = getUser;
const createUser = (req, res) => {
    res.json({
        msg: "Create user",
    });
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: `Update user ${id}`,
    });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: `Delete user ${id}`,
        user: id,
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map
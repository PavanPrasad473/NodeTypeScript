"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
function error(err, req, res, next) {
    winston_1.default.error(err.message, err);
    console.log(err.message);
    res.send('Something wrong');
    // res.status(500).send('Something wrong');
}
exports.default = error;

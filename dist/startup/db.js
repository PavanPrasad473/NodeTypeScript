"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const winston_1 = __importDefault(require("winston"));
module.exports = function () {
    mongoose_1.default.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => winston_1.default.info('connection established....'));
    mongoose_1.default.set('useCreateIndex', true);
};

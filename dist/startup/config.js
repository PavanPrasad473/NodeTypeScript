"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
//const config=require('config');
const config_1 = __importDefault(require("config"));
module.exports = function () {
    if (!config_1.default.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR jwtPrivateKey not defined');
    }
};

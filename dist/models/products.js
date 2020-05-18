"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = require("./users");
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 3
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    Availablequantity: {
        type: Number,
        required: true,
        min: 0
    },
    users: [{
            PurchasedQuantity: {
                type: Number,
                min: 1
            },
            PurchasedBy: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: users_1.Users
            },
            DateTime: { type: Date, default: Date.now }
        }]
});
const Products = mongoose_1.default.model('Products', schema);
exports.Products = Products;
//export {validateProduct as validate};

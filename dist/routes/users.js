"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = __importDefault(require("lodash"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        // const {error}=validate(req.body);
        // if(error)return res.status(400).send('Invalid user details');
        let user = await users_1.Users.findOne({ 'email': req.body.email });
        if (user)
            return res.status(400).send('Email ALready Exists');
        user = new users_1.Users(lodash_1.default.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
        const salt = await bcrypt_1.default.genSalt(10);
        let pwd = await bcrypt_1.default.hash(user.password, salt);
        user.password = pwd;
        await user.save();
        const token = generateAuthToken(user._id, user.isAdmin);
        res.header('x-auth-token', token).send(lodash_1.default.pick(user, ['_id', 'name', 'email']));
        //res.send(_.pick(user,['_id','name','email']));    
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});
function generateAuthToken(_id, isAdmin) {
    return jsonwebtoken_1.default.sign({ _id: _id, isAdmin: isAdmin }, config_1.default.get('jwtPrivateKey'));
}
exports.default = router;

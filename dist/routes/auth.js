"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    // const {error}=validateUser(req.body);
    // if(error) return res.status(400).send('Inavlid username or password');
    console.log(req.body.email);
    const user = await users_1.Users.findOne({ email: req.body.email });
    //console.log(user.password,req.body.password);
    //const user = await User.findOne({email:req.body.email});
    if (!user)
        return res.status(400).send('Invalid username or password');
    const validPassword = await bcrypt_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Invalid Username or password');
    const token = generateAuthToken(user._id, user.isAdmin);
    res.send(token);
});
function generateAuthToken(_id, isAdmin) {
    return jsonwebtoken_1.default.sign({ _id: _id, isAdmin: isAdmin }, config_1.default.get('jwtPrivateKey'));
}
// function validateUser(user:Users){
//     const schema=Joi.object({
//         email:Joi.string().required().email(),
//         password:Joi.string().required()
//     })
//     return schema.validate(user);
// }
exports.default = router;

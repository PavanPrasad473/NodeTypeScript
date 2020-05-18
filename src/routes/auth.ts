import {Users} from '../models/users';
import express from 'express'
import Joi from '@hapi/joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'
const router=express.Router();

router.post('/',async(req,res)=>{
    // const {error}=validateUser(req.body);
    // if(error) return res.status(400).send('Inavlid username or password');
    console.log(req.body.email);
    const user=await Users.findOne({email:req.body.email});
    //console.log(user.password,req.body.password);
    //const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid username or password');

    const validPassword=await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send('Invalid Username or password');

    const token=generateAuthToken(user._id,user.isAdmin);
    res.send(token);
})
function generateAuthToken(_id:string,isAdmin:boolean):string{
    return jwt.sign({_id:_id,isAdmin:isAdmin},config.get('jwtPrivateKey'));
}
// function validateUser(user:Users){
//     const schema=Joi.object({
//         email:Joi.string().required().email(),
//         password:Joi.string().required()
//     })
//     return schema.validate(user);
// }

export default router;
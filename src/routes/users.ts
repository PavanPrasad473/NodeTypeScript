import {Users,IUserDetails} from '../models/users';
import bcrypt from 'bcrypt';
import _ from 'lodash' ;
import express from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

const router=express.Router();

router.post('/',async (req,res)=>{
    try {
        // const {error}=validate(req.body);
        // if(error)return res.status(400).send('Invalid user details');
        
        let user=await Users.findOne({'email':req.body.email});
        if(user) return res.status(400).send('Email ALready Exists');
        user=new Users(_.pick(req.body,['name','email','password','isAdmin']));
        const salt=await bcrypt.genSalt(10);
        let pwd=await bcrypt.hash(user.password,salt);
        user.password=pwd;
        await user.save();
        const token=generateAuthToken(user._id,user.isAdmin);
        res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));    
        //res.send(_.pick(user,['_id','name','email']));    
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

function generateAuthToken(_id:string,isAdmin:boolean):string{
    return jwt.sign({_id:_id,isAdmin:isAdmin},config.get('jwtPrivateKey'));
}

export default router;
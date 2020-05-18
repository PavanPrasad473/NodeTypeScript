import jwt from 'jsonwebtoken'
import config from 'config'
import express,{NextFunction} from 'express'
import {Users,userSchema} from '../models/users';
function auth(req:express.Request,res:express.Response,next:NextFunction){
        const token=req.header('x-auth-token');
        if(!token) return res.status(401).send('Access denied');
        try{
            const decodedPayload=jwt.verify(token,config.get('jwtPrivateKey'));
            //req.user=decodedPayload;
            next();
        }catch(error){
            res.status(400).send('Invalid token')
        }
}

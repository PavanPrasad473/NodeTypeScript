import winston from 'winston'
import express,{Request,Response,NextFunction,RequestHandler} from 'express'
export default function error(err:Error,req:Request,res:Response,next:NextFunction){
    winston.error(err.message,err);
    console.log(err.message);
    res.send('Something wrong');
   // res.status(500).send('Something wrong');
    
}
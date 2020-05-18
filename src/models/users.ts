import mongoose from 'mongoose'
import Joi from '@hapi/joi'

import config from 'config'

interface IUserDetails extends mongoose.Document{
    name:string,
    email:string,
    password:string,
    isAdmin:boolean
}
const schema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:Boolean
});
schema.methods.generateAuthToken=function(){
  
}
const Users=mongoose.model<IUserDetails>('Users',schema);

// function validateUser(user){
//     const schema=Joi.object({
//         name:Joi.string().required().max(128),
//         email:Joi.string().required().email(),
//         password:Joi.string().required(),
//         isAdmin:Joi.boolean()
//     });
//     return schema.validate(user);
// }

export{Users as Users,IUserDetails as IUserDetails}
export{schema as userSchema}
//export{validateUser as validate}



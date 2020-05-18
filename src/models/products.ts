import mongoose from 'mongoose'
import Joi from '@hapi/joi'
import {Users,userSchema} from './users';



interface IProductDetails extends mongoose.Document{
    name:string;
    price:number;
    Availablequantity:number;
    users:[{
            PurchasedQuantity:number,
            PurchasedBy:mongoose.Schema.Types.ObjectId
        }];
    
}

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        min:3
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    Availablequantity:{
        type:Number,
        required:true,
        min:0
    },
    users:[{
        PurchasedQuantity:{
            type:Number,
            min:1
        },
        PurchasedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:Users
        },
        DateTime:{type:Date,default:Date.now}
    }]
});

const Products=mongoose.model<IProductDetails>('Products',schema);

// function validateProduct(product){
//     const schema=Joi.object({
//         name:Joi.string().required().min(3),
//         price:Joi.number().required().min(0),
//         Availablequantity:Joi.number().required().min(1)
//     });
//     return schema.validate(product);
// }

export {Products as Products,IProductDetails as IProductDetails};
//export {validateProduct as validate};
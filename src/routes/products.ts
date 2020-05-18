import express,{RequestHandler, NextFunction} from 'express'
const router=express.Router();
import {Products,IProductDetails} from'../models/products';
// import auth from '../middleware/auth';
// import admin from '../middleware/admin';
import _ from 'lodash';
import { stringify } from 'querystring';

// const pd=new Products();


router.get('/',async (req,res,next)=>{
       
        if(Object.keys(req.query).length!=0){
                console.log('innn')
                const product=await Products.find({'name':(req.query.name) as string});
                if(!product) return res.status(404).send('Product not found ');
                res.send(product);
        }else{
                res.send(await Products.find());
        }
    
})

router.get('/:id',async(req,res)=>{
    const product=await Products.findById(req.params.id);
        if(!product) return res.status(404).send('Product not found ');
        res.send(product);
})

router.post('/',async (req,res)=>{
        // const {error}=validate(req.body);
        // if(error) return res.status(400).send(error.details[0].message);
        const product=new Products(_.pick(req.body,['name','price','Availablequantity']))
        await product.save();
        res.send(product);
});

router.put('/:id',async(req,res)=>{
        // const {error}=validate(req.body);
        // if(error) return res.status(400).send(error.details[0].message);
        console.log(req.body.user[0].PurchasedQuantity);
        let product=await Products.findByIdAndUpdate(req.params.id,{
            $inc:{
                    Availablequantity: -parseInt(req.body.user[0].PurchasedQuantity),
                    PurchasedQuantity: +parseInt(req.body.user[0].PurchasedQuantity)
                }
        },{new:true});
        if(product!=null){
                product.users.push({
                        PurchasedBy:(req.body.user[0].PurchasedBy),
                        PurchasedQuantity:parseInt(req.body.user[0].PurchasedQuantity)
                });
                await product.save();
        }
         
        if(!product) return res.status(404).send('Product with given data not found....');
        res.send(product);
});
router.put('/:name',async(req,res)=>{
        if(Object.keys(req.query).length != 0){
                //const {error}=validate(req.body);
                //if(error) return res.status(400).send(error.details[0].message);
                let product=await Products.updateOne({"name":(req.query.name) as string},{
                        $set:{
                                price:req.body.price,
                                Availablequantity:req.body.Availablequantity
                        }
                },{new:true});
                if(!product) return res.status(404).send('Product with given data not found....');
                res.send(await Products.find());
        }else{
                // const {error}=validate(req.body);
                // if(error) return res.status(400).send(error.details[0].message);
                let product=await Products.updateMany({"name":req.params.name},{
                        $set:{
                                price:req.body.price,
                                Availablequantity:req.body.Availablequantity
                        }
                },{new:true});
                if(!product) return res.status(404).send('Product with given data not found....');
                res.send(await Products.find());
        }
});
//router.delete('/:id',[auth,admin],async (req,res)=>{
router.delete('/:id',async (req,res)=>{
        const product=await Products.findByIdAndRemove(req.params.id);
        if(!product) return res.status(404).send('The data with given id not found');
        res.send(await Products.find());
});
//router.delete('/',[auth,admin],async (req,res)=>{
router.delete('/',async (req,res)=>{
        if(Object.keys(req.query).length != 0){
                console.log(req.query)
                const product=await Products.findOneAndRemove({'name':(req.query.name) as string});
                if(!product) return res.status(404).send('The data with given id not found');
                res.send(await Products.find());
        }
        // else{
                
        //         console.log('Delete many')
        //         const product=await Products.deleteMany();
        //         console.log(product);
        //         //if(!product) return res.status(404).send('The data with given id not found');
        //         res.send(await Products.find());
        // }
});

export default router
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const products_1 = require("../models/products");
// import auth from '../middleware/auth';
// import admin from '../middleware/admin';
const lodash_1 = __importDefault(require("lodash"));
// const pd=new Products();
router.get('/', async (req, res, next) => {
    if (Object.keys(req.query).length != 0) {
        console.log('innn');
        const product = await products_1.Products.find({ 'name': (req.query.name) });
        if (!product)
            return res.status(404).send('Product not found ');
        res.send(product);
    }
    else {
        res.send(await products_1.Products.find());
    }
});
router.get('/:id', async (req, res) => {
    const product = await products_1.Products.findById(req.params.id);
    if (!product)
        return res.status(404).send('Product not found ');
    res.send(product);
});
router.post('/', async (req, res) => {
    // const {error}=validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    const product = new products_1.Products(lodash_1.default.pick(req.body, ['name', 'price', 'Availablequantity']));
    await product.save();
    res.send(product);
});
router.put('/:id', async (req, res) => {
    // const {error}=validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    console.log(req.body.user[0].PurchasedQuantity);
    let product = await products_1.Products.findByIdAndUpdate(req.params.id, {
        $inc: {
            Availablequantity: -parseInt(req.body.user[0].PurchasedQuantity),
            PurchasedQuantity: +parseInt(req.body.user[0].PurchasedQuantity)
        }
    }, { new: true });
    if (product != null) {
        product.users.push({
            PurchasedBy: (req.body.user[0].PurchasedBy),
            PurchasedQuantity: parseInt(req.body.user[0].PurchasedQuantity)
        });
        await product.save();
    }
    if (!product)
        return res.status(404).send('Product with given data not found....');
    res.send(product);
});
router.put('/:name', async (req, res) => {
    if (Object.keys(req.query).length != 0) {
        //const {error}=validate(req.body);
        //if(error) return res.status(400).send(error.details[0].message);
        let product = await products_1.Products.updateOne({ "name": (req.query.name) }, {
            $set: {
                price: req.body.price,
                Availablequantity: req.body.Availablequantity
            }
        }, { new: true });
        if (!product)
            return res.status(404).send('Product with given data not found....');
        res.send(await products_1.Products.find());
    }
    else {
        // const {error}=validate(req.body);
        // if(error) return res.status(400).send(error.details[0].message);
        let product = await products_1.Products.updateMany({ "name": req.params.name }, {
            $set: {
                price: req.body.price,
                Availablequantity: req.body.Availablequantity
            }
        }, { new: true });
        if (!product)
            return res.status(404).send('Product with given data not found....');
        res.send(await products_1.Products.find());
    }
});
//router.delete('/:id',[auth,admin],async (req,res)=>{
router.delete('/:id', async (req, res) => {
    const product = await products_1.Products.findByIdAndRemove(req.params.id);
    if (!product)
        return res.status(404).send('The data with given id not found');
    res.send(await products_1.Products.find());
});
//router.delete('/',[auth,admin],async (req,res)=>{
router.delete('/', async (req, res) => {
    if (Object.keys(req.query).length != 0) {
        console.log(req.query);
        const product = await products_1.Products.findOneAndRemove({ 'name': (req.query.name) });
        if (!product)
            return res.status(404).send('The data with given id not found');
        res.send(await products_1.Products.find());
    }
    // else{
    //         console.log('Delete many')
    //         const product=await Products.deleteMany();
    //         console.log(product);
    //         //if(!product) return res.status(404).send('The data with given id not found');
    //         res.send(await Products.find());
    // }
});
exports.default = router;

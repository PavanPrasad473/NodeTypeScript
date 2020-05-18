import express from "express";
const app=express()
import config from 'config'
import winston from 'winston'
 //require('./startup/logging')();
 require('./startup/db')();
// console.log('Helooo');
// console.log(config.get('jwtPrivateKey'));
 require('./startup/config')();
 //require('./startup/validation')();
 
import error from './middleware/error'
import products from './routes/products'
import users from './routes/users'
import auth from './routes/auth'
app.use(express.json());
app.use('/api/products',products);
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use(error);
// require('./startup/routes')(app);


// app.set('view engine','pug');
// app.set('views','./views');

const port=process.env.port || 3000;
app.listen(port,()=>winston.info(`listening to port...${port}`));
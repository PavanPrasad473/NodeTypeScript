import mongoose from 'mongoose'
import winston from 'winston'

export=function(){
    mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true,useUnifiedTopology: true})
        .then(()=>winston.info('connection established....')
    );
    mongoose.set('useCreateIndex', true);
}

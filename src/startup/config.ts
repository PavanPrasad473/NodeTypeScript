//const config=require('config');
import config from 'config'
export=function(){
    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR jwtPrivateKey not defined');
    }
}
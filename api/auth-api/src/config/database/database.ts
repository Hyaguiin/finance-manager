import "dotenv/config";
import {Sequelize} from 'sequelize';
import { databaseURL } from "../../utils/baseurl/BaseUrll";


const sequelize = new Sequelize(databaseURL, {
    dialect: 'postgres',
    logging: true,
}
);


export const startServer = async()=>{
    try{
        sequelize.authenticate()
        .then(()=>{
        console.log(`Sucess! Database connected!!`);
        })
        .catch((err)=>{
            if(err instanceof Error){
                console.error(`Error: ${err}`);
    }else{
                 console.error(`Unknown Error`);
    }
})
    }catch(err){
        if(err instanceof Error){
            throw new Error(`Error ${err}`);
        }else{
            console.error(`Unknown Error!!`);
        }
    }
}

export default sequelize;

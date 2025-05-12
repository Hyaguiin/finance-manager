import "dotenv/config";
import {Sequelize} from 'sequelize';

const dbUrl = process.env.DATABASE_URL as string;

const sequelize = new Sequelize(dbUrl, {
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

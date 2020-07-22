import Knex from 'knex'
import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

export abstract class BasedataBase {
    private static connection: Knex | null = null;

    protected getConnection():Knex{
        if(BasedataBase.connection === null){
            BasedataBase.connection = knex({
                client:"mysql",
                connection:{
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME
                }
            })
        }
        return BasedataBase.connection
    }

    public static async destroyConnection():Promise<void>{
        if(BasedataBase.connection){
            await BasedataBase.connection.destroy();
            BasedataBase.connection = null;
        }
    }
}
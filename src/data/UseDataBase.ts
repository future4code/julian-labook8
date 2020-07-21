import { BasedataBase } from "./BaseDataBase";

export class UseDatabase extends BasedataBase{
    private static TABLE_NAME = "Users_LaBook"
    public createUser = async(
        id:string,
        email:string,
        name:string,
        password:string

    ):Promise<void> => {
        await this.getConnection()
        .insert({
            id,
            email,
            name,
            password
        })
        .into(UseDatabase.TABLE_NAME)

        BasedataBase.destroyConnection()
    };

    public getByEmail = async (email:string):Promise<any>  =>{
        const result = await this.getConnection()
        .select("*")
        .from(UseDatabase.TABLE_NAME)
        .where({email})

        BasedataBase.destroyConnection()

        return result [0]
    };
}
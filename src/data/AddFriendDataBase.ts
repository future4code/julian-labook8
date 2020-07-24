import { BasedataBase } from "./BaseDataBase";

export class AddFriendDatabase extends BasedataBase{
    private static TABLE_NAME = "Friends_LaBook"
     addFriend = async(user_id:string, friend_id:string):Promise<void> => {
        await this.getConnection()
        .insert({
            friend_id,
            user_id
        })
        .into(AddFriendDatabase.TABLE_NAME)

        BasedataBase.destroyConnection()
    };

    public getByEmail = async (email:string):Promise<any>  =>{
        const result = await this.getConnection()
        .select("*")
        .from(AddFriendDatabase.TABLE_NAME)
        .where({email})

        BasedataBase.destroyConnection()

        return result [0]
    };
}
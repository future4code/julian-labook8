import bcrypt from 'bcryptjs'

export class HashManeger{
    public hash = async (s:string):Promise<string> =>{
        const rounds = Number(process.env.BRCYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const result = await bcrypt.hash(s, salt)

        return result
    };

    public compare = async (s:string, hash:string):Promise<boolean> => {
        return await bcrypt.compare(s, hash)
    };
}
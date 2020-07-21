import * as jwt from 'jsonwebtoken'

interface AuthenticatorData {
    id:string
}

export class Authenticator{
    private static EXPRESS_IN = "20mim"

    generateToken(input:AuthenticatorData):string{
        const token = jwt.sign(
            {
                id:input.id,
            },
            process.env.JWT_KEY as string,

            {
                expiresIn: Authenticator.EXPRESS_IN
            }
        )

        return token
    }

    getData(token:string):AuthenticatorData{
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
        const result = {
            id:payload.id
        }
        return result
    }
}
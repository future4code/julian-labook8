import express from 'express'
import {Request, Response} from 'express';
import { AddressInfo } from "net";
import dotenv from 'dotenv'
import { HashManeger } from './services/HashManeger';
import { IdGenertor } from './services/IdGenerator';
import { UseDatabase } from './data/UseDataBase';
import { Authenticator } from './services/Authenticator';
import { BasedataBase } from './data/BaseDataBase';

dotenv.config()

const app = express()
app.use(express.json());

app.post("/signup", async (req:Request, res:Response) =>{
    try{
        if(!req.body.email || req.body.email.indexOf("@") === -1){
            console.log("Invalid Email :(")
        }

        const useInfo = {
            name: req.body.name,
            email: req.body.email,
            password:req.body.password
        }

        const hashManeger = new HashManeger()
        const cipherText = await hashManeger.hash(useInfo.password)

        const idGenerator = new IdGenertor()
        const id = idGenerator.generate()

        const useDb = new UseDatabase()
        await useDb.createUser(
            id,
            useInfo.email,
            useInfo.name,
            cipherText
        );

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({
            id
        })

        res.status(200).send({
            token,
          });
    }catch (err){
        res.status(400).send({
            message: err.message,
          });
    }

    await BasedataBase.destroyConnection();
} )

app.post("/login", async (req:Request, res:Response) => {
    try {
        if(!req.body.email || req.body.email.indexOf("@") === -1){
            console.log("Invalid Email :(")
        }

        const userData = {
            email:req.body.email,
            password:req.body.password
        }

        const useDb = new UseDatabase()
        const user = await useDb.getByEmail(userData.email)

        const hashManeger = new HashManeger()
        const comparePassword = await hashManeger.compare(userData.password, user.password)

        if(!comparePassword){
            throw new Error("invalid Password")
        }

        const authenticator = new Authenticator()
        const token = await authenticator.generateToken({id: user.id})

        res.status(200).send({
            token
        })
    } catch (err) {
        res.status(400).send({
            message:err.massage
        })
    }
})



const server = app.listen(process.env.DB_PORT || 3000, () => {
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }else{
        console.error(`Failure upon starting server.`);
    }
})
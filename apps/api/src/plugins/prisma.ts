import { PrismaClient } from '../generated/prisma/client.js'
import { type FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import {PrismaPg} from '@prisma/adapter-pg';
import 'dotenv/config'

const prismaPlugin:FastifyPluginAsync = async(fastify) =>{
    const connectionString = process.env.DATABASE_URL;

    if(!connectionString){
        throw new Error("DATABASE_URL is not configured");
    }
    
    const adapter = new PrismaPg({
        connectionString,
    });
    
   const prisma = new PrismaClient({
    adapter,
   });

   //Establish the connection when plugin starts//
   await prisma.$connect();
   // Make prisma  accessible  throughout fastify 
   fastify.decorate("prisma", prisma);

   //Disconnect when Fastify shuts down.
   fastify.addHook("onClose", async(instance)=>{
    await instance.prisma.$disconnect();
   })
}

export default fp(prismaPlugin, {
    name : 'prisma',
})

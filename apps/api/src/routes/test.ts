import { FastifyInstance } from "fastify";

export default async function testRoutes(fastify:FastifyInstance){
   fastify.get('/test/users',async(request, reply)=>{
    try{
     const users = await fastify.prisma.user.findMany({
        take: 5,
     })
     return {success:true, data:users}
    }catch(error:any){
    reply.status(500);
    return{success:false, message:error.message}
    }
   });
}
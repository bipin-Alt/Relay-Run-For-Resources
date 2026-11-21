import { FastifyInstance } from "fastify";

export default async function healthRoutes(fastify:FastifyInstance) {
    fastify.get('/health/db', async(request, reply)=>{
     try{
        await fastify.prisma.$queryRaw`SELECT 1`;
        return{ status:'healthy', database:'connected'}

     }catch(error){
      reply.status(500);
      return { status:'unhealthy', database:'Database connection failed'};
     }
    })
}
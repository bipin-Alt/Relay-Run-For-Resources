'use strict'

import { createApp } from "./app.js";

const server = createApp({
  logger : {
    level:'info',
     transport : {
        target : 'pino-pretty'
     }
  }
});

server.listen({ port: 4000, host:'0.0.0.0' }, (err : Error | null , address:String)=>{
  if(err){
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server is listening at ${address}`)
})
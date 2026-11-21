import bcrypt from "bcryptjs";
import { Prisma, PrismaClient } from "../generated/prisma/client.js";
import { AppError } from "../lib/errors.js";

export interface RegisterType{
   email:string,
   password:string,
   confirmPassword: string,
   name:string
}

export interface LoginType{
   email:string,
   password:string
}

export async function RegisterUser (prisma:PrismaClient, data:{ normalizedEmail:string, password:string, name:string}){
   try {
   const accountAlreadyExist = await prisma.user.findUnique({where:{email:data.normalizedEmail}});
   if(accountAlreadyExist){
      throw new AppError("Email already exists try loggin in..", 409)     
   }

   const passwordHash = await bcrypt.hash(data.password,10);

   const user = await prisma.user.create({
      data:{ email:data.normalizedEmail, name:data.name, passwordHash},
   });

   return {
    user: { id: user.id, email: user.email, name: user.name },
  };
   }catch(error){
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code ==="P2002" ){
        throw  new AppError("An account with this email already exists",409)
      }
     throw error;
   };
};

export async function LoginUser (prisma:PrismaClient, data :{ normalizedEmail: string, password: string}){
  
      const user = await prisma.user.findUnique({where:{email:data.normalizedEmail}});

      if(!user){
         throw  new AppError("Invalid Email or Password.",401);
      }
      if(!user.passwordHash){
         throw new AppError("Your account uses different sign-in method, try login with that.", 401);
      }
      
      const doesPasswordMatch = await bcrypt.compare(data.password, user.passwordHash);

      if(!doesPasswordMatch){
         throw new AppError("Invalid Email or Password", 401);
      }
     return {
      user : {id: user.id, email:user.email, name:user.name}
     }
}


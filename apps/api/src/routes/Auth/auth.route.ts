import { FastifyInstance } from "fastify";
import {
  loginSchema,
  registerSchema,
} from "../../plugins/schema/dbAuthSchema.js";
import {
  LoginType,
  LoginUser,
  RegisterType,
  RegisterUser,
} from "../../services/auth.services.js";
import { AppError } from "../../lib/errors.js";

export default async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: RegisterType }>(
    "/register",
    { schema: registerSchema },
    async (request, response) => {
      
        const { email, password, name, confirmPassword } = request.body;
        const normalizedEmail = email.trim().toLowerCase();
        if (confirmPassword !== password) {
          throw new AppError("Passwords didn't match, enter again..", 400);
        }
        const result = await RegisterUser(app.prisma, {
          normalizedEmail,
          password,
          name,
        });
        return response.code(201).send(result);
    },
  );

  app.post<{ Body: LoginType }>(
    "/login",
    { schema: loginSchema },
    async (request, response) => {
        const { email, password } = request.body;
        const normalizedEmail = email.trim().toLowerCase();
        const result = await LoginUser(app.prisma, {
          normalizedEmail,
          password,
        });

         console.log("User successfully Logged in (From auth.route.ts) :", result);
        return response.code(200).send(result);
     
    },
  );
}

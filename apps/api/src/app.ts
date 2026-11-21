"use strict";
import fastify, {
  FastifyError,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";
import AutoLoad from "@fastify/autoload";
import { fileURLToPath, URL } from "url";
import { dirname, join } from "path";
import { AppError } from "./lib/errors.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function createApp(opts: FastifyServerOptions = {}) {
  const app = fastify(opts);
  app.get("/", async function (request, reply) {
    return {
      status: "ok",
      service: "relay-api",
    };
  });

  //Registering the error handler
  app.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, response: FastifyReply) => {
      //Checking the error is instance for AppError//
      if (error instanceof AppError) {
        return response.code(error.statusCode).send({message: error.message});
      }
      //This is the validation  error handling
      if (error.validation) {
        return response.status(error.statusCode || 400).send({
          statusCode: error.statusCode || 400,
          error: "Validation Error",
          message: error.message,
          details: error.validation, // Raw validation errors from AJV/custom validator
        });
      }

      //else
      request.log.error(error );
      response.status(500).send({
        statusCode: 500,
        error: "Internal Server Error",
        message: "Internal Server Error",
      });
    },
  );
  // Register prisma and other plugin automatically from the plugin directory//
  app.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // Register all routes files from the routes directory automatically
  app.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
  return app;
}

import { fastify } from "fastify";

import { sql } from "./db/connection.ts";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return "ok";
});

app.listen({ port: env.PORT ? Number(env.PORT) : 3333 }).then(() => {
  console.log(`http server running! as ${env.PORT} `);
});

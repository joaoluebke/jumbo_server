import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multer from "fastify-multer";
import * as dotenv from "dotenv";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import { productRoutes } from "./routes/product";
import { categoryRoutes } from "./routes/category";
import { subCategoryRoutes } from "./routes/subCategory";
import { bannerRoutes } from "./routes/banner";
import { awsRoutes } from "./routes/aws";
import fs from "fs";
import path from "path";

dotenv.config();

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
    http2: true,
    https: {
      key: fs.readFileSync(path.join(__dirname, "../src", "ssl", "jumbo-decrypted.key")),
      cert: fs.readFileSync(
        path.join(__dirname, "../src", "ssl", "jumbo.co.ao.crt")
      ),
    },
  });

  await fastify.register(multer.contentParser);

  await fastify.register(cors, { origin: true });

  await fastify.register(jwt, { secret: process.env.JWT_SECRET });

  fastify.register(awsRoutes);
  fastify.register(authRoutes);
  fastify.register(userRoutes);
  fastify.register(bannerRoutes);
  fastify.register(productRoutes);
  fastify.register(categoryRoutes);
  fastify.register(subCategoryRoutes);

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}
bootstrap();

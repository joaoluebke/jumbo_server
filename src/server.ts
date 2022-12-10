import Fastify from "fastify";
import cors from "@fastify/cors";
import { productRoutes } from "./routes/product";
import { userRoutes } from "./routes/user";
import { categoryRoutes } from "./routes/category";
import { subCategoryRoutes } from "./routes/subCategory";
// import jwt from "@fastify/jwt";
import multer from "fastify-multer";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(multer.contentParser);

  await fastify.register(cors, {
    origin: true,
  });

  // await fastify.register(jwt, {
  //   secret: process.env.JWT_SECRET,
  // });

  fastify.register(productRoutes);
  fastify.register(userRoutes);
  fastify.register(categoryRoutes);
  fastify.register(subCategoryRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}
bootstrap();

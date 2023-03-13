import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { authenticate } from "../plugins/authenticate";

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/categories",
    async () => {
      const categories = await prisma.category.findMany();
      return { categories };
    }
  );

  fastify.get(
    "/categories/:id",
    async (request) => {
      const getCategoryParams = z.object({
        id: z.string(),
      });
      const { id } = getCategoryParams.parse(request.params);
      const category = await prisma.category.findMany({
        where: {
          id: parseInt(id),
        },
      });

      return { category };
    }
  );

  fastify.post(
    "/categories",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const createCategory = z.object({
        title: z.string(),
      });

      const category = createCategory.parse(request.body);

      await prisma.category.create({
        data: category,
      });

      return reply.status(201).send();
    }
  );

  fastify.delete(
    "/categories/:id",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const getCategoryId = z.object({
        id: z.string(),
      });

      const { id } = getCategoryId.parse(request.params);

      await prisma.subCategory.deleteMany({
        where: {
          categoryId: parseInt(id),
        },
      });

      await prisma.category.deleteMany({
        where: {
          id: {
            in: parseInt(id),
          },
        },
      });

      return reply.status(201).send("Deletado com sucesso!");
    }
  );

  fastify.put(
    "/categories/:id",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const createCategory = z.object({
        title: z.string(),
      });

      const getCategoryId = z.object({
        id: z.string(),
      });

      const { id } = getCategoryId.parse(request.params);
      const category = createCategory.parse(request.body);

      await prisma.category.update({
        where: {
          id: parseInt(id),
        },
        data: category,
      });

      return reply.status(201).send();
    }
  );
}

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function subCategoryRoutes(fastify: FastifyInstance) {
  fastify.get("/subcategories", async () => {
    const subcategories = await prisma.subCategory.findMany();
    return { subcategories };
  });

  fastify.get("/subcategories/:id", async (request) => {
    const getSubCategoryParams = z.object({
      id: z.string(),
    });
    const { id } = getSubCategoryParams.parse(request.params);
    const subcategory = await prisma.subCategory.findMany({
      where: {
        id: parseInt(id),
      },
    });

    return { subcategory };
  });

  fastify.post("/subcategories", async (request, reply) => {
    const createSubCategory = z.object({
      title: z.string(),
      categoryId: z.number(),
    });

    const subCategory = createSubCategory.parse(request.body);

    await prisma.subCategory.create({
      data: subCategory,
    });

    return reply.status(201).send();
  });

  fastify.delete("/subcategories/:id", async (request, reply) => {
    const getSubCategoryId = z.object({
      id: z.string(),
    });

    const { id } = getSubCategoryId.parse(request.params);

    await prisma.subCategory.deleteMany({
      where: {
        id: parseInt(id),
      },
    });

    return reply.status(201).send();
  });

  fastify.put("/subcategories/:id", async (request, reply) => {
    const createSubCategory = z.object({
      title: z.string(),
      categoryId: z.number(),
    });

    const getSubCategoryId = z.object({
      id: z.string(),
    });

    const { id } = getSubCategoryId.parse(request.params);
    const subCategory = createSubCategory.parse(request.body);

    await prisma.subCategory.update({
      where: {
        id: parseInt(id),
      },
      data: subCategory,
    });

    return reply.status(201).send();
  });
}

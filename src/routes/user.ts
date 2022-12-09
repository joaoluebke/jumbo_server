import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { hash } from "bcrypt";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/users", async () => {
    const users = await prisma.product.findMany();
    return { users };
  });

  fastify.get("/users/:id", async (request) => {
    const getUserParams = z.object({
      id: z.string(),
    });
    const { id } = getUserParams.parse(request.params);
    const user = await prisma.user.findMany({
      where: {
        id: id,
      },
    });

    return { user };
  });

  fastify.post("/user", async (request, reply) => {
    const createUser = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      ruleId: z.number(),
    });

    const user = createUser.parse(request.body);

    await prisma.user.create({
      data: user,
    });

    return console.log("usuário: ", user);
  });

  fastify.delete("/user/:id", async (request) => {
    const getUserId = z.object({
      id: z.string(),
    });

    const { id } = getUserId.parse(request.params);

    await prisma.user.deleteMany({
      where: {
        id: id,
      },
    });

    return console.log("usuário deletado");
  });

  fastify.put("/usuário/:id", async (request) => {
    const createUser = z.object({
      name: z.string(),
      email: z.string(),
      password: z.boolean(),
      ruleId: z.number(),
    });

    const getUserId = z.object({
      id: z.string(),
    });

    const { id } = getUserId.parse(request.params);
    const user = createUser.parse(request.body);

    await prisma.user.update({
      where: {
        id: id,
      },
      data: user,
    });

    return console.log("usuário atualizado");
  });
}

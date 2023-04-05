import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { hash } from "bcrypt";
import { authenticate } from "../plugins/authenticate";

type userEstruct = {
  name: string;
  email: string;
  id: string;
  ruleId: string;
};

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/users",
    {
      onRequest: [authenticate],
    },
    async () => {
      const users = await prisma.user.findMany();
      return { users };
    }
  );

  fastify.get(
    "/users/:id",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const getUserParams = z.object({
        id: z.string(),
      });
      const { id } = getUserParams.parse(request.params);

      const user = await prisma.user.findMany({
        where: {
          id: parseInt(id),
        },
      });

      return { user };
    }
  );

  fastify.post("/user", async (request, reply) => {
    const createUser = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      ruleId: z.number(),
    });

    const user = createUser.parse(request.body);

    const userExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userExists) {
      throw new Error("Email já cadastrado!");
    }

    user.password = await hash(user.password, 8);

    await prisma.user.create({
      data: user,
    });
    return { user };
  });

  fastify.delete(
    "/user/:id",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const getUserId = z.object({
        id: z.string(),
      });

      const { id } = getUserId.parse(request.params);

      await prisma.user.deleteMany({
        where: {
          id: parseInt(id),
        },
      });

      return "usuário deletado";
    }
  );

  fastify.put(
    "/user/:id",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const createUser = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        ruleId: z.number(),
      });

      const getUserId = z.object({
        id: z.string(),
      });

      const { id } = getUserId.parse(request.params);
      const user = createUser.parse(request.body);

      await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: user,
      });

      return console.log("usuário atualizado");
    }
  );
}

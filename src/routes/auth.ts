import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import { authenticate } from "../plugins/authenticate";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/login", async (request, reply) => {
    const createUser = z.object({
      email: z.string(),
      password: z.string(),
    });

    const user = createUser.parse(request.body);

    const userExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    let res = "";

    if (!userExists) {
      return reply.status(500).send({ res: "Email ou senha inválido!" });
    }
    const match = await bcrypt.compare(user.password, userExists.password);

    if (!match) {
      return reply.status(500).send({ res: "Email ou senha inválido!" });
    }

    const token = fastify.jwt.sign(
      { id: userExists.id, options: process.env.JWT_SECRET },
      { expiresIn: "8h" }
    );

    const userRestruturado = {
      name: userExists.name,
      email: userExists.email,
      id: userExists.id,
      ruleId: userExists.ruleId,
    };

    return { token, userRestruturado };
  });

  fastify.get(
    "/me",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const { authorization } = request.headers;

      if (!authorization) {
        throw new Error("Não autorizado");
      }

      const token = authorization.split(" ")[1];

      return { token };
    }
  );
}

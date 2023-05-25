import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { authenticate } from "../plugins/authenticate";

export async function bannerRoutes(fastify: FastifyInstance) {
  fastify.get("/banners", async () => {
    const banners = await prisma.banner.findMany();
    return { banners };
  });

  fastify.get("/banners/:id", async (request) => {
    const getBannerParams = z.object({
      id: z.string(),
    });
    const { id } = getBannerParams.parse(request.params);
    const banner = await prisma.banner.findMany({
      where: {
        id: parseInt(id),
      },
    });

    return { banner };
  });

  fastify.post(
    "/banners",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const createBanner = z.object({
        title: z.string(),
        urlImg: z.string()
      });

      const banner = createBanner.parse(request.body);

      await prisma.banner.create({
        data: banner,
      });

      return reply.status(201).send();
    }
  );

  fastify.delete(
    "/banners/:id",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const getBannerId = z.object({
        id: z.string(),
      });

      const { id } = getBannerId.parse(request.params);

      await prisma.banner.deleteMany({
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
    "/banners/:id",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const createBanner = z.object({
        title: z.string(),
      });

      const getBannerId = z.object({
        id: z.string(),
      });

      const { id } = getBannerId.parse(request.params);
      const banner = createBanner.parse(request.body);

      await prisma.banner.update({
        where: {
          id: parseInt(id),
        },
        data: banner,
      });

      return reply.status(201).send("Banner atualizado com sucesso!");
    }
  );
}

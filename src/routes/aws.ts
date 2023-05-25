import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import multer from "fastify-multer";
import multerConfig from "../config/multer";
import UploadImageService from "../services/UploadImageService";
import DeleteImageService from "../services/DeleteImageService";
import { authenticate } from "../plugins/authenticate";

const upload = multer(multerConfig);

export async function awsRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/upload-file-aws",
    preHandler: upload.single("file"),
    handler: async function (request, reply) {
      const { file }: any = request;

      const uploadImageService = new UploadImageService();
      const url = await uploadImageService.execute(file);

      const getParams = z.object({
        id: z.string(),
        type: z.string(),
      });

      const { id, type } = getParams.parse(request.body);

      if (type == "product") {
        const product = await prisma.product.update({
          where: {
            id: parseInt(id),
          },
          data: {
            urlImg: url,
          },
        });
        // request.body contains the text fields
        reply.code(200).send({ product });
      } else if (type == "banner") {
        const banner = await prisma.banner.update({
          where: {
            id: parseInt(id),
          },
          data: {
            urlImg: url,
          },
        });
        // request.body contains the text fields
        reply.code(200).send({ banner });
      } else {
        return "Não deu liga";
      }
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/delete-file/:id/:filename",
    handler: async function (request, reply) {
      const { filename }: any = request.params;

      const deleteImageService = new DeleteImageService();
      await deleteImageService.execute(filename);

      const getParams = z.object({
        id: z.string(),
      });

      const getBody = z.object({
        type: z.string(),
      });

      const { id } = getParams.parse(request.params);
      const { type } = getBody.parse(request.body);

      if (type == "product") {
        const product = await prisma.product.update({
          where: {
            id: parseInt(id),
          },
          data: {
            urlImg: "",
          },
        });

        reply.code(200).send({ product });
      } else if (type == "banner") {
        const banner = await prisma.banner.update({
          where: {
            id: parseInt(id),
          },
          data: {
            urlImg: "",
          },
        });

        reply.code(200).send({ banner });
      } else {
        return "Não deu liga";
      }
    },
  });
}

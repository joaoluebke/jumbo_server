import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import multer from "fastify-multer";
import multerConfig from "../config/multer";
import { authenticate } from "../plugins/authenticate";

const upload = multer(multerConfig);

export async function productRoutes(fastify: FastifyInstance) {
  fastify.get("/products", async () => {
    const products = await prisma.product.findMany();
    return { products };
  });

  fastify.get("/products/search/:title", async (request) => {
    const getProductParams = z.object({
      title: z.string(),
    });
    const { title } = getProductParams.parse(request.params);
    const query = `%${title}%`;

    const products = await prisma.$queryRaw<
      []
    >`SELECT * from "Product" WHERE "title" LIKE ${query}`;
    return { products };
  });

  fastify.get("/products/promotions", async () => {
    const promotions = await prisma.product.findMany({
      where: {
        promotion: true,
      },
    });
    return { promotions };
  });

  fastify.get("/products/:id", async (request) => {
    const getProductParams = z.object({
      id: z.string(),
    });
    const { id } = getProductParams.parse(request.params);
    const product = await prisma.product.findMany({
      where: {
        id: parseInt(id),
      },
    });

    return { product };
  });

  fastify.get("/products/subcategories/:subcategoryId", async (request) => {
    const getCategoryParams = z.object({
      subcategoryId: z.string(),
    });

    const { subcategoryId } = getCategoryParams.parse(request.params);

    const productsBySubCategory = await prisma.product.findMany({
      where: {
        subCategoryId: parseInt(subcategoryId),
      },
    });

    return { productsBySubCategory };
  });

  fastify.post(
    "/products",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const createProduct = z.object({
        title: z.string(),
        description: z.string(),
        promotion: z.boolean(),
        price: z.number(),
        promotionPrice: z.number(),
        urlImg: z.string(),
        subCategoryId: z.number(),
      });

      const product = createProduct.parse(request.body);

      await prisma.product.create({
        data: product,
      });

      return reply.status(201).send();
    }
  );

  fastify.delete(
    "/products/:id",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const getProductId = z.object({
        id: z.string(),
      });

      const { id } = getProductId.parse(request.params);

      await prisma.product.deleteMany({
        where: {
          id: parseInt(id),
        },
      });

      return reply.status(201).send();
    }
  );

  fastify.put(
    "/products/:id",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const createProduct = z.object({
        title: z.string(),
        description: z.string(),
        promotion: z.boolean(),
        price: z.number(),
        promotionPrice: z.number(),
        subCategoryId: z.number(),
      });

      const getProductId = z.object({
        id: z.string(),
      });

      const { id } = getProductId.parse(request.params);
      const newProduct = createProduct.parse(request.body);

      const savedProduct = await prisma.product.update({
        where: {
          id: parseInt(id),
        },
        data: newProduct,
      });

      return reply.status(201).send(savedProduct);
    }
  );

  // fastify.route({
  //   method: "POST",
  //   url: "/upload-file-aws",
  //   preHandler: upload.single("file"),
  //   handler: async function (request, reply) {
  //     const { file }: any = request;

  //     const uploadImageService = new UploadImageService();
  //     const url = await uploadImageService.execute(file);

  //     const getProductId = z.object({
  //       id: z.string(),
  //     });

  //     const { id } = getProductId.parse(request.body);

  //     const product = await prisma.product.update({
  //       where: {
  //         id: parseInt(id),
  //       },
  //       data: {
  //         urlImg: url,
  //       },
  //     });
  //     // request.body contains the text fields
  //     reply.code(200).send({ product });
  //   },
  // });

  // fastify.route({
  //   method: "DELETE",
  //   url: "/delete-file/:id/:filename",
  //   handler: async function (request, reply) {
  //     const { filename }: any = request.params;

  //     const deleteImageService = new DeleteImageService();
  //     await deleteImageService.execute(filename);

  //     const getProductId = z.object({
  //       id: z.string(),
  //     });

  //     const { id } = getProductId.parse(request.params);

  //     const product = await prisma.product.update({
  //       where: {
  //         id: parseInt(id),
  //       },
  //       data: {
  //         urlImg: "",
  //       },
  //     });

  //     reply.code(200).send({ product });
  //   },
  // });
}

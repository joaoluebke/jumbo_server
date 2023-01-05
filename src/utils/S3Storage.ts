import fs from "fs";
import path from "path";
import mime from "mime";

import aws, { S3 } from "aws-sdk";
import multerConfig from "../config/multer";

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
  }

  async saveFile(filename: any): Promise<string> {
    const originalPath = path.resolve(multerConfig.directory, filename);
    const ContentType = originalPath;

    if (!ContentType) {
      throw new Error("File not found");
    }

    const fileContent = await fs.promises.readFile(ContentType);
    const response = await this.client
      .upload({
        Bucket: "jumbo-app-image",
        Key: filename,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
        ContentDisposition: "inline",
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return response.Location;
  }

  async deleteFile(filename: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: "jumbo-app-image",
        Key: filename,
      })
      .promise();
  }
}

export default S3Storage;

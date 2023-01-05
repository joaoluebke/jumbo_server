import S3Storage from "../utils/S3Storage";

class UploadImageService {
   async execute(file: Express.Multer.File): Promise<string> {
      const s3Storage = new S3Storage();
      console.log('UploadImage')
      return await s3Storage.saveFile(file.filename);
   }
}

export default UploadImageService;
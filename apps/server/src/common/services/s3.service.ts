import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class S3Service {
  bucketName: string;
  client: S3;

  constructor() {
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || '';
    this.client = new S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
      endpoint: process.env.AWS_ORIGIN,
      region: process.env.AWS_REGION,
    });
  }

  deleteFile(key: string) {
    return this.client.deleteObject({
      Bucket: this.bucketName,
      Key: key,
    });
  }

  async uploadFile(key: string, body: Buffer, contentType: string) {
    key = slugify(key, { lower: true, strict: true }) + '-' + Date.now();

    const command = new PutObjectCommand({
      Body: body,
      Bucket: this.bucketName,
      ContentType: contentType,
      Key: key,
    });

    const response = await this.client.send(command);

    return {
      ...response,
      key,
    };
  }
}

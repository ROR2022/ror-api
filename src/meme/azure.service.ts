import { Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
//import { v4 as uuidv4 } from 'uuid';
const myContainerName = process.env.AZURE_CONTAINER_NAME;
const myConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;


//console.log('myContainerName:', myContainerName);
@Injectable()
export class AzureStorageService {
    //eslint-disable-next-line
  private blobServiceClient: BlobServiceClient;
  private containerClient:any;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(myConnectionString);
    this.containerClient = this.blobServiceClient.getContainerClient(myContainerName);
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const blobName = `${this.createUniqueID()}.png`;
    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

    //const uploadBlobResponse = 
    await blockBlobClient.uploadData(file.buffer);
    //console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    //console.log('URL:', blockBlobClient.url);

    return blockBlobClient.url;
  }

  createUniqueID(): string {
    return Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
  }
}

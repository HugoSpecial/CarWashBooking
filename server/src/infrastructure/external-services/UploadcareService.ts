import { UploadClient } from '@uploadcare/upload-client';

class UploadcareService {
  private client: UploadClient;

  constructor(public readonly publicKey: string) {
    this.client = new UploadClient({ publicKey });
  }

  public async uploadFile(buffer: Buffer, fileName: string) {
    return await this.client.uploadFile(buffer, { fileName });
  }
}

export default UploadcareService;

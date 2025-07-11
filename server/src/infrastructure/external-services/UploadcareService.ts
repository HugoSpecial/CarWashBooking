import { UploadClient } from '@uploadcare/upload-client';

import { UPLOADCARE_SECRET_KEY } from '../config/config.js';

class UploadcareService {
  private client: UploadClient;

  constructor() {
    this.client = new UploadClient({ publicKey: UPLOADCARE_SECRET_KEY });
  }

  public async uploadFile(buffer: Buffer, fileName: string) {
    return await this.client.uploadFile(buffer, { fileName });
  }
}

export default UploadcareService;

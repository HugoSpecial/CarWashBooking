import MongoService from './infrastructure/db/connection.js';
import ExpressServer from './infrastructure/http/ExpressServer.js';
import logger from './infrastructure/logger/winstonLogger.js';
//import "./types/express";

/**
 * Initialize server
 */
async function main() {
  try {
    const mongoDb = new MongoService();

    await mongoDb.connect();

    const server = new ExpressServer(mongoDb);

    server.listen();
  } catch (error) {
    logger.error('An unexpected error occurred: ', error);
    process.exit(1);
  }
}

void main();

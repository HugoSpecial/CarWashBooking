import MongoService from './infrastructure/db/connection.js';
import ExpressServer from './infrastructure/http/ExpressServer.js';
import logger from './infrastructure/logger/winstonLogger.js';

async function shutdown(mongoDb: MongoService): Promise<void> {
  logger.info('Shutting down server...');

  await mongoDb.disconnect();

  process.exit(0);
}

function handleShutdown(mongoDb: MongoService) {
  shutdown(mongoDb).catch((error) => {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  });
}
/**
 * Initialize server
 */
async function main() {
  try {
    const mongoDb = new MongoService();

    await mongoDb.connect();

    const server = new ExpressServer(mongoDb);

    server.listen();

    process.on('SIGINT', () => handleShutdown(mongoDb));
    process.on('SIGTERM', () => handleShutdown(mongoDb));
  } catch (error) {
    logger.error('An unexpected error occurred: ', error);
    process.exit(1);
  }
}

void main();

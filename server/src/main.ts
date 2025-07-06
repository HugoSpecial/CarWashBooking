import MongoService from "./infrastructure/db/connection.js";
import ExpressServer from "./infrastructure/http/ExpressServer.js";
import "./types/express";

/**
 * Initialize server
 */
async function main () {
  try { 
    const mongoDb = new MongoService();

    await mongoDb.connect();

    const server = new ExpressServer(mongoDb);

    server.listen()
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
  }
}

main();
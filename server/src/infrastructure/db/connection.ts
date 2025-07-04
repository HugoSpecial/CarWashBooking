import mongoose, { Connection, MongooseError } from "mongoose";

class MongoService {
  private connection: Connection | null = null;

  private connected = false;

  public isConnected(): boolean {
    return this.connected;
  }

  public async connect(): Promise<void> {
    if (this.isConnected()) {
      console.warn("MongoDB already connected");
      return;
    }

    const url = process.env.MONGO_URL;

    if (!url) {
      throw new Error("MONGO_URL environment variable is not set");
    }

    try {
      mongoose.connection.on("connected", () => {
        this.connected = true;
        console.info("Conected to MongoDB");
      });

      mongoose.connection.on("error", (error: MongooseError) => {
        console.error("Error connecting to MongoDB", error);
        throw error;
      });

      mongoose.connection.on("disconnected", () => {
        this.connected = false;
        console.warn("MongoDB connection lost");
      });

      await mongoose.connect(url);

      this.connection = mongoose.connection;
    } catch (error) {
      console.error("MongoDB connection failed", error);
      throw error;
    }
  }

  public async close(): Promise<void> {
    try {
      await mongoose.disconnect();

      this.connected = false;
      this.connection = null;

      console.info("MongoDB connection closed");
    } catch (error) {
      console.error("Failed to close connection");
      throw error;
    }
  }
}

export default MongoService;

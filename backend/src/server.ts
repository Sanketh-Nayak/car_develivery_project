import mongoose from "mongoose";
import app from "./app";
import { config } from "./config";

async function start() {
  await mongoose.connect(config.mongoUri);
  const server = app.listen(config.port, () => {
    console.log(`AutoVault API listening on http://localhost:${config.port}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

start().catch((error) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
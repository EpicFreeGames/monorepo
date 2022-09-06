import { verifyKeyMiddleware } from "discord-interactions";
import express from "express";

import { configuration } from "@efg/configuration";

import { handleRequests } from "./handleRequest";

export const createApp = () => {
  const app = express();
  app.set("trust proxy", "loopback");

  app.post("/interactions", verifyKeyMiddleware(configuration.DISCORD_PUBLIC_KEY), handleRequests);

  return app;
};

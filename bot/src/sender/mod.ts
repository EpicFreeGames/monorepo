import { createBot } from "discordeno";
import { config } from "~config";
import { handleCache } from "~shared/cache.ts";
import { connectRedis } from "~shared/redis.ts";
import { botRest } from "~shared/utils/botRest.ts";
import { logger } from "~shared/utils/logger.ts";
import { send } from "./send.ts";

export const sender = handleCache(
  createBot({
    token: config.BOT_TOKEN,
    botId: config.BOT_ID,
    intents: config.Intents,
  })
);

sender.rest = botRest;

await connectRedis();

const port = Number(Deno.env.get("PORT")) || 3000;

const httpServer = Deno.listen({ port });
logger.info(`Sender listening for events on port ${port}`);

for await (const conn of httpServer) {
  (async () => {
    const httpConn = Deno.serveHttp(conn);

    for await (const requestEvent of httpConn) {
      if (config.SENDER_AUTH !== requestEvent.request.headers.get("AUTHORIZATION"))
        return requestEvent.respondWith(
          new Response(JSON.stringify({ error: "Invalid secret key." }), {
            status: 401,
          })
        );

      const { sendingId } = await requestEvent.request.json();

      const startedSending = send(sendingId);

      if (!startedSending)
        return requestEvent.respondWith(
          new Response(JSON.stringify({ message: "sending was not started" }), { status: 500 })
        );

      return requestEvent.respondWith(
        new Response(JSON.stringify({ message: "sending started" }), { status: 200 })
      );
    }
  })();
}

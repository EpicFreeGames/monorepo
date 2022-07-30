/** @jsx h */
import { IUser } from "../types.ts";
import { api } from "../utils/api.ts";
import { Handlers } from "../utils/freshTypes.ts";

export const handler: Handlers = {
  GET: async (req, _ctx) => {
    const code = new URL(req.url).searchParams.get("code");

    const { error, response } = await api<IUser & { sid: string }>({
      method: "GET",
      path: `/auth/discord?code=${code}`,
    });

    if (error)
      return new Response(
        JSON.stringify({
          error: error?.message,
        }),
        { status: Number(error?.status ?? 500) }
      );

    return new Response(null, {
      status: 303,
      headers: { Location: "/", "Set-Cookie": response.headers.get("Set-Cookie")! },
    });
  },
};

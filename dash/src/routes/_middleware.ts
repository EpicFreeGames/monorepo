import { getCookies } from "$std/http/cookie.ts";
import { IUser } from "../types.ts";
import { api } from "../utils/api.ts";
import { MiddlewareHandlerContext } from "../utils/freshTypes.ts";

export const handler = async (req: Request, ctx: MiddlewareHandlerContext) => {
  const path = new URL(req.url).pathname;

  if (path === "/login" || path === "/discord-callback") return ctx.next();

  const cookies = getCookies(req.headers);

  if (!cookies.sid)
    return new Response("", {
      status: 303,
      headers: {
        location: "/login",
      },
    });

  const { error, data: user } = await api<IUser>({
    method: "GET",
    path: "/users/@me",
    auth: cookies.sid,
  });

  error && console.error(error);

  if (!user || error)
    return new Response("", {
      status: 303,
      headers: {
        location: "/login",
      },
    });

  ctx.state = {
    user,
    auth: cookies.sid,
  };

  return ctx.next();
};

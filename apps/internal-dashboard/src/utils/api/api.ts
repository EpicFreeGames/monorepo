import toast from "react-hot-toast";

import { isBrowser } from "~hooks/useIsBrowser";
import { apiBaseUrl } from "~utils/envs";

type Props = {
  path: string;
  method: string;
  body?: any;
  query?: URLSearchParams;
  redirect40X?: boolean;
};

export const apiRequest = <TData = any>({ method, path, body, query, redirect40X = true }: Props) =>
  fetch(`${apiBaseUrl}${path}${!!query ? `?${query.toString()}` : ""}`, {
    method,
    credentials: "include",
    ...(body && {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }),
  }).then(async (r) => {
    const json = await r.json().catch((e) => null);

    if (r.ok) {
      return json as TData;
    } else {
      const error = json ?? {
        statusCode: r.status ?? 500,
        error: r.statusText ?? "Unknown error",
        message: r.statusText ?? "Unknown error",
      };

      if (isBrowser) {
        if (redirect40X) {
          if (error.statusCode === 401) window.location.href = "/login";
          if (error.statusCode === 403) window.location.href = "/";
        }
      }

      toast.error(error.message);

      throw new Error(error.message);
    }
  });

export type ApiError = {
  statusCode: number;
  error: string;
  message: string;
};

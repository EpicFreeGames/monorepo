import { Server } from "@prisma/client";

import { currencies, defaultCurrency } from "../i18n/currencies";
import { defaultLanguage, languages } from "../i18n/languages";
import { ICurrency, ILanguage } from "../i18n/types";

export const addLocaleInfoToServers = (
  ...servers: Server[]
): (Server & { currency: ICurrency; language: ILanguage })[] =>
  servers.map((server) => ({
    ...server,
    currency: currencies.get(server.currencyCode) ?? defaultCurrency,
    language: languages.get(server.languageCode) ?? defaultLanguage,
  }));

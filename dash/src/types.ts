export type IUser = {
  id: string;
  discordId: string;
  name: string;
  flags: number;
};

export type IGamePrice = {
  value: number;
  formattedValue: string;
  currencyCode: string;
};

export type IGame = {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  /**
   * Date as an ISO string
   */
  start: string;
  /**
   * Date as an ISO string
   */
  end: string;
  path: string;
  confirmed: boolean;
  prices: IGamePrice[];
};

export type ILanguage = {
  code: string;
  englishName: string;
  nativeName: string;
};

export type ICurrency = {
  id: string;
  code: string;
  name: string;
  apiValue: string;
  inFrontOfPrice: string;
  afterPrice: string;
};

export type IServer = {
  id: string;
  roleId: string | null;
  channelId: string | null;
  threadId: string | null;
  languageCode: ILanguage["code"];
  currency: ICurrency;
  currencyCode: ICurrency["code"];
  createdAt: number;
};

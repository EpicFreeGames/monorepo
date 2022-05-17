import { IConfig } from "./types";

export const config: IConfig = {
  crowdinDistHash: "",

  interactionsPort: 0,
  senderPort: 0,
  clientPort: 0,

  infoHookUrl: "",
  loggingHookUrl: "",
  senderHookUrl: "",

  senderUrl: "",

  botId: "",
  botToken: "",
  botPublicKey: "",

  mongoUrl: "",

  topGGAuth: "",

  adminIds: [],
  guildId: "",

  prod: false,

  webUi: {
    discordClientId: "",
    discordClientSecret: "",
    nextAuthSecret: "",
  },
};

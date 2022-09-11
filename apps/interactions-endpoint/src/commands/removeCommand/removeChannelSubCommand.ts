import {
  APIChatInputApplicationCommandGuildInteraction,
  MessageFlags,
} from "discord-api-types/v10";
import { Response } from "express";

import { embeds } from "@efg/embeds";
import { efgApi } from "@efg/shared-utils";
import { ICurrency, ILanguage, IServer } from "@efg/types";

import { interactionReply } from "../../utils/interactions/responding/interactionReply";

export const removeChannelSubCommand = async (
  {
    i,
    server,
    language,
    currency,
  }: {
    i: APIChatInputApplicationCommandGuildInteraction;
    server?: IServer;
    language: ILanguage;
    currency: ICurrency;
  },
  res: Response
) => {
  if (!server?.channelId)
    return interactionReply(
      {
        embeds: [
          embeds.successes.currentSettings(language),
          embeds.commands.settings(server, language, currency),
        ],
        flags: MessageFlags.Ephemeral,
      },
      res
    );

  const { error, data: updatedServer } = await efgApi<IServer>({
    method: "DELETE",
    path: `/servers/${server.id}/channel`,
  });

  if (error) {
    console.error(
      `Failed to remove channel - Cause: Failed to update server in efgApi - Cause: ${error}`
    );

    return interactionReply({ embeds: [embeds.errors.genericError()] }, res);
  }

  interactionReply(
    {
      embeds: [
        embeds.successes.updatedSettings(language),
        embeds.commands.settings(updatedServer, language, currency),
      ],
      flags: MessageFlags.Ephemeral,
    },
    res
  );
};

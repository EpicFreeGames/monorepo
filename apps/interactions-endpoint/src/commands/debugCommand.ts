import { MessageFlags } from "discord-api-types/v10";

import { embeds } from "@efg/embeds";

import { interactionReply } from "../utils/interactions/responding/interactionReply";
import { SlashCommand } from "../utils/interactions/types";

export const debugCommand: SlashCommand = {
  needsGuild: true,
  needsManageGuild: false,
  execute: async ({ i, server, language, currency }, res) =>
    interactionReply(
      { embeds: [embeds.commands.debug(i.guild_id)], flags: MessageFlags.Ephemeral },
      res
    ),
};

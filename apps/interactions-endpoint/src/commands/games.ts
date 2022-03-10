import { CommandTypes, db, embeds, SlashCommand, SubCommandHandler } from "shared";

export const command: SlashCommand = {
  type: CommandTypes.ADMIN,
  execute: async (i, guild, language, currency) => {
    const subCommand = i.getSubCommand(true);

    if (subCommand?.name === "get") return getCommand(i, guild, language, currency);
    if (subCommand?.name === "confirm") return confirmCommand(i, guild, language, currency);
    if (subCommand?.name === "confirm-all") return confirmAllCommand(i, guild, language, currency);
    if (subCommand?.name === "unconfirm") return unconfirmHandler(i, guild, language, currency);
  },
};

const getCommand: SubCommandHandler = async (i, guild, language, currency) => {
  const games = await db.games.get.all();

  if (!games.length) return i.reply({ embeds: [embeds.generic("No games", "No games found")] });

  const gameEmbeds = embeds.games.games(games, language, currency, true);

  return i.reply({ embeds: gameEmbeds, ephemeral: true });
};

const confirmCommand: SubCommandHandler = async (i, guild, language, currency) => {
  const idString = i.options.getString("ids", true);
  const idArray = idString.split(", ");

  await db.games.confirm(idArray);

  return i.reply({ content: "✅", ephemeral: true });
};

const confirmAllCommand: SubCommandHandler = async (i, guild, language, currency) => {
  const games = await db.games.get.all();

  if (!games.length)
    return i.reply({
      embeds: [embeds.generic("No games", "No games found", "DARK_RED")],
      ephemeral: true,
    });

  await db.games.confirm(games.map((g) => g._id!));

  return i.reply({ content: "✅", ephemeral: true });
};

const unconfirmHandler: SubCommandHandler = async (i, guild, language, currency) => {
  const idString = i.options.getString("ids", true);
  const idArray = idString.split(", ");

  await db.games.unconfirm(idArray);

  return i.reply({ content: "✅", ephemeral: true });
};

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const config = require("dotenv").config();

const DISCORD_BOT_KEY = process.env.DISCORD_BOT_KEY;
const APP_ID = process.env.APP_ID;
const GUILD_ID = process.env.GUILD_ID;

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "praise",
    description: "Praise someone!",
    options: [
      {
        name: "user",
        description: "The user to praise",
        type: 6,
        required: true,
      },
      {
        name: "reason",
        description: "The reason of praise",
        type: 3,
        required: true,
      },
      {
        name: "user2",
        description: "The user to praise (optional)",
        type: 6,
      },
      {
        name: "user3",
        description: "The user to praise (optional)",
        type: 6,
      },
      {
        name: "user4",
        description: "The user to praise (optional)",
        type: 6,
      },
      {
        name: "user5",
        description: "The user to praise (optional)",
        type: 6,
      },
    ],
  },
];

const rest = new REST({ version: "9" }).setToken(DISCORD_BOT_KEY);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

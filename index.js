const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { registerPraise } = require('./modules/api');

const config = require("dotenv").config()

const DISCORD_BOT_KEY = process.env.DISCORD_BOT_KEY

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (interaction.commandName === 'praise') {
    console.log(interaction.options);
    const user = interaction.options.data[0].user
    registerPraise(user)
    const reply = `Users praised!`;
		const message = await interaction.reply({ content: reply, fetchReply: true });
		message.react('😄');
  }
});

client.login(DISCORD_BOT_KEY);

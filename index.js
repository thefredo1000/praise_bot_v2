const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { registerPraise } = require("./modules/api");

const config = require("dotenv").config();

const DISCORD_BOT_KEY = process.env.DISCORD_BOT_KEY;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "praise") {
    console.log(interaction);
    const user = interaction.options.data[0].user;
    if (registerPraise(user) == 200) {
      console.log(interaction);
      const embedDatos = new MessageEmbed()
        .setTitle(`👏 You’ve been Praised by ${interaction.user.username}! 👏`)
        .setColor(0xc6eb34)
        .setDescription(
          `[__**View your praise on TEC Discord**__](https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id})\n\nYour contribution to the Token Engineering community has been recognized in our Discord Server and it would be rewarded with $TEC tokens following the TEC Commons Upgrade. You can learn more about our reward system in this Forum post. 😊\n\nIf you are a member of the Commons Stack Trusted Seed, you may also receive an increase in your $CSTK score. Find out more about that in this article.\n\nThank you for supporting the Token Engineering Commons!`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/839255698092851222/922595373778890762/footer.png"
        )
        .setThumbnail(user.avatarURL())
        .setTimestamp();

      user.send({ embeds: [embedDatos] });

      const reply = `Users praised!`;
      const message = await interaction.reply({
        content: reply,
        fetchReply: true,
      });
      message.react("✅");
    } else {
      const reply = `Praise failed!`;
      const message = await interaction.reply({
        content: reply,
        fetchReply: true,
      });
      message.react("❎");
    }
  }
});

client.login(DISCORD_BOT_KEY);

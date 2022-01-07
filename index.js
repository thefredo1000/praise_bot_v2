const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { registerPraise } = require("./modules/api");

const config = require("dotenv").config();

const DISCORD_BOT_KEY = process.env.DISCORD_BOT_KEY;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Generate the embed for the praise message sent to the praised
function generateEmbed(interaction) {
  const embed = new MessageEmbed()
    .setTitle(`👏 You’ve been Praised by ${interaction.user.username}! 👏`)
    .setColor(0xc6eb34)
    .setDescription(
      `[__**View your praise on TEC Discord**__](https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.id})\n\nYour contribution to the Token Engineering community has been recognized in our Discord Server and it would be rewarded with $TEC tokens following the TEC Commons Upgrade. You can learn more about our reward system in this Forum post. 😊\n\nIf you are a member of the Commons Stack Trusted Seed, you may also receive an increase in your $CSTK score. Find out more about that in this article.\n\nThank you for supporting the Token Engineering Commons!`
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/839255698092851222/922595373778890762/footer.png"
    )
    .setThumbnail(interaction.user.avatarURL())
    .setTimestamp();

  return embed;
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  // Get the parameters from the command
  const params = interaction.options.data;

  if (interaction.commandName === "praise") {
    // Get the users to praise
    const users = params.filter((param) => {
      return param.name !== "reason";
    });

    // Get the reason for the praise
    const reason = params.find((param) => {
      return param.name === "reason";
    });

    // Send the praise to the API and get the response
    // TODO: Handle errors
    if (registerPraise(users, reason) == 200) {
      // Generate the embed for the DM to the praised user
      const embed = generateEmbed(interaction);

      // Send the embed to the users
      users.forEach((param) => {
        param.user.send({ embeds: [embed] });
      });

      // Generate a success message for the praise giver
      const reply = `<@${interaction.user.id}> praised <@${users
        .map((param) => {
          return param.user.id;
        })
        .join(">, <@")
        .replace(/,(?!.*,)/gim, " and")}> for ${reason.value}!`;

      // Reply to the command with the success message
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

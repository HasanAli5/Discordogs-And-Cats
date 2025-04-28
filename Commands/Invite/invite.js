const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');

module.exports = 
{
    data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite Command Use It To Get The **Link** To The Bot Invite'),
    async execute(interaction) {
        const invitebed = new EmbedBuilder()
        .setColor('#ffff00')
        .setTitle('Invite Discordogs + Cats Bot')
        .setURL('https://discord.com/oauth2/authorize?client_id=828696711534477312');
        await interaction.reply({embeds: [invitebed]});
    },

}
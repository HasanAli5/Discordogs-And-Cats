const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('To Satisfy Your **Cat** Image Needs!'),
    async execute(interaction)
    {
        var popper = await fetch(`https://cataas.com/cat?json=true`)
        .then(response => response.json());

        const catpic = popper['url'];

        const catembed = new EmbedBuilder()
            .setColor('#FFC0CB')
            .setTitle(`Random Cat`)
            .setURL(catpic)
            .setImage(catpic)
            .setFooter({text:'Cat Command  •  This Bot Uses https://cataas.com/'})
            .setTimestamp();
            
        await interaction.reply({embeds: [catembed]});
    },
};
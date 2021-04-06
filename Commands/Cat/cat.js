const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports =
{
    name:'cat',
    usage:"\u200b",
    description:'To Satisfy Your **Cat** Image Needs!',
    async execute(message,args)
    {
        var popper = await fetch(`https://cataas.com/cat?json=true`)
        .then(response => response.json());

        const catpic = ('https://cataas.com'+popper['url']);

        const catembed = new Discord.MessageEmbed()
            .setColor('#FFC0CB')
            .setTitle(`Random Cat`)
            .setURL(catpic)
            .setImage(catpic)
            .setFooter('Cat Command  •  This Bot Uses https://cataas.com/')
            .setTimestamp();
            
        message.channel.send({embed: catembed});


        
    },
};
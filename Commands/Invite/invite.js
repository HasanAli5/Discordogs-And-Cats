const Discord = require('discord.js')
module.exports = 
{
    name:'invite',
    description:'Invite Command Use It To Get The **Link** To The Bot Invite',
    usage:'\u200b',
    execute(message, args) {
        const invitebed = new Discord.MessageEmbed()
        .setColor('#ffff00')
        .setTitle('Invite Discordogs + Cats Bot')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=828696711534477312&permissions=8&scope=bot');
        message.channel.send({embed: invitebed});
    },

}
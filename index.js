const fs = require('fs');
const Discord = require('discord.js');
const {token,prefix} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandfolders = fs.readdirSync('./commands');

for (const folder of commandfolders) {
	const commandfiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandfiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready',() =>{
    console.log('Logged In As',client.user.username);
    client.user.setActivity('Nintendo™ Presents Nintendogs + Cats™ | +help',{type:'PLAYING'});
});

client.on('message',message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(new Discord.MessageEmbed().setColor('#ff0000').setTitle('There was an error trying to execute that command!').setFooter('Error!').setTimestamp());
    }
    
});

client.login(token);
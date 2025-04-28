const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('To Satisfy Your **Dog** Image Needs!')
    .addStringOption(option =>
        option
            .setName('breed')
            .setDescription('Breed of Dog')
            .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName('sub-breed')
        .setDescription('Sub-breed of Dog')
    ),
    async execute(interaction,args)
    {
        var error = false
        const breed = interaction.options.getString('breed') ?? undefined;
        const sub_breed = interaction.options.getString('sub-breed') ?? undefined;
        if (sub_breed == undefined){
            var dogger = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(response => response.json());
        }else{
            var dogger = await fetch(`https://dog.ceo/api/breed/${breed}/${sub_breed}/images/random`)
            .then(response => response.json());
        }

        const dogpic = dogger['message'];
        const code = dogger['code'];

        if (code==404){
            error = true;
        }

        if (error === false){
            const dogembed = new EmbedBuilder()
                .setColor('#FFC0CB')
                .setTitle(`${sub_breed!=undefined?`${sub_breed} `:"\u200B"}${breed} dog`)
                .setURL(dogpic)
                .setFooter({text:'Dog Command  •  This Bot Uses https://dog.ceo/api/'})
                .setImage(dogpic)
                .setTimestamp();

            await interaction.reply({embeds: [dogembed]});
        }
        else if (error === true){
            const list = await fetch('https://dog.ceo/api/breeds/list/all')
            .then(response=>response.json());
            var records = []
            
            for(let i = 0; i < Object.keys(list.message).length; i++){
                var namefield = Object.keys(list.message)[i];
                var values = Object.values(list.message[namefield]);
                records.push(
                    `**${namefield}** ${values.length>0 ? " : ```"+values.join("\n")+"```" : "\u200B"}`
                )
            }

            var fields = []

            var tally = 0;
            var carryon = "";
            for(let i = 0; i < records.length;i++){
                if(tally+records[i].length>=512){
                    
                    fields.push({
                        name : "\u200B",
                        value : carryon,
                        inline : true
                    })

                    carryon = "";
                    tally = 0;
                }
                carryon += records[i] + "\n"
                tally += records[i].length
            }
            fields.push({
                name : "\u200B",
                value : carryon,
                inline : true
            })

            const errorbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('You may need to refer to the list below for dog breeds')
                .setURL('https://dog.ceo/dog-api/breeds-list')
                .setFooter({text:'Error!  •  This Bot Uses https://dog.ceo/api/'})
                .addFields(fields)
                .setTimestamp();
            await interaction.reply({embeds: [errorbed]});
        }

        
    },
};
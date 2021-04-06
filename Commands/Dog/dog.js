const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs')
module.exports =
{
    name:'dog',
    usage:'{sub-breed} {breed} || {breed}',
    description:'To Satisfy Your **Dog** Image Needs!',
    async execute(message,args)
    {
        var error = false
        if (args[1] == undefined){
            var dogger = await fetch(`https://dog.ceo/api/breed/${args[0]}/images/random`)
            .then(response => response.json());
        }else{
            var dogger = await fetch(`https://dog.ceo/api/breed/${args[1]}/${args[0]}/images/random`)
            .then(response => response.json());
        }

        const dogpic = dogger['message'];
        if (dogpic.startsWith('http')){
            error = false;
        }else{
            error=true;
        }

        if (error === false){
            const dogembed = new Discord.MessageEmbed()
                .setColor('#FFC0CB')
                .setTitle(`${args[0].replace(/^\w/, (c) => c.toUpperCase())} Dog`)
                .setURL(dogpic)
                .setFooter('Dog Command  •  This Bot Uses https://dog.ceo/api/')
                .setImage(dogpic)
                .setTimestamp();

            message.channel.send({embed: dogembed});
        }
        else if (error === true){
            const errorbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setAuthor(dogpic)
                .setTitle('You may need to refer to the list below for dog breeds')
                .setURL('https://dog.ceo/dog-api/breeds-list')
                .setFooter('Error!  •  This Bot Uses https://dog.ceo/api/')
                .addFields(
                    {name:'Breeds :',value:`**
                    \`Affenpinscher, African, Airedale\` 
                    \`Akita, Appenzeller, Australian\` 
                    \`Basenji, Beagle, Bluetick\` 
                    \`Borzoi, Bouvier, Boxer\` 
                    \`Brabancon, Briard, Buhund\` 
                    \`Bulldog, Bullterrier, Cairn\` 
                    \`Cattledog, Chihuahua, Chow\` 
                    \`Clumber, Cockapoo, Collie\` 
                    \`Coonhound, Corgi, Cotondetulear\` 
                    \`Dachshund, Dalmatian, Dane,\` 
                    \`Deerhound, Dhole, Dingo,\` 
                    \`Doberman, Elkhound, Entlebucher\` 
                    \`Eskimo, Finnish, Frise,\` 
                    \`Germanshepherd, Greyhound, Groenendael\` 
                    \`Havanese, Hound,\` 
                    \`Husky, Keeshond, Kelpie\` 
                    \`Komondor, Kuvasz, Labradoodle\`
                    **`},
                    {name:'\u200b',value:`**
                    \`Labrador, Leonberg, Lhasa\` 
                    \`Malamute, Malinois, Maltese\` 
                    \`Mastiff, Mexicanhairless, Mix\` 
                    \`Mountain, Newfoundland, Otterhound\` 
                    \`Ovcharka, Papillon, Pekinese\` 
                    \`Pembroke, Pinscher, Pitbull\` 
                    \`Pointer, Pomeranian, Poodle\` 
                    \`Pug, Puggle, Pyrenees\` 
                    \`Redbone, Retriever, Ridgeback\` 
                    \`Rottweiler, Saluki, Samoyed\` 
                    \`Schipperke, Schnauzer, Setter\` 
                    \`Sheepdog, Shiba, Shihtzu\` 
                    \`Spaniel, Springer, Stbernard\` 
                    \`Terrier, Vizsla, Waterdog\` 
                    \`Weimaraner, Whippet, Wolfhound\`
                    **`},
                    {name:'Sub-Breed :',value:`
                    **Australian**   \`Shepherd\`
                    **Buhund**   \`Norwegian\`
                    **Bulldog**   \`Boston, English, French\`
                    **Bullterrier**   \`Staffordshire\`
                    **Cattledog**   \`Australian\`
                    **Collie**   \`Border\`
                    **Corgi**   \`Cardigan\`
                    **Dane**   \`Great\`
                    **Deerhound**   \`Scottish\`
                    **Elkhound**   \`Norwegian\`
                    **Finnish**   \`Lapphund\`
                    **Frise**   \`Bichon\`
                    **Greyhound**   \`Italian\`
                    **Hound**   \`Afghan, Basset, Blood, English\`
                    **Mastiff**   \`Bull, English, Tibetan\`
                    `},
                    {name:'\u200b',value:`
                    **Mountain**   \`Bernese, Swiss\`
                    **Ovcharka**   \`Caucasian\`
                    **Pinscher**   \`Minature\`
                    **Pointer**   \`German, Germanlonghair\`
                    **Poodle**   \`Minature, Standard, Toy\`
                    **Retriever**   \`Chesapeake, Curly, Flatcoated, Golden\`
                    **Ridgeback**   \`Rhodesian\`
                    **Schnauzer**   \`Giant, Minature\`
                    **Setter**   \`English, Gordon, Irish\`
                    **Sheepdog**   \`English, Shetland\`
                    **Spaniel**   \`Blenheim, Brittany, Cocker, Irish, Japanese, Sussex, Welsh\`
                    **Springer**   \`English\`
                    **Terrier**   \`American, Australian, Bedlington, Border, Dandie, Fox, Irish, Kerryblue, Lakeland, Norfolk, Norwich, Patterdale, Russell, Scottish, Sealyham, Silky, Tibetan, Toy, Westhighland, Wheaten, Yorkshire\`
                    **Waterdog**   \`Spanish\`
                    **Wolfhound**   \`Irish\``}
                )
                .setTimestamp();
            message.channel.send({embed: errorbed});
        }

        
    },
};
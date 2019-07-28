const Discord = require("discord.js");
const animals = require('random-animals-api'); 

exports.run = (client, message, args, db) => {  
    if(message.guild.id === client.config.eventserver) message.delete()
    animals.panda().then(url => {
    const embed = new Discord.RichEmbed()
    .setDescription("Here's your panda picture!")
    .setColor(16711680)
    .setImage(url)
    .setTimestamp();
    message.channel.send(embed)
    })
}

exports.help = {
  name: 'Panda',
  description: 'Gives a cute panda picture - Command for Emmanuel#8999',
  usage: 'b@panda',
  category: 'Custom Commands',
  accessableby: 'Anyone',
  aliases: []
};
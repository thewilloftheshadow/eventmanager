const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { readdirSync } = require('fs');
exports.run = (client, message, args, db) => {  
  const embed = new RichEmbed()
    .setColor()
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
    .setThumbnail(client.user.displayAvatarURL);

  if (!args[0]) {
    const categories = readdirSync('./commands/');

    embed.setDescription(`These are the avaliable commands for ${client.user.tag}\nThe bot prefix is: **${client.config.prefix}**`);
    embed.setFooter(`${client.user.username} | Total Commands: ${client.commands.size}`, client.user.displayAvatarURL);

    categories.forEach(category => {
      const dir = client.commands.filter(c => c.help.category === category);
      try {
        embed.addField(`❯ ${category} [${dir.size}]:`, dir.map(c => `\`${c.help.name}\``).join(' '));
      } catch(e) {
        console.log(e);
      }
    });

    return message.channel.send(embed);
  } else {
    let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
    if(!command) return message.channel.send(embed.setTitle('Invalid Command.').setDescription(`Do \`${client.prefix}help\` for a list of the commands.`));
    command = command.help;
    embed.setDescription(stripIndents`The bot prefix is: \`${client.config.prefix}\`\n
    ❯ Command: ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
    ❯ Description: ${command.description || '  '}
    ❯ Usage: ${command.usage || 'Error: No Usage Provided'}
    ❯ Accessable by: ${command.accessableby || 'Everyone'}
    ❯ Aliases: ${command.aliases ? command.aliases.join(', ') : 'None'}`);

    return message.channel.send(embed);
  }
};

module.exports.help = {
  name: 'help',
  description: 'Displays all commands that the bot has or information on a command',
  usage: 'b@help',
  category: 'Public Commands',
  accessableby: 'Everyone',
  aliases: ['h', 'commands']
};
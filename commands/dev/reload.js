const { readdirSync } = require('fs'); 
const { join } = require('path');

exports.run = (client, message, args, db) => {  

  if(!client.owners.includes(message.author.id)) return

  if(!args[0]) return message.channel.send('Please provide a command to reload!');
  const commandName = args[0].toLowerCase();
  if(!client.commands.get(commandName)) return message.channel.send('That command doesn\'t exist. Try again.');
  readdirSync(join(__dirname, '..')).forEach(f => {
    const files = readdirSync(join(__dirname,'..',f));
    if(files.includes(commandName + '.js')) {
      try {
        delete require.cache[require.resolve(`../${f}/${commandName}.js`)]; // usage !reload <name>
        client.commands.delete(commandName);
        const pull = require(`../${f}/${commandName}.js`);
        client.commands.set(commandName, pull);
        return message.channel.send(`Successfully reloaded ${commandName}.js!`);
      } catch(e) {
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``);
      }
    }
  });
};

module.exports.help = {
  name: 'reload',
  description: 'Reloads a command',
  usage: 'b@reload <command>',
  category: 'nohelp',
  accessableby: 'Server Owners',
  aliases: []
};
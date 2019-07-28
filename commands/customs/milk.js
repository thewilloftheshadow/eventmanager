exports.run = (client, message, args, db) => {  
    if (message.author.id === "234430971565309962" || client.config.owners.indexOf(message.author.id) > -1) {
      let victim = message.mentions.members.first() || message.guild.members.get(args[0]);
      if (!victim) {
        message.channel.send(`I can\'t find that user!`);
        return;
      } else {  
        if(victim.id === client.user.id){
          message.channel.send(`UwU Jon-senpai! Don't do that! OwO`)
        } else {
          message.channel.send(`Jon has milked ${victim}! 🐮`);
        }
        message.delete();
      }
    } else {
      message.reply(`You're not Jon, you can't use this command!`);
      message.delete()
    }
}

exports.help = {
  name: 'milk',
  description: 'Milks you',
  usage: 'b@milk <user>',
  category: 'customs',
  accessableby: 'Jonteiro#6969 and Server Owners',
  aliases: []
};
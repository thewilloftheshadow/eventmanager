const talkedRecently = new Set();
const Discord = require("discord.js");

exports.run = (client, message, args, db) => {  
    if(message.mentions.members.first()){
    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!user)
      return message.reply("You must mention a user or provide their id!\nIf you did, please make sure that the user is still in this server.")
    message.delete().catch(O_o=>{});
    let reason = args.slice(1).join(' ');
    message.delete().catch(O_o=>{});
    let report = new Discord.RichEmbed()
      .setDescription(`New report from ${message.author} in ${message.channel}`)
      .setColor("#D49DA9")
      .addField("Reported User:", user.user)
      .addField("Reported User's ID:", user.user.id)
      .addField("Reason", reason)
      .setTimestamp();
    if(client.config.reportping) client.channels.get("603252475545518112").send("<@&602912825697894411>")
    client.channels.get("603252475545518112").send(report)
    message.channel.send("✅ Report recieved");
  } else {
    message.delete().catch(O_o=>{});
    let reason = args.join(' ');
    let report = new Discord.RichEmbed()
      .setDescription(`New report from ${message.author} in ${message.channel}`)
      .setColor("#D49DA9")
      .addField("Report:", reason)
      .setTimestamp();
    if(client.config.reportping) client.channels.get("603252475545518112").send("<@&534043596391972864>")
    client.channels.get("603252475545518112").send(report)
    message.channel.send("✅ Report recieved");
  }
  
  }

exports.help = {
  name: 'report',
  description: 'Report a user for breaking rules OR report a bug in the event/bot',
  usage: 'b@report <user> <reason> OR b@report <bug>',
  category: 'publiccmd',
  accessableby: 'everyone',
  aliases: ['reportbug', 'reportuser']
};
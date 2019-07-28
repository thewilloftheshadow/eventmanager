exports.run = (client, message, args, db) => { 
  message.delete().catch(O_o=>{});
    message.channel.send("To join this event, ***DM*** me the command `b@joinevent`.\nYou will be sent an invite to the server if it has not filled up yet");
}

exports.help = {
  name: 'howtojoin',
  description: 'Prints out instructions on how to join the server',
  usage: 'b@howtojoin',
  category: 'copypasta',
  accessableby: 'Anyone',
  aliases: []
};
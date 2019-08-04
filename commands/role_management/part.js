exports.run = (client, message, args, db) => {  
    if(!message.member.roles.some(r=>["Event Owners", "Event Admins", "Event Team"].includes(r.name)) )
      return
    let participant = message.guild.roles.find(role => role.name === "Participant");
    let spectator = message.guild.roles.find(role => role.name === "Spectator");
    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!user)
      return message.reply("You must mention a user or provide their id!")
    message.channel.send(user.user.tag + " has been made a Participant");
    user.addRole(participant).catch(console.error);
    user.removeRole(spectator).catch(console.error);
}

exports.help = {
  name: 'part',
  description: 'Resets a player to Participant',
  usage: 'b@part <user>',
  category: 'role_management',
  accessableby: 'Event Admins',
  aliases: ['participant']
};
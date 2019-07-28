exports.run = (client, message, args, db) => {  
    let left = message.guild.members.filter(member => member.roles.find(r => r.name === "Spectator")).size
    let outside = message.guild.members.filter(member => member.roles.find(r => r.name === "Outside Spectator")).size
    let spectate = left + outside
    message.channel.send("**" + spectate + "** players spectating...\n**" + left + "** are people who have died in the event.\n**" + outside + "** are people who are watching the event from the outside.")
}

exports.help = {
  name: 'Spec',
  description: 'Gets a count of the number of Spectators',
  usage: 'b@spec',
  category: 'Public Commands',
  accessableby: 'Everyone',
  aliases: ['spectators', 'spectator']
};
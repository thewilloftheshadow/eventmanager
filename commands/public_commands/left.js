exports.run = (client, message, args, db) => {  
    let left = message.guild.members.filter(member => member.roles.find(r => r.name === "Participant")).size  
    message.channel.send(`**${left}** players remaining...`)
  
}

exports.help = {
  name: 'left',
  description: 'Gets a count of the remaining number of Participants',
  usage: 'b@left',
  category: 'public_commands',
  accessableby: 'Everyone',
  aliases: ['remaining']
};
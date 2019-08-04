exports.run = (client, message, args, db) => {  
    let left = message.guild.members.filter(member => member.roles.find(r => r.name === "Participant")).size
    let god = message.guild.members.filter(member => member.roles.find(r => r.name === "God")).size
    let devil = message.guild.members.filter(member => member.roles.find(r => r.name === "Participant")).size
    let angel = message.guild.members.filter(member => member.roles.find(r => r.name === "Participant")).size
    let ghost = message.guild.members.filter(member => member.roles.find(r => r.name === "Participant")).size
    let godarmy = message.guild.members.filter(member => member.roles.find(r => r.name === "Participant")).size
    let devilarmy = message.guild.members.filter(member => member.roles.find(r => r.name === "Participant")).size
    message.channel.send("**" + left + "** players remaining...")
  
}

exports.help = {
  name: 'left',
  description: 'Gets a count of the remaining number of Participants',
  usage: 'b@left',
  category: 'public_commands',
  accessableby: 'Everyone',
  aliases: ['remaining']
};
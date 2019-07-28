exports.run = (client, message, args, db) => {  
  if(!message.member.roles.some(r=>["Event Owners"].includes(r.name)) && !client.config.owners.indexOf(message.author.id) > -1)
      return
    let roleName = message.content.split(" ").slice(1).join(" ");
    let pingrole = message.guild.roles.find(role => role.name === roleName);
    if(pingrole.mentionable) message.channel.send(`<@&${pingrole.id}>`)
    if(!pingrole.mentionable){
      pingrole.setMentionable(true)
      message.channel.send(`<@&${pingrole.id}>`)
      pingrole.setMentionable(false)
    }
    message.delete()
}

exports.help = {
  name: 'forceping',
  description: 'Force ping any unpingable role',
  usage: 'b@forceping <role name>',
  category: 'management',
  accessableby: 'Event Owners',
  aliases: []
};
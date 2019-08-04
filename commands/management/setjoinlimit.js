exports.run = (client, message, args, db) => {  
    if(!message.member.roles.some(r=>["Event Owners", "Top", "EM Admin"].includes(r.name)) && !client.config.owners.indexOf(message.author.id) > -1)
      return message.channel.send("Sorry! Only an Event Owner or Bot Admin can set the join limit!")
  db.fetch("added").then(added => {
  if(!args.length === 1){
    return message.channel.send("Join limit is currently " + added)
  } else { 
  let limit = parseInt(args[0], 10);
  db.set("limit", limit)
  message.channel.send("Joining limit has been set to " + args[0])
  }
  })

}

exports.help = {
  name: 'setjoinlimit',
  description: 'Use this command to set the number of people who can join the event server',
  usage: 'b@setjoinlimit <number>',
  category: 'management',
  accessableby: 'Event Owners',
  aliases: []
};
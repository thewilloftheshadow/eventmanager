exports.run = (client, message, args, db) => {  
    if(!message.member.roles.some(r=>["Event Owners", "Top", "EM Admin"].includes(r.name)) && !client.config.owners.indexOf(message.author.id) > -1)
      return message.channel.send("Sorry! Only an Event Owner or Bot Admin use this command")
  if(args[0] === "clear"){
    db.set("added", [])
    message.channel.send("Cleared the **added** list")
  } else {
    db.fetch("added").then(added => {
      message.channel.send(added, { SPLIT : true})
    })
  }

}

exports.help = {
  name: 'joinadded',
  description: 'Use this command to see the users added or to clear the list',
  usage: 'b@setjoinlimit <number>',
  category: 'management',
  accessableby: 'Event Owners',
  aliases: []
};
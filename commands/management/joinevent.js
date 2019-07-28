exports.run = (client, message, args, db) => {  
    console.log(message.author.username + " attempted to join the event")
    let full = false
    let closed = false
    if(!message.guild === null) return
    var options = {
      maxAge: 3600,
      maxUses: 1,
      unique: true
    };
    let event = client.guilds.get(client.config.eventserver)
    db.fetch("added").then(added => {
      db.fetch("limit").then(limit => {
        if(limit === added.length){ 
          full = true
          client.channels.get("602909161965223939").send("The invite limit was reached, but " + message.author + " tried to join.")
        }
        if(limit === 99999){
          closed = true
          return message.author.send("Sorry. The event server is currently closed.")
        }
        if(event.member(message.author.id)) return message.author.send("You're already in the event server!\nIf you are trying to participate, please leave the server first, then use the command again. If you have any problems, DM <@" + client.config.ownerID + ">")
        if(!full && !closed){
          if(added.includes(message.author.id)) return message.author.send("You've already joined the event!")
          let invite = client.channels.get(client.config.rules).createInvite(options).then(function(newInvite){
            message.author.send("https://discord.gg/" + newInvite.code)
          });
           db.push("added", message.author.id)
        }
      })
    })
}

exports.help = {
  name: 'Join Event',
  description: 'Use this command to join the event server',
  usage: 'b@joinevent',
  category: 'Server/Bot Management',
  accessableby: 'Anyone, but only at certain times',
  aliases: []
};
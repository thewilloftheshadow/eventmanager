exports.run = (client, message, args, db) => {  
if(!message.member.roles.some(r=>["Event Owners", "Top"].includes(r.name)) && !client.config.owners.indexOf(message.author.id) > -1)
      return
    message.reply("⚠ You are about to kick everyone with the Outside Spectator roles, but not those with the DontKick role.\nAre you sure you want to do this?")
    message.react('✅').then(() => message.react('❌'));
    const filter = (reaction, user) => {
      return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '✅') {
            message.channel.send('Kicking in progress...');
            message.channel.guild.members.forEach(member => {
              if(member.roles.some(r=>["Outside Spectator"].includes(r.name)) && !member.roles.some(r=>["DontKick"].includes(r.name)) )
                member.send("Thanks for watching the event! You have been removed from the server, as everyone is kicked at the end. Thanks again :smiley:").then(
                member.kick().then((member) => {
                  message.channel.send("✅ " + member.displayName + " has been successfully kicked");
                }).catch(() => {
             // Failmessage
                message.channel.send("❌ " + member.displayName + " could not be kicked");
                }))
            })
        }
        else {
            return message.channel.send("Canceled")
        }
    })
    .catch(collected => {
        return message.channel.send("Canceled either due to time out or error in code")
    });
}

exports.help = {
  name: 'kickoutsidespectators',
  description: 'Kick all outside spectators at the end of an event',
  usage: 'b@kickallusersendofevent',
  category: 'management',
  accessableby: 'Event Owners',
  aliases: []
};
exports.run = (client, message, args, db) => {  
if(!message.member.roles.some(r=>["Event Owners", "Top"].includes(r.name)) && !client.config.owners.indexOf(message.author.id) > -1)
      return
  let split1 = []
  message.channel.guild.members.forEach(member => {
    if(member.roles.some(r=>["Participant"].includes(r.name)))
      split1.push(member.id)
  })
  let split2 = split1.splice(0, Math.ceil(split1.length / 2));
  let split1string = `"` + split1.join(`", "`) + `"`
  let split2string = `"` + split2.join(`", "`) + `"`
  message.channel.send("First group of users:\n```\n" + split1string + "\n```")
  message.channel.send("Second group of users:\n```\n" + split2string + "\n```")
}

exports.help = {
  name: 'splitpart',
  description: 'Split participants into two groups',
  usage: 'b@splitpart',
  category: 'management',
  accessableby: 'Event Owners',
  aliases: []
};
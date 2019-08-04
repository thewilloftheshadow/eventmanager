exports.run = (client, message, args, db) => {
    let cgc = client.guilds.get(client.config.cgcserver);
    cgc.members.filter(m => !m.user.bot).forEach(async member => { 
      console.log(typeof m)
        if(member.roles.some(r=>["Verified"].includes(r.name))){
          const bb = await client.guilds.get(client.config.bbserver);
          const nickname = await bb.members.get(member.id).user.displayName
          message.channel.send(`Nickname: ${nickname} and Username: ${member.user.tag}`)
        }
    })
}

exports.help = {
  name: 'cgcverify',
  description: 'Checks the verified users of CGC and their verification status',
  usage: 'b@cgcverify',
  category: 'custom_commands',
  accessableby: 'CGC Admins Only',
  aliases: ['cgc']
};
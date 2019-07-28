exports.run = (client, message, args, db) => {  
  if(!message.member.roles.some(r=>["Top"].includes(r.name)) && !client.config.owners.indexOf(message.author.id) > -1) {
    message.channel.send({
      "embed": {
        "title": "`Event Rules`",
        "color": 7506394,
        "fields": [
          {
            "name": "E1: No bug abusing",
            "value": "Bug abuse is not tolerated in any capacity whatsoever. Anyone who is caught doing so will be removed from the current event and banned from all future events."
          },
          {
            "name": "E2: No trading with spectators or attacking while dead",
            "value": "Although we try our best, the event team is not perfect and sometimes there is a delay between a player's death and them being set to spectator. Anyone caught trading with a dead player or attacking while dead (unless stated that this is allowed in the event description) will be removed from the event and possibly banned from all future events."
          },
          {
            "name": "E3: Be active in events",
            "value": "Choosing to enter an event means you are taking up space other people would love to have and therefore must play in the event. Do not enter an event and then go inactive, or you will be restricted from future events."
          },
          {
            "name": "E4: Do not use the event bot in other servers during an event",
            "value": "We will be watching trades in all servers that have the event bot. This is considered cheating and will result in a ban."
          },
          {
            "name": "E5: No multiaccounting",
            "value": "Using multiple accounts to gain an upper benefit in an event will result in a permanent ban"
          },
          {
            "name": "E6: Obey staff",
            "value": "Staff have final say on all matters, don’t argue with them if they make a call on something. Don’t be ignorant to them either, or this may be grounds for automatic ban."
          },
          {
            "name": "E7: Do not spam the Ping role",
            "value": "Our staff would love to help you with any issues you encounter in out events, but give them some time to respond instead of pinging <@&602912825697894411> for help multiple times."
          },
          {
            "name": "E8: Main Server chat rules apply",
            "value": "Please follow all rules you would follow in the main server. Although this is an event server and not the main server, we strive to maintain the level of excellence we provide in the main server. Not following standard chat rules can result in a mute or ban."
          }
        ]
      }
    });
  }
}

exports.help = {
  name: 'rules',
  description: 'Lists the rules of the server',
  usage: 'b@rules',
  category: 'copypasta',
  accessableby: 'Server Owners Only',
  aliases: []
};
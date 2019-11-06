const listusers = false
const reportping = false
let autoprint = true

// simple web server to keep the bot online
const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs')
app.use(express.static('public'));
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendFile(__dirname + '/index.html');
});
app.get("/giveaways", (request, response) => {
fs.readFile(__dirname + '/node_modules/discord-giveaways/giveaways.json', 'utf8', (err, fileContents) => {
  if (err) {
    console.error(err)
    return
  }
  try {
    const data = JSON.parse(fileContents)
    return response.send(data)
  } catch(err) {
    console.error(err)
  }
  response.send(404)
})
})

var listener = app.listen(process.env.PORT, function() {
 console.log('Your app is listening on port ' + listener.address().port);
});

//let listener = app.listen(process.env.PORT, function() {
// console.log('Your app is listening on port ' + listener.address().port);
//});
//end server code

const { Client, Collection } = require('discord.js');
const Discord = require('discord.js')
const client = new Client();
const config = require("./config.json");


const talkedRecently = new Set();

const Enmap = require("enmap");
const { readdirSync } = require('fs');
const util = require('util')

const db = require('quick.db')
const animals = require('random-animals-api'); 
const Sentencer = require('sentencer');
const PI = require("pi");
const ms = require("ms");
const giveaways = require("discord-giveaways")

=======
db.createWebview('eventsarelit', process.env.PORT);
let PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI(process.env.PASTEBINKEY);

let giveawaymessages = {
        giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
        giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
        timeRemaining: "Time remaining: **{duration}**!",
        inviteToParticipate: "React with 🐲 to participate!",
        winMessage: "Congratulations, {winners}! You won **{prize}**!",
        embedFooter: "Giveaways",
        noWinner: "Giveaway cancelled, no valid participations.",
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days"
        }
}

let leveltext = ["n00b", "Event Participant", "Event Team", "Event Admin", "Bot Admin", "Bot Owner"]

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser". 
  client.user.setActivity('events run smoothly', { type: 'WATCHING' });
  // List servers the bot is connected to
  console.log("Servers:")
  client.guilds.forEach((guild) => {
    console.log(" - " + guild.name)
  })
  giveaways.launch(client, {
        updateCountdownEvery: 5000,
        botsCanWin: false,
        embedColor: "#FEB3BE",
        reaction: "🐲"
    });
});

client.on('guildMemberAdd', member => {
  if(member.guild.id === config.eventserver){
    let participant = client.guilds.get(config.eventserver).roles.find(role => role.name === "Participant");
    member.addRole(participant)
  }
});

client.on("guildMemberRemove", (member) => {
  if(member.guild.id === config.eventserver) client.channels.get("553767914575102019").send(member.username + " has left the server")
});

client.config = config;

client.on("emojiCreate", (emoji) => {
  if(emoji.guild.id === client.config.eventserver)
    client.channels.get("603260651518951424").send("```<:" + emoji.name + ":" + emoji.id + ">```")
});



client.on("message", async message => {
  if(!message.guild === null){
    if(message.guild.id === config.eventserver) console.log(message.author.tag + " sent this: (" + message.content + ") in " + message.guild + "'s channel #" + message.channel.name + "(" + message.channel.id + ")").catch(console.error);
  }
  
  if(message.channel.id === "540388439908941846"){
    let kfmsg = message.content
    console.log(kfmsg)
    let splited = kfmsg.split("**")
    console.log(splited)
    let killname = splited[3]
    console.log(killname)
    let dead = message.guild.users.find(user => user.username == killname);
    console.log(dead)
    client.channels.get("540393149135192064").send(`${dead.username} has just died. Can I get a RIP in the chat?`)
  }
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  let eventteam = client.guilds.get(config.bbserver).roles.get("435139724919963653");
  let bbuser = client.guilds.get(config.bbserver).members.get(message.author.id)

  if(message.author.id === config.ownerID){
    message.author.level = 5
  } else if(client.config.owners.indexOf(message.author.id) > -1){
    message.author.level = 4
  } else if (client.config.admins.indexOf(message.author.id) > -1){
    message.author.level = 3
  } else if(bbuser){
    if(client.guilds.get(config.bbserver).members.get(message.author.id).roles.has(eventteam.id)){
      message.author.level = 2
    }
  } else if(message.member.roles.some(r=>["Participant", "Spectator", "Outside Spectator"].includes(r.name))){
    message.author.level = 1
  } else message.author.level = 0
  
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if (message.content.indexOf(config.prefix) !== 0){
    if(message.content.indexOf(config.prefix2) !== 0)
      return
  };
  
  
  
  

  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message ",say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "tier"){
    let tier = message.author.level
    message.channel.send(`You have authorization level ${tier}: ${leveltext[tier]}`)
  }
  
  
  if(command === "args"){
    let output = args.toString()
    message.channel.send(`[${output}]`)
  }
  
  if(command === "say") {
    message.delete().catch(O_o=>{});
    const sayMessage = args.join(" ");
    if(checktier(4, message)){
    message.channel.startTyping();
    message.channel.send(sayMessage);
    message.channel.stopTyping();
    }
  }
  
  if(command === "giveaway"){
    if(!message.member.roles.some(r=>["Giveaway Perms"].includes(r.name)) && !message.author.id === config.ownerID)
      return
    giveaways.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnersCount: parseInt(args[1]),
            messages: giveawaymessages
        }).then((gData) => {
            console.log(gData); // {...} (messageid, end date and more)
        }).catch((error) => message.channel.send(error))
  }
  
  if(command === "reroll"){
    if(!message.member.roles.some(r=>["Giveaway Perms"].includes(r.name)) && !message.author.id === config.ownerID)
      return
        let messageID = args[0];
        giveaways.reroll(messageID).then(() => {
            message.channel.send("Success! Giveaway rerolled!");
        }).catch((err) => {
            message.channel.send("No giveaway found for "+messageID+", please check and try again");
        });
  }
  
  if(command === "edit"){
    if(!message.member.roles.some(r=>["Giveaway Perms"].includes(r.name)) && !message.author.id === config.ownerID)
      return
        let messageID = args[0];
        giveaways.edit(messageID, {
            newWinnersCount: parseInt(args[1]),
            addTime: 5000
        }).then(() => {
            message.channel.send("Success! Giveaway updated!");
        }).catch((err) => {
            message.channel.send("No giveaway found for "+messageID+", please check and try again");
        });
    }
  
  
  if(command === "reset" || command === "setspec"){
    if(!checktier(2, message)) return
    let participant = message.guild.roles.find(role => role.name === "Participant");
    let spectator = message.guild.roles.find(role => role.name === "Spectator");
    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!user)
      return message.reply("You must mention a user or provide their id!")
    message.channel.send(user.user.tag + " has been reset to Spectator");
    user.addRole(spectator).catch(console.error);
    user.removeRole(participant).catch(console.error);
  }
  
  if(command === "part" || command === "setpart"){
    if(!checktier(2, message)) return
    let participant = message.guild.roles.find(role => role.name === "Participant");
    let spectator = message.guild.roles.find(role => role.name === "Spectator");
    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!user)
      return message.reply("You must mention a user or provide their id!")
    message.channel.send(user.user.tag + " has been made a Participant");
    user.addRole(participant).catch(console.error);
    user.removeRole(spectator).catch(console.error);
  }
  
  if(command === "poll"){
    message.delete()
    const m = await message.channel.send(args.join(" "))
    await m.react("👍")
    await m.react("👎")
  }
  
  if(command === "left" || command === "remaining"){
    let left = message.guild.members.filter(member => member.roles.find(r => r.name === "Participant")).size  
    message.channel.send(`**${left}** players remaining...`)
  }
  
  if(command === "rolemembers" || command === "inrole") {
    if(!checktier(1, message)) return
    let roleName = message.content.split(" ").slice(1).join(" ");
    let membersWithRole = message.guild.members.filter(member => { 
        return member.roles.find("name", roleName);
    }).map(member => {
        return member.user.id;
    })
    let inrole = `"` + membersWithRole.join(`", "`) + `"`
    fs.writeFile("roles.txt", inrole, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
    if(inrole.length < 2000){
    fs.readFile("roles.txt", function(err, buf) {
      message.channel.send(buf.toString(), { split: true })
    });
    } else {
    pastebin
  .createPasteFromFile("roles.txt", "emroles" + Date.now())
  .then(function (data) {
    // paste succesfully created, data contains the id
    message.channel.send(`${data}`)
  })
  .fail(function (err) {
    // Something went wrong
    console.log(err);
    message.channel.send("An error occurred")
  })
    }
  }

  if(command === "printroles"){
    if(!checktier(1, message)) return
    fs.readFile("roles.txt", function(err, buf) {
      message.channel.send(buf.toString(), { split: true })
    });
  }
  
  if(command === "test"){
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! :ping_pong: Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "pi"){
    let num = parseInt(args[0])
    message.delete().catch(O_o=>{});
    message.channel.send(PI(num))
    
  }
  
  if(command === "kickallusersendofevent"){
    if(checktier(3, message)) {  
    message.reply("⚠ You are about to kick everyone with the Participant and Spectator roles, but not those with the DontKick role.\nAre you sure you want to do this?")
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
              if(member.roles.some(r=>["Participant", "Spectator"].includes(r.name)) && !member.roles.some(r=>["DontKick"].includes(r.name)) )
                member.send("Thanks for participating in the event! You have been removed from the server, as everyone is kicked at the end. Thanks again :smiley:").then(
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
}
  
  if(command === "kickoutsidespec"){
    if(checktier(3, message)) {  
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
  }
  
  if(command === "report" || command === "reportuser" || command === "reportbug"){
    if(checktier(1, message))  
    if(message.mentions.members.first()){
    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!user)
      return message.reply("You must mention a user or provide their id!\nIf you did, please make sure that the user is still in this server.")
    message.delete().catch(O_o=>{});
    let reason = args.slice(1).join(' ');
    message.delete().catch(O_o=>{});
    let report = new Discord.RichEmbed()
      .setDescription(`New report from ${message.author} in ${message.channel}`)
      .setColor("#D49DA9")
      .addField("Reported User:", user.user)
      .addField("Reported User's ID:", user.user.id)
      .addField("Reason", reason)
      .setTimestamp();
    let reportchannel
    if(message.guild.id === config.eventserver2) reportchannel = "603252475545518112"
    if(message.guild.id === config.eventserver) reportchannel = "540950158284816384"
    if(client.config.reportping) client.channels.get(reportchannel).send("<@&602912825697894411>")
    client.channels.get(reportchannel).send(report)
    message.channel.send("✅ Report recieved");
  } else {
    message.delete().catch(O_o=>{});
    let reason = args.join(' ');
    let report = new Discord.RichEmbed()
      .setDescription(`New report from ${message.author} in ${message.channel}`)
      .setColor("#D49DA9")
      .addField("Report:", reason)
      .setTimestamp();
    if(client.config.reportping) client.channels.get("603252475545518112").send("<@&534043596391972864>")
    client.channels.get("603252475545518112").send(report)
    message.channel.send("✅ Report recieved");
  }
  }
  
  if(command === "eval"){
    if(checktier(4, message)) {  
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
  }
  
  if(command === "spec"){
    let left = message.guild.members.filter(member => member.roles.find(r => r.name === "Spectator")).size
    let outside = message.guild.members.filter(member => member.roles.find(r => r.name === "Outside Spectator")).size
    let spectate = left + outside
    message.channel.send("**" + spectate + "** players spectating...\n**" + left + "** are people who have died in the event.\n**" + outside + "** are people who are watching the event from the outside.")
  }
  
  if(command === "splitpart"){
    if(checktier(2, message)) {  
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
  }
  
  if(command === "joinevent"){
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
          client.channels.get("553767914575102019").send("The invite limit was reached, but " + message.author + " tried to join.")
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
  
  
})

client.login(process.env.TOKEN);


function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}   

function checktier(required, message){
  if(message.author.level < required){
    message.channel.send(`Error: You don't have the required Authorization Level to perform this action.\nYou need Level ${required}: ${leveltext[required]}\nYou have Level ${message.author.level}: ${leveltext[message.author.level]}`)
    return false
  } else return true
}



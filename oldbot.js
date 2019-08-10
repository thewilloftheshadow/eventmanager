const listusers = true
const reportping = false
let autoprint = true

// simple web server to keep the bot online
const http = require('http');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendFile(__dirname + '/index.html');
});
app.get("/roles", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendFile(__dirname + '/roles.html');
});
//app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//end server code

const Discord = require("discord.js");
const giveaways = require("discord-giveaways")
const client = new Discord.Client();
const config = require("./config.json");

const talkedRecently = new Set();
const fs = require("fs");
const util = require('util')
const db = require('quick.db')
db.createWebview('eventsarelit', process.env.PORT);
const animals = require('random-animals-api'); 
const Sentencer = require('sentencer');
const PI = require("pi");
const ms = require("ms");


var PastebinAPI = require('pastebin-js'),
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


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  giveaways.launch(client, {
        updateCountdownEvery: 5000,
        botsCanWin: false,
        embedColor: "#FEB3BE",
        reaction: "🐲"
    });
  client.user.setActivity('events run smoothly', { type: 'WATCHING' });
  // List servers the bot is connected to
  console.log("Servers:")
  client.guilds.forEach((guild) => {
    console.log(" - " + guild.name)
    if(guild.id === config.eventserver && listusers){
    let membersWithOwner = guild.members.filter(member => { 
        return member.roles.find("name", "Event Owners");
    }).map(member => {
      let person = `${member.user.id} (${member.user.tag})`
      return person
    })
    fs.writeFile("staff/owners.txt", membersWithOwner.join(`\n`), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("Listed all owners");
    })
    let membersWithAdmin = guild.members.filter(member => { 
        return member.roles.find("name", "Event Administrator");
    }).map(member => {
      let person = `${member.user.id} (${member.user.tag})`
      return person
    })
    fs.writeFile("staff/admins.txt", membersWithAdmin.join(`\n`), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("Listed all admins");
    })
    let membersWithPing = guild.members.filter(member => { 
        return member.roles.find("name", "Ping");
    }).map(member => {
      let person = `${member.user.id} (${member.user.tag})`
      return person
    })
    fs.writeFile("staff/ping.txt", membersWithPing.join(`\n`), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("Listed all ping users");
    })
  }
  })
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
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
  
  if(command === "test") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    // message.delete().catch(O_o=>{});
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! :ping_pong: Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    console.log(message.author.tag + " used the command " + command)
  } 
  
  if(command === "help"){
    message.reply("Check out <#602932318566482096> for my commands :smiley:")
  }
  
  if(command === "invites"){
    const invites = {};
    const g = message.guild
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    }).then(message.channel.send(util.inspect(invites), { split: true })).catch(console.error)
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
    let event = client.guilds.get(config.eventserver)
    db.fetch("added").then(added => {
      db.fetch("limit").then(limit => {
        if(limit === added.length){ 
          full = true
          client.channels.get("553767914575102019").send("The invite limit was reached, but " + message.author + " tried to join.")
        }
        if(limit === 99999){
          closed = true
          return message.author.send("Sorry. The event server is currently closed.")
        }
        if(event.member(message.author.id)) return message.author.send("You're already in the event server!\nIf you are trying to participate, please leave the server first, then use the command again. If you have any problems, DM <@" + config.ownerID + ">")
        if(!full && !closed){
          if(added.includes(message.author.id)) return message.author.send("You've already joined the event!")
          let invite = client.channels.get(config.rules).createInvite(options).then(function(newInvite){
            message.author.send("https://discord.gg/" + newInvite.code)
          });
           db.push("added", message.author.id)
        }
      })
    })
  }
  
  if(command === "lorem"){
    if(message.author.id === config.ownerID){
    fs.readFile("src/lorem.txt", function(err, buf) {
      message.channel.send(buf.toString(), { split: true })
    });
    } else {
      message.reply("Heh. Only Shadow can spam like that")
    }
  }
  
  if(command === "forceping"){
    if(!message.member.roles.some(r=>["Event Owner"].includes(r.name)) && !message.author.id === config.ownerID)
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
  
  if(command === "panda"){
    if(message.guild.id === config.eventserver) message.delete()
    animals.panda().then(url => {
    const embed = new Discord.RichEmbed()
    .setDescription("Here's your " + command + " picture!")
    .setColor(16711680)
    .setImage(url)
    .setTimestamp();
    message.channel.send(embed)
    })
  }
  
  if(message.guild){
  
  if(message.guild.id === config.eventserver){
    
  if(command === "verify"){
    message.channel.send({
        "embed": {
            "title": "Welcome!",
            "description": `<@${message.author.id}> is a verified bot maker.`,
            "timestamp": new Date(),
            "footer": {
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                "text": "Requested by " + message.author.tag
            },
            "thumbnail": {
                "url": `${message.author.avatarURL}`
            }
        }
    });
  }
  
  if(command === "milk"){
    if (message.author.id === "234430971565309962" || message.author.id === config.ownerID) {
      let victim = message.mentions.members.first() || message.guild.members.get(args[0]);
      if (!victim) {
        message.channel.send(`I can\'t find that user!`);
        return;
      } else {  
        if(victim.id === client.user.id){
          message.channel.send(`UwU Jon-senpai! Don't do that! OwO`)
        } else {
          message.channel.send(`Jon has milked ${victim}! 🐮`);
        }
        message.delete();
      }
    } else {
      message.reply(`You're not Jon, you can't use this command!`);
      message.delete()
    }
  }
  
  
    
  if(command === "pi"){
    let num = parseInt(args[0])
    message.delete().catch(O_o=>{});
    message.channel.send(PI(num))
    
  }
  
  if(message.content.includes("<@421986860860964875>")){
    message.channel.send("Hey! Whatchu want from my homie?")
  }
  
  }
  }
  
  if(command === "reset"){
    
    if(!message.member.roles.some(r=>["Event Owner", "Event Administrator", "Event Team"].includes(r.name)) )
      return
    let participant = message.guild.roles.find(role => role.name === "Participant");
    let spectator = message.guild.roles.find(role => role.name === "Spectator");
    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!user)
      return message.reply("You must mention a user or provide their id!")
    message.channel.send(user.user.tag + " has been reset to Spectator");
    user.addRole(spectator).catch(console.error);
    user.removeRole(participant).catch(console.error);
  }
  if(command === "part"){
    
    if(!message.member.roles.some(r=>["Event Owner", "Event Administrator", "Event Team"].includes(r.name)) )
      return
    let participant = message.guild.roles.find(role => role.name === "Participant");
    let spectator = message.guild.roles.find(role => role.name === "Spectator");
    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!user)
      return message.reply("You must mention a user or provide their id!")
    message.channel.send(user.user.tag + " has been set to Participant");
    user.addRole(participant).catch(console.error);
    user.removeRole(spectator).catch(console.error);
  }
  
  if(command === "kickallusersendofevent"){
    if(!message.member.roles.some(r=>["Event Owner"].includes(r.name)) && !message.author.id === config.ownerID)
      return
    message.reply("⚠ You are about to kick everyone with the Participant role and everyone with the Spectator role. \nAre you sure you want to do this?")
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
              if(member.roles.some(r=>["Participant", "Spectator"].includes(r.name)) )
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
  if(command === "reportuser" || command === "reportbug" || command === "report"){
  
  if (talkedRecently.has(message.author.id)) {
    message.reply("Wait 5 minutes before sending another report");
  } else {
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
    if(reportping) client.channels.get("540950158284816384").send("<@&534043596391972864>")
    client.channels.get("540950158284816384").send(report)
    message.channel.send("✅ Report recieved");
  } else {
    message.delete().catch(O_o=>{});
    let reason = args.join(' ');
    let report = new Discord.RichEmbed()
      .setDescription(`New report from ${message.author} in ${message.channel}`)
      .setColor("#D49DA9")
      .addField("Report:", reason)
      .setTimestamp();
    if(reportping) client.channels.get("540950158284816384").send("<@&534043596391972864>")
    client.channels.get("540950158284816384").send(report)
    message.channel.send("✅ Report recieved");
  }

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after 15 minutes
          talkedRecently.delete(message.author.id);
        }, 300000);
    }
  
  }
  
  if(command === "clearreportcd"){
    if(!message.member.roles.some(r=>["Event Owner", "Event Administrator", "EMAdmin", "Event Team"].includes(r.name)) )
      return message.react("🙉")
    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!user)
      return message.reply("You must mention a user or provide their id!\nIf you did, please make sure that the user is still in this server.")
    talkedRecently.delete(user.user.id);
    message.channel.send("Reset " + user.user.tag + "\'s cooldown for reports")
  }
  
  if(command === "oof"){
    if(message.author.id === config.ownerID || message.author.id === "592121930207985670"){
      let c = Sentencer.make("The {{ adjective }} {{ noun }} likes to eat {{ an_adjective }} {{ noun }}s.")
      message.delete().catch(O_o=>{});
      message.channel.send(c)
    }
  }
  
    
  
  if(command === "giftcd"){
    let roleName = ""
    if (args === undefined || args.length == 0) {
      roleName = "Participant"
    } else {
      roleName = message.content.split(" ").slice(1).join(" ");
    }
    let membersWithRole = message.guild.members.filter(member => { 
        return member.roles.find("name", roleName);
    }).map(member => {
        return member.user.id;
    })
    message.channel.send("b@do for (var user of [\"" + membersWithRole.join(`", "`) + "\"\]) \{\nupdateCooldown(\"cooldownname\", user, 0\)\;\n\}", { split: true })
  }
  
  if(command === "giftitem"){
    let roleName = ""
    if (args == null || args.length == 0) {
      roleName = "Participant"
    } else {
      roleName = message.content.split(" ").slice(1).join(" ");
    }
    let membersWithRole = message.guild.members.filter(member => { 
        return member.roles.find("name", roleName);
    }).map(member => {
        return member.user.id;
    })
    message.channel.send("b@do for (var user of [\"" + membersWithRole.join(`", "`) + "\"\]) \{\nupdateInventory(user, \"AirDropItem\"\, 2\)\;\n\}", { split: true })
  }
  
  if(command === "rolemembers" || command === "inrole") {
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
    fs.readFile("roles.txt", function(err, buf) {
      message.channel.send(buf.toString(), { split: true })
    });
  }
  
  if(command === "say") {
    if(!message.member.roles.some(r=>["Event Owner", "Event Administrator", "Event Team"].includes(r.name)) )
      return
    message.delete().catch(O_o=>{});
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // And we get the bot to say the thing: 
    console.log(message.author.tag + " made me say " + sayMessage);
    message.channel.send(sayMessage, { split: true });
  }
  
  
  
  if(command === "changerp") {
    if(!message.member.roles.some(r=>["Event Owner", "Event Administrator", "Event Team"].includes(r.name)) )
      return 
    message.delete().catch(O_o=>{});
    const sayMessage = args.join(" ");
    client.user.setActivity(sayMessage, { split: true });
    message.reply("You have changed my RP to `Playing " + sayMessage + "`")
  }
  
  if(command === "left" || message.content.includes("left")) {
    let left = message.guild.members.filter(member => member.roles.find(r => r.name === "Participant")).size
    message.channel.send(left + " players remaining...")
  }
  
  if(command === "spec") {
    let left = message.guild.members.filter(member => member.roles.find(r => r.name === "Spectator")).size
    message.channel.send(left + " players spectating...")
  }
  
  if(command === "health") {
    if(!message.member.roles.some(r=>["Event Owner", "Event Administrator", "PlayerCounter", "Event Team"].includes(r.name)) )
      return 
    message.delete().catch(O_o=>{});
    const sayMessage = args.join(" ");
    message.channel.send("The Laughter has " + sayMessage + " health remaining...")
  }
  
  if (command === "eval" || command === "mastereval") {
    if(message.author.id !== config.ownerID && !message.author.id == "409843274724016128") 
      return message.reply(":warning: You don't have permission to use that command! :warning:")
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
    console.log(message.author.tag + " used the command " + command)
  }

  if(command === "delmsg"){
    if(message.author.id === config.ownerID){
      let delmsg = message.channel.fetchMessage(args[1])
      delmsg.delete()
    }
    message.delete()
  }
});


function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}     
client.login(process.env.TOKEN); 

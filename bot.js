const listusers = false
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
//var listener = app.listen(process.env.PORT, function() {
// console.log('Your app is listening on port ' + listener.address().port);
//});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//end server code

const { Client, Collection, Discord } = require('discord.js');
const giveaways = require("discord-giveaways")
const client = new Client();
const config = require("./config.json");
const lucian = require("./lucian-is-paranoid.json");


const talkedRecently = new Set();

const Enmap = require("enmap");
const { readdirSync, fs } = require('fs');
const util = require('util')

const db = require('quick.db')
const animals = require('random-animals-api'); 
const Sentencer = require('sentencer');
const PI = require("pi");
const ms = require("ms");

db.createWebview('eventsarelit', process.env.PORT);
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



client.commands = new Collection();
client.aliases = new Collection();
console.log("Loading Commands:")
const load = dirs => {
  const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
  for (const file of commands) {
    const pull = require(`./commands/${dirs}/${file}`);
    client.commands.set(pull.help.name, pull);
    console.log("Loaded " + pull.help.name)
    if (pull.help.aliases) pull.help.aliases.forEach(a => {
      client.aliases.set(a, pull.help.name)
      console.log("Loaded Alias \'" + a + "\' for command " + pull.help.name)
    });
  }
};
const commandsDir = readdirSync('./commands/');
commandsDir.forEach(x => load(x));


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  giveaways.launch(client, {
        updateCountdownEvery: 900000,
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
        return member.roles.find("name", "Event Admins");
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

client.config = config;
client.lucian = lucian;

client.on("emojiCreate", (emoji) => {
  if(emoji.guild.id === client.config.eventserver)
    client.channels.get("603260651518951424").send("```<:" + emoji.name + ":" + emoji.id + ">```")
});



client.on("message", async message => {
  if(!message.guild === null){
    if(message.guild.id === config.eventserver) console.log(message.author.tag + " sent this: (" + message.content + ") in " + message.guild + "'s channel #" + message.channel.name + "(" + message.channel.id + ")").catch(console.error);
  }
  
  if(message.channel.id === "602909193837608981"){
    let kfmsg = message.content
    console.log(kfmsg)
    let splited = kfmsg.split("**")
    console.log(splited)
    let killname = splited[3]
    console.log(killname)
    let dead = message.guild.users.find(user => user.username == killname);
    console.log(dead)
    client.channels.get("602881840348659714").send(`${dead.username} has just died. Can I get a RIP in the chat?`)
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
  
  
  if(command === "eval"){
    if(message.author.id !== client.config.ownerID && !message.author.id == "409843274724016128") 
      return message.reply(":warning: You don't have permission to use that command! :warning:")
  }
  
  if(command === "poll"){
    const m = await message.channel.send(args.join(" "))
    m.react(":thumbs_up:")
    m.react(":thumbs_down:")
  }

  const commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if(commandfile) commandfile.run(client, message, args, db);
  
  if(command === "test"){
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! :ping_pong: Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
})

client.login(process.env.TOKEN);
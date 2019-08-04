const fs = require("fs");
var PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI(process.env.PASTEBINKEY);


exports.run = (client, message, args, db) => {  
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

exports.help = {
  name: 'inrole',
  description: 'Get the users who are in a role',
  usage: 'b@inrole <role name>',
  category: 'b@do_commands',
  accessableby: 'Everyone',
  aliases: ['rolemembers']
};
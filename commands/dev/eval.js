exports.run = (client, message, args, db) => {  
if(client.config.owners.indexOf(message.author.id) > -1){
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }else {
  message.reply(":warning: You don't have permission to use that command! :warning:")
}
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}   

exports.help = {
  name: 'Eval',
  description: 'Run any code',
  usage: 'b@eval <code>',
  category: 'Developer',
  accessableby: 'Server Owners',
  aliases: []
};
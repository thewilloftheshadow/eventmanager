exports.run = (client, message, args, db) => {  
    if(!message.member.roles.some(r=>["Event Owner", "Event Admins", "Event Team"].includes(r.name)) && !client.config.owners.indexOf(message.author.id) > -1)
      return
    message.delete().catch(O_o=>{});
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // And we get the bot to say the thing: 
    console.log(message.author.tag + " made me say " + sayMessage);
    message.channel.send(sayMessage, { split: true });
}

exports.help = {
  name: 'Say',
  description: 'Make the bot say something',
  usage: 'b@say <message>',
  category: 'Developer',
  accessableby: 'Event Admins',
  aliases: ['parrot']
};
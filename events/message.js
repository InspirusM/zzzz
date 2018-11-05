module.exports = async (client, msg) => {

if(msg.author.bot) return;
if(msg.channel.type === "dm") return;

 
  let prefix = client.config.BOT_PREFIX;
  let messageArray = msg.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  if(cmd.startsWith(prefix)){
    
  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,msg,args,prefix);
    
  }

}

const Discord = require("discord.js");


module.exports.run = async (client, msg, args) => {
let message = msg;
  if(msg.author.id != client.config.BOT_OWNER_ID) return msg.channel.send(":x: You Don\'t Have Permission");
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
  
  console.log(`\n${message.author.username}#${message.author.discriminator} Used Eval Command On ${message.guild.name}`)
  
      try {
        let codein = args.join(" ");
        let code = eval(codein);
        
        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Evaluate')
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        .addField('Type',`\`\`\`\n ${typeof code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        let eer = new Discord.RichEmbed()
        .setTitle(`Eval Error :x:`)
        .setColor("RANDOM")
        .addField(`Error`,`\`\`\`js\n${e}\n\`\`\``)
        message.channel.send(eer);
    }
}

module.exports.help = {
    name : "eval",
    type: "Owner",
}
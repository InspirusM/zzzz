const Discord = require("discord.js");

module.exports.run = async (client, msg) => {
    let message = msg;
    let embed = new Discord.RichEmbed()
		.setThumbnail(client.user.avatarURL) 
        	.setColor(0xffffff)
		      .setDescription(":construction: UNDER CONSTRUCTION \n My Dashboard https://hddev.glitch.me")        
        	.setFooter(`HD MANAGER © 2018`, `https://cdn.discordapp.com/avatars/505926880181092362/e93b7477d496c1bfdb4b472166224de7.png?size=2048`)
                 
     msg.channel.send(`Hello **${msg.author.username}** !`, embed);
    
}

module.exports.help = {
    name : "help",
    type: "bot",
}

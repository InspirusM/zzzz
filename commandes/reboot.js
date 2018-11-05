module.exports.run = async (client, msg) => {

if(msg.author.id != client.config.BOT_OWNER_ID) return msg.channel.send(":x: You Don\'t Have Permission");

    msg.channel.send(":gear: Rebooting").then(() => {

        console.log('Rebooted');

        client.destroy();

        process.exit(1)
	    
    })
}


module.exports.help = {
    name : "logout",
    type: "Owner",
}

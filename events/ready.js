module.exports = async (client) => {

console.log(`${client.user.username} online`);

 await client.website.load(client);
 await client.user.setPresence({ game: { name: `${client.config.BOT_PREFIX}help || HD DEV`}, type: "WATCHING" });

}

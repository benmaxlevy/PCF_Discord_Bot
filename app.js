const discord = require("discord.js"),
    client = new discord.Client(),
    token = require("./token"),
    newcontroller = require("./components/newcontroller"),
    metar = require("./components/metar");

let prefix = ".";

client.on("ready",()=>{
    console.log("PCF Discord Bot is now online.");
});

client.on("message",msg=>{
    //for welcome channel only
    if (msg.content.startsWith(prefix + "newcontroller")) {
        newcontroller.newcontroller(msg);
    }
    //for bot-commands channel only
    if(msg.content.startsWith(prefix) && msg.channel.id === "687634150693404688"){
        if (msg.content.startsWith(prefix + "metar")){
            metar.getMetar(msg);
        } else if (msg.content.startsWith(prefix+"startRoleUpdater")) {
            msg.reply("This feature is not ready yet, sorry!");
            // setInterval(()=>{
            //
            // }, 9000); //every 15 min
        }
    } else {
        msg.reply("That command is restricted to the #bot-commands channel. Please refrain from using this command outside that channel.");
    }

});

client.on("guildMemberAdd", member => {
    member.send("Welcome to the Bot Test Server! To get started, please type \".membersetup (CID) (Home, Visitor, LOA, or Guest)\"! in the Welcome channel.");
});

client.login(token.token).catch(console.error);

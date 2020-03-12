const discord = require("discord.js"),
    client = new discord.Client(),
    token = require("./token"),
    newcontroller = require("./components/newcontroller"),
    metar = require("./components/metar"),
    updater = require("./components/roleUpdater"),
    atisIDS = require("./components/atisIDS");

let prefix = ".";

client.on("ready",()=>{
    console.log("PCF Discord Bot is now online.");
});

client.on("message",msg=>{
    //for welcome channel only
    if (msg.content.startsWith(prefix + "newcontroller")) {
        newcontroller.newcontroller(msg);
    }
    if (msg.content.startsWith(prefix + "metar")){
        metar.getMetar(msg);
    } else if (msg.content.startsWith(prefix+"startRoleUpdater")) {
        msg.reply("This feature is not ready yet, sorry!");
        // setInterval(()=>{
        // updater.roleUpdater(msg);
        // }, 9000); //every 15 min
    } else if (msg.content.startsWith(prefix + "addAtis")){
        atisIDS.addAtis(msg, client);
    } else if (msg.content.startsWith(prefix+"modifyAtis")){
        atisIDS.modifyAtis(msg, client);
    } else if (msg.content.startsWith(prefix+"removeAtis")){
        atisIDS.removeAtis(msg, client);
    }
});

client.on("guildMemberAdd", member => {
    member.send("Welcome to the Bot Test Server! To get started, please type \".membersetup (CID) (Home, Visitor, LOA, or Guest)\"! in the Welcome channel.");
});

client.login(token.token).catch(console.error);

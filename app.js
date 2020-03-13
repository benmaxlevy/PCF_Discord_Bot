const discord = require("discord.js"),
    client = new discord.Client(),
    token = require("./token"),
    newcontroller = require("./components/newcontroller"),
    updater = require("./components/roleUpdater"),
    atisIDS = require("./components/atisIDS"),
    help = require("./components/help"),
    wallop = require("./components/wallop"),
    positions = require("./components/positions");

let prefix = ".";

client.on("ready",()=>{
    console.log("PCF Discord Bot is now online.");
});

client.on("message",msg=>{
    //for welcome channel only
    let content = msg.content.toLowerCase();
    if (content.startsWith(prefix + "newcontroller")) {
        newcontroller.newcontroller(msg, client);
    }else if (content.startsWith(prefix+"startroleupdater")) {
        msg.reply("This feature is not ready yet, sorry!");
        // setInterval(()=>{
        // updater.roleUpdater(msg);
        // }, 9000); //every 15 min
    } else if (content.startsWith(prefix + "addatis")){
        atisIDS.addAtis(msg, client, discord);
    } else if (content.startsWith(prefix+"modifyatis")){
        atisIDS.modifyAtis(msg, client, discord);
    } else if (content.startsWith(prefix+"removeatis")){
        atisIDS.removeAtis(msg, client, discord);
    } else if (content.startsWith(prefix+"help")){
        help.help(msg, discord, client);
    } else if (content.startsWith(prefix+"wallop")){
        wallop.wallop(msg, client, discord);
    } else if (content.startsWith(prefix+"startpositionupdater")){
        positions.update(msg, client, discord);
    }
});

client.on("guildMemberAdd", member => {
    member.send("Welcome to the Bot Test Server! To get started, please type \".membersetup (CID) (Home, Visitor, LOA, or Guest)\"! in the Welcome channel.");
});

client.login(token.token).catch(console.error);

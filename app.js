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
    if (msg.content.startsWith(prefix + "newcontroller")) {
        newcontroller.newcontroller(msg);
    } else if (msg.content.startsWith(prefix + "metar")){
        metar.getMetar(msg);
    }
});

client.on("guildMemberAdd", member => {
    member.send("Welcome to the Bot Test Server! To get started, please type \".membersetup (CID) (Home, Visitor, LOA, or Guest)\"! in the Welcome channel.");
});

client.login(token.token).catch(console.error);

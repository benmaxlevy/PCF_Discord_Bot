const discord = require("discord.js"),
    client = new discord.Client(),
    request = require("request"),
    xml = require("libxmljs"),
    token = require("./token");

let prefix = ".";

client.on("ready",()=>{
    console.log("PCF Discord Bot is now online.");
});

client.on("message",msg=>{
    if(msg.content.startsWith(prefix+"newcontroller"))
    {
        if(msg.channel.id === "686709736921759776"){
            let content = msg.content.substring(15, 22);
            let content2 = msg.content.substring(0);
            if(content === "") {
                if (!content2.includes("Home") || !content2.includes("Visitor") || !content2.includes("LOA") || content2.includes("Guest") === false) {
                    msg.reply("Aloha! Please type \".newcontroller\" followed by your VATSIM CID, then, \"Home\", \"Visitor\", \"LOA\", or \"Guest\" to continue with setup process.").catch(console.error);
                }
                } else {
                msg.reply("Ok, let me get you setup :)").catch(console.error);
                request("https://cert.vatsim.net/vatsimnet/idstatus.php?cid="+content,(err, res, body)=>{
                    let parsedBody = xml.parseXml(body);
                    let children = parsedBody.root().childNodes();
                    let child = children[0];
                    let cid = child.attr("cid").value();
                    let firstName = parsedBody.get("//name_first").text();
                    let lastName = parsedBody.get("//name_last").text();
                    let rating = parsedBody.get("//rating").text();

                    if(content2.includes("Guest")){
                        msg.member.roles.add(["687057311809667072"]);
                    }

                    switch(rating){
                        case "Pilot/Observer":
                            rating="OBS";
                            break;
                        case "Student":
                            rating="S1";
                            break;
                        case "Student 2":
                            rating="S2";
                            break;
                        case "Senior Student":
                            rating="S3";
                            break;
                        case "Controller":
                            rating="C1";
                            break;
                        case "Senior Controller":
                            rating="C3";
                            break;
                        case "Instructor":
                            rating="I1";
                            break;
                        case "Senior Instructor":
                            rating="I3";
                            break;
                        case "Supervisor":
                            rating="SUP";
                            break;
                        case "Administrator":
                            rating="ADM";
                            break;
                    }
                    switch(cid){
                        case "1329537":
                            rating="ATM";
                            break;
                        case "1374485":
                            rating="DATM";
                            break;
                    }
                    msg.member.setNickname(firstName+" "+lastName+" | "+rating).catch(console.error);
                    msg.reply("https://media1.tenor.com/images/5c0e9a59364291b87ad912d88d37438c/tenor.gif?itemid=5682066").catch(console.error);
                    setTimeout(()=>{
                        msg.reply("You're all setup! Welcome and Enjoy your time at PCF!").catch(console.error);
                    }, 3000);
                });
            }
        } else {
            msg.reply("DO NOT TYPE THAT COMMAND HERE DEMON! YOU SHALL BE REPORTED TO THE AVIATION AND VATSIM GODS!");
        }
    }

});

client.on("guildMemberAdd", member => {
    member.send("Welcome to the Bot Test Server! To get started, please type \".membersetup (CID) (Home, Visitor, LOA, or Guest)\"! in the Welcome channel.");
});

client.login(token.token).catch(console.error);

const request = require("request"),
    xmljs = require("xml-js");

const newcontroller = (msg, client)=>
{
    const welcome = client.channels.cache.get("676662972285714432");
    if (msg.channel.id === "676662972285714432") {
        let content = msg.content.substring(15, 22);
        let content2 = msg.content.substring(0);
        if (content === "") {
            if (!content2.includes("Home") || !content2.includes("Visitor") || !content2.includes("LOA") || content2.includes("Guest") === false) {
                msg.reply("Aloha! Please type \".newcontroller\" followed by your VATSIM CID, then, \"Home\", \"Visitor\", \"LOA\", or \"Guest\" to continue with setup process.").catch(console.error);
            }
        } else {
            request("https://cert.vatsim.net/vatsimnet/idstatus.php?cid=" + content, (err, res, body) => {
                let result = xmljs.xml2json(body, {compact: true});
                let parsedResult = JSON.parse(result);
                let cid = parsedResult.root.user.cid;
                let firstName = parsedResult.root.user.name_first._text;
                let lastName = parsedResult.root.user.name_last._text;
                let rating = parsedResult.root.user.rating._text;

                if (content2.includes("Guest")) {
                    msg.member.roles.add(["676630584805818381"]).catch(console.error);
                } else if (content2.includes("LOA")) {
                    msg.member.roles.add(["687455955960463430"]).catch(console.error);
                } else if (content2.includes("Visitor")) {
                    msg.member.roles.add(["676629880372461569"]).catch(console.error);
                } else if (content2.includes("Home")) {
                    msg.member.roles.add(["676629816136695810"]).catch(console.error);
                }
                switch (rating) {
                    case "Pilot/Observer":
                        rating = "OBS";
                        msg.member.roles.add(["676633669913542677"]).catch(console.error);
                        break;
                    case "Student":
                        rating = "S1";
                        msg.member.roles.add(["676633942052306947"]).catch(console.error);
                        break;
                    case "Student 2":
                        rating = "S2";
                        msg.member.roles.add(["676634052639588382"]).catch(console.error);
                        break;
                    case "Senior Student":
                        rating = "S3";
                        msg.member.roles.add(["676634087389134859"]).catch(console.error);
                        break;
                    case "Controller":
                        rating = "C1";
                        msg.member.roles.add(["676634130036817923"]).catch(console.error);
                        break;
                    case "Senior Controller":
                        rating = "C3";
                        msg.member.roles.add(["676634156842745857"]).catch(console.error);
                        break;
                    case "Instructor":
                        rating = "I1";
                        msg.member.roles.add(["676636001547845651"]).catch(console.error);
                        break;
                    case "Senior Instructor":
                        rating = "I3";
                        msg.member.roles.add(["676636081956847627"]).catch(console.error);
                        break;
                    case "Supervisor":
                        rating = "SUP";
                        msg.member.roles.add(["689484196477010069"]).catch(console.error);
                        break;
                    case "Administrator":
                        rating = "ADM";
                        msg.member.roles.add(["689484744815411263"]).catch(console.error);
                        break;
                }
                switch (cid) {
                    case "1329537":
                        rating = "ATM";
                        break;
                    case "1374485":
                        rating = "DATM";
                        break;
                }
            });
        }
    } else {
        msg.reply(`That command is restricted to the ${welcome} channel. Please refrain from using this command outside that channel.`);
    }
};

exports.newcontroller = newcontroller;
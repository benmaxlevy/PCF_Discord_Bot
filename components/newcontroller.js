const request = require("request"),
    xmljs = require("xml-js");

const newcontroller = (msg, client)=>
{
    const welcome = client.channels.cache.get("686709736921759776");
    if (msg.channel.id === "686709736921759776") {
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
                    msg.member.roles.add(["687057311809667072"]).catch(console.error);
                } else if (content2.includes("LOA")) {
                    msg.member.roles.add(["687057393363845236"]).catch(console.error);
                } else if (content2.includes("Visitor")) {
                    msg.member.roles.add(["686701515376951305"]).catch(console.error);
                } else if (content2.includes("Home")) {
                    msg.member.roles.add(["686701486004371533"]).catch(console.error);
                }
                switch (rating) {
                    case "Pilot/Observer":
                        rating = "OBS";
                        msg.member.roles.add(["687483883880710146"]).catch(console.error);
                        break;
                    case "Student":
                        rating = "S1";
                        msg.member.roles.add(["686701333621112923"]).catch(console.error);
                        break;
                    case "Student 2":
                        rating = "S2";
                        msg.member.roles.add(["686701362502696982"]).catch(console.error);
                        break;
                    case "Senior Student":
                        rating = "S3";
                        msg.member.roles.add(["686701376096567349"]).catch(console.error);
                        break;
                    case "Controller":
                        rating = "C1";
                        msg.member.roles.add(["686701388163448869"]).catch(console.error);
                        break;
                    case "Senior Controller":
                        rating = "C3";
                        msg.member.roles.add(["686701399870144661"]).catch(console.error);
                        break;
                    case "Instructor":
                        rating = "I1";
                        msg.member.roles.add(["686701415334150194"]).catch(console.error);
                        break;
                    case "Senior Instructor":
                        rating = "I3";
                        msg.member.roles.add(["686701431247732843"]).catch(console.error);
                        break;
                    case "Supervisor":
                        rating = "SUP";
                        break;
                    case "Administrator":
                        rating = "ADM";
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
                msg.member.setNickname(firstName.toString()+" "+lastName.toString()+" | "+rating.toString());
            });
        }
    } else {
        msg.reply(`That command is restricted to the ${welcome} channel. Please refrain from using this command outside that channel.`);
    }
};

exports.newcontroller = newcontroller;
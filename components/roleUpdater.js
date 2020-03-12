const request = require("request"),
    xmljs = require("xml-js");

const roleUpdater = (msg) => {
    //need to add field in database to store each users Discord ID once they do .newcontroller.
    msg.guild.members.filter(m => !m.user.bot).forEach((member) => {
        request("https://cert.vatsim.net/vatsimnet/idstatus.php?cid=" + content, (err, res, body) => {
            let result = xmljs.xml2json(body, {compact: true});
            let parsedResult = JSON.parse(result);
            let cid = parsedResult.root.user.cid;
            let firstName = parsedResult.root.user.name_first._text;
            let lastName = parsedResult.root.user.name_last._text;
            let rating = parsedResult.root.user.rating._text;

            switch (rating) {
                case "Pilot/Observer":
                    rating = "OBS";
                    member.roles.add(["687483883880710146"]).catch(console.error);
                    break;
                case "Student":
                    rating = "S1";
                    member.roles.add(["686701333621112923"]).catch(console.error);
                    break;
                case "Student 2":
                    rating = "S2";
                    member.roles.add(["686701362502696982"]).catch(console.error);
                    break;
                case "Senior Student":
                    rating = "S3";
                    member.roles.add(["686701376096567349"]).catch(console.error);
                    break;
                case "Controller":
                    rating = "C1";
                    member.roles.add(["686701388163448869"]).catch(console.error);
                    break;
                case "Senior Controller":
                    rating = "C3";
                    member.roles.add(["686701399870144661"]).catch(console.error);
                    break;
                case "Instructor":
                    rating = "I1";
                    member.roles.add(["686701415334150194"]).catch(console.error);
                    break;
                case "Senior Instructor":
                    rating = "I3";
                    member.roles.add(["686701431247732843"]).catch(console.error);
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
        });
    });
};
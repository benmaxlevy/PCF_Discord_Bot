const request = require("request"),
    positionStuff = require("./allPositions");

const updatePositions = (msg,client,discord)=>{
    if(msg.channel.id === "687634150693404688") {
        let openPositions = [];
        let allPositions = [];
        let allPositionsCallsign = [];
        let i = 0;
        request("http://us.data.vatsim.net/vatsim-data.json", (err, res, body) => {
            allPositions=[];
            allPositionsCallsign=[];
            let allControllers = JSON.parse(body).controllers;;
            let position;
            let positionFrequency;


            let indexOfFreq;
            let positionName;
            let positionCallsign;

            allControllers.forEach(() => {
                position = allControllers[i].callsign;
                positionFrequency = allControllers[i].frequency;

                allPositionsCallsign.push(position);
                positionFrequency = "1".concat(positionFrequency);

                let firstHalf = positionFrequency.slice(0, 3);

                let secondHalf = positionFrequency.slice(3, 5);

                secondHalf = secondHalf.concat("0");

                firstHalf = firstHalf.concat(".");

                positionFrequency = firstHalf + secondHalf;
                allPositions.push(positionFrequency);

                if (!openPositions.includes(positionFrequency) && positionStuff.positions.includes(position)) {
                    openPositions.push(position);
                    indexOfFreq = positionStuff.positionFreqs.indexOf(positionFrequency);
                    positionName = positionStuff.positionsName[indexOfFreq];
                    positionCallsign = positionStuff.positions[indexOfFreq];
                    let idsRole = msg.guild.roles.cache.get("687668232848539670");
                    const ids4 = client.channels.cache.get("687641595197259872");
                    const cntlOn = new discord.MessageEmbed()
                        .setTitle("A Controller Has Logged On")
                        .addField("Position", positionCallsign)
                        .addField("Position Name", positionName)
                        .addField("Position Callsign", positionFrequency)
                        .setColor("#21db24");
                    ids4.send(`${idsRole}`);
                    ids4.send(cntlOn);
                }
                i++;
            });
            if(openPositions !== []) {
                for (let x = 0; x < openPositions.length; x++) {
                    if (!allPositionsCallsign.includes(openPositions[i])) {
                        let idsRole = msg.guild.roles.cache.get("687668232848539670");
                        const ids4 = client.channels.cache.get("687641595197259872");
                        const cntlOff = new discord.MessageEmbed()
                            .setTitle("A Controller Has Logged Off")
                            .addField("Position", openPositions[x])
                            .addField("Position Name", positionStuff.positionsName[positionStuff.positions.indexOf(openPositions[x])])
                            .setColor("#ff0000");
                        ids4.send(`${idsRole}`);
                        ids4.send(cntlOff);
                        openPositions.splice(0, 1);
                    }
                }
            }
        });

    } else {
        msg.reply(`That command is restricted to the ${botChannel} channel. Please refrain from using this command outside that channel.`);
    }
};

exports.update = updatePositions;
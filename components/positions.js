const request = require("request"),
    positionStuff = require("./allPositions");

let openPositions = [];

const updatePositions = (msg,client,discord)=>{
            console.log(openPositions);
            let allPositions = [];
            let allPositionsCallsign = [];
            let i = 0;
            request("http://us.data.vatsim.net/vatsim-data.json", (err, res, body) => {
                allPositions = [];
                allPositionsCallsign = [];
                let allControllers = JSON.parse(body).controllers;
                let position;
                let positionFrequency;
                let indexOfFreq;
                let positionName;
                let positionCallsign;
                let name;
                allControllers.forEach(() => {
                    position = allControllers[i].callsign;
                    positionFrequency = allControllers[i].frequency;
                    name = allControllers[i].member.name;
                    allPositionsCallsign.push(position);
                    positionFrequency = "1".concat(positionFrequency);

                    let firstHalf = positionFrequency.slice(0, 3);

                    let secondHalf = positionFrequency.slice(3, 5);

                    secondHalf = secondHalf.concat("0");

                    firstHalf = firstHalf.concat(".");

                    positionFrequency = firstHalf + secondHalf;
                    allPositions.push(positionFrequency);

                    if (!openPositions.includes(position) && positionStuff.positions.includes(position)) {
                        //console.log(position);
                        openPositions.push(position);
                        //console.log(openPositions);
                        indexOfFreq = positionStuff.positionFreqs.indexOf(positionFrequency);
                        positionName = positionStuff.positionsName[indexOfFreq];
                        positionCallsign = position;
                        let idsRole = msg.guild.roles.cache.get("689482236986261518");
                        const ids4 = client.channels.cache.get("676771395954540544");
                        const cntlOn = new discord.MessageEmbed()
                            .setTitle(name+" Has Logged On")
                            .addField("Callsign", positionCallsign)
                            .addField("Radio Name", positionName)
                            .addField("Frequency", positionFrequency)
                            .setColor("#21db24");
                        ids4.send(`${idsRole}`);
                        ids4.send(cntlOn);
                    }
                    i++;
                });
                if (openPositions !== []) {
                    for (let x = 0; x < openPositions.length; x++) {
                        if (!allPositionsCallsign.includes(openPositions[x])) {
                            let idsRole = msg.guild.roles.cache.get("689482236986261518");
                            const ids4 = client.channels.cache.get("676771395954540544");
                            const cntlOff = new discord.MessageEmbed()
                                .setTitle("A Controller Has Logged Off")
                                .addField("Callsign", openPositions[x])
                                .addField("Radio Name", positionStuff.positionsName[positionStuff.positions.indexOf(openPositions[x])])
                                .setColor("#ff0000");
                            ids4.send(`${idsRole}`);
                            ids4.send(cntlOff);
                            openPositions.splice(x, 1);
                        }
                    }
                }

            });
};

exports.update = updatePositions;
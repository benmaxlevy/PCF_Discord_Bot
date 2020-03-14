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
            let allControllers = JSON.parse(body).controllers;
            let position = allControllers[i].callsign;
            let positionFrequency = allControllers[i].frequency;

            positionFrequency = "1".concat(positionFrequency);

            let firstHalf = positionFrequency.slice(0, 3);

            let secondHalf = positionFrequency.slice(3, 5);

            secondHalf = secondHalf.concat("0");

            firstHalf = firstHalf.concat(".");

            positionFrequency = firstHalf + secondHalf;

            let indexOfFreq = positionStuff.positionFreqs.indexOf(positionFrequency);
            let positionName = positionStuff.positionsName[indexOfFreq];
            let positionCallsign = positionStuff.positions[indexOfFreq];

            allControllers.forEach(() => {

                allPositions.push(positionFrequency);
                allPositionsCallsign.push(position);

                if (!openPositions.includes(positionFrequency) && positionStuff.positions.includes(position)) {
                    openPositions.push(positionFrequency);
                }
                i++;
            });
            if(openPositions !== []) {

                for (let x = 0; x < openPositions.length; x++) {
                    if (!allPositions.includes(openPositions[0]) && !allPositionsCallsign.includes(positionCallsign)) {
                        openPositions = openPositions.splice(x, 1);
                    }
                }
            }
        });

    } else {
        msg.reply(`That command is restricted to the ${botChannel} channel. Please refrain from using this command outside that channel.`);
    }
};

exports.update = updatePositions;
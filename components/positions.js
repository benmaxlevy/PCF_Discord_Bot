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
                    openPositions.push(positionFrequency);
                    indexOfFreq = positionStuff.positionFreqs.indexOf(positionFrequency);
                    positionName = positionStuff.positionsName[indexOfFreq];
                    positionCallsign = positionStuff.positions[indexOfFreq];
                    console.log("open"+openPositions);
                    console.log(indexOfFreq+positionCallsign)
                }
                i++;
            });
            if(openPositions !== []) {
                //freqs are not with decimal/1 at front.
                for (let x = 0; x < openPositions.length; x++) {
                    //console.log(allPositions+"-all open:"+openPositions[x]);
                    if (!allPositionsCallsign.includes(positionCallsign)) {
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
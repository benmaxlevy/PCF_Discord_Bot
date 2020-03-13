const request = require("request");

const updatePositions = (msg,client,discord)=>{
    let openPosiitons = [];
    const positions = [
        "HNL_CTR",
        "HNL_SH_CTR",
        "HNL_SL_CTR",
        "HNL_WH_CTR",
        "HNL_WL_CTR",
        "HNL_EH_CTR",
        "HNL_EL_CTR",
        "HNL_APP",
        "HNL_E_APP",
        "HNL_W_APP",
        "HNL_TWR",
        "HNL_N_TWR",
        "HNL_S_TWR",
        "HNL_GND",
        "HNL_DEL",
        "OGG_S_APP",
        "OGG_N_APP",
        "OGG_TWR",
        "OGG_GND",
        "OGG_DEL",
        "ITO_APP",
        ""
    ];

    const positionsName = [

    ];
    let i = 0;
    request("http://us.data.vatsim.net/vatsim-data.json", (err,res,body)=>{
        let allControllers = JSON.parse(body).controllers;

        allControllers.forEach(()=>{
            let position = allControllers[i].frequency;
            position = "1".concat(position);
            //need to add decimal
            console.log(position);
            if(positions.includes(position) && !openPosiitons.includes(position.toUpperCase())){
                let indexOfFreq = positions.indexOf(position);
                let positionsName = positionsName[indexOfFreq];
                let positionCallsign = positions[indexOfFreq];

                openPosiitons.push(position);
            }
            i++;
        });
    });
};

exports.update = updatePositions;
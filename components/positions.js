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
        "ITO_APP",
        "ITO_TWR",
        "ITO_GND",
        "NGF_APP",
        "NGF_TWR",
        "MKK_TWR",
        "MKK_GND",
        "KOA_TWR",
        "KOA_GND",
        "KOA_DEL",
        "LIH_TWR",
        "LIH_GND",
        "JRF_TWR",
        "BSF_TWR",
        "BKH_TWR",
        "HHI_TWR",
        "HHI_GND",
        "GUM_CTR",
        "GUM_E_CTR",
        "GUM_W_CTR",
        "GUM_S_CTR",
        "GUM_APP",
        "GUM_E_APP",
        "GUM_W_APP",
        "GUM_S_APP",
        "GUM_TWR",
        "GUM_GND",
        "UAM_TWR",
        "UAM_GND",
        "SPN_TWR",
        "SPN_GND",
        "ANC_CTR",
        "ANC_03_CTR",
        "ANC_04_CTR",
        "ANC_05_CTR",
        "ANC_06_CTR",
        "ANC_07_CTR",
        "ANC_08_CTR",
        "ANC_09_CTR",
        "ANC_13_CTR",
        "ANC_14_CTR",
        "ANC_15_CTR",
        "ANC_16_CTR",
        "ANC_63_CTR",
        "ANC_68_CTR",
        "ANC_69_CTR",
        "ZAN_FSS",
        "ANC_APP",
        "ANC_NH_APP",
        "ANC_NL_APP",
        "ANC_SE_APP",
        "ANC_SW_APP",
        "ANC_TWR",
        "ANC_GND",
        "ANC_DEL",
        "FAI_APP",
        "FAI_DEP",
        "FAI_TWR",
        "FAI_GND",
        "FAI_DEL",
        "JNU_APP",
        "JNU_TWR",
        "JNU_GND",
        "ERC_APP",
        "ERC_APP",
        "EIL_TWR",
        "EIL_GND",
        "EDF_TWR",
        "EDF_GND",
        "EDF_DEL",
        "MRI_TWR",
        "MRI_GND",
        "FBK_TWR",
        "FBK_GND",
        "BET_TWR",
        "BET_GND",
        "ENA_TWR",
        "ENA_GND",
        "AKN_TWR",
        "AKN_GND",
        "ADQ_TWR",
        "ADQ_GND"
    ];

    const positionsName = [
        "H-C-F Center",
        "H-C-F Center",
        "H-C-F Center",
        "H-C-F Center",
        "H-C-F Center",
        "H-C-F Center",
        "H-C-F Approach",
        "H-C-F Approach",
        "H-C-F Approach",
        "Honolulu Tower",
        "Honolulu Tower",
        "Honolulu Tower",
        "Honolulu Ground",
        "Honolulu Clearance",
        "H-C-F Approach",
        "H-C-F Approach",
        "H-C-F Approach",
        "Maui Tower",
        "Maui Ground",
        "Maui Clearance",
        "Hilo Approach",
        "H-C-F Approach",
        "Hilo Tower",
        "Hilo Ground",
        "Kaneohe Approach",
        "Kaneohe Tower",
        "Molokai Tower",
        "Molokai Ground",
        "Kona Tower",
        "Kona Ground",
        "Kona Clearance",
        "Lihue Tower",
        "Lihue Ground",
        "Kalaeloa Tower",
        "Kalaeloa Ground",
        "Kalaeloa Clearance",
        "Bradshaw Tower",
        "Braking Sands Tower",
        "Wheeler Tower",
        "Wheeler Ground",
        "Guam Center",
        "Guam Center",
        "Guam Center",
        "Guam Approach",
        "Guam Approach",
        "Guam Approach",
        "Saipan Approach",
        "Agana Tower",
        "Agana Ground",
        "Andersen Tower",
        "Andersen Ground",
        "Saipan Tower",
        "Saipan Ground"
    ];
    let i = 0;
    request("http://us.data.vatsim.net/vatsim-data.json", (err,res,body)=>{
        let allControllers = JSON.parse(body).controllers;

        allControllers.forEach(()=>{
            let position = allControllers[i].frequency;
            position = "1".concat(position);
            let firstHalf = position.slice(0, 3);
            let secondHalf = position.slice(4, 6);
            secondHalf=secondHalf.concat("0");
            firstHalf = firstHalf.concat(".");
            position = firstHalf+secondHalf;
            console.log(position);
            //console.log(firstHalf+" "+secondHalf);
            //need to add decimal
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
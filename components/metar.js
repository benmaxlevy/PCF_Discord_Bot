const request = require("request"),
    xmljs = require("xml-js");

const metar = (msg)=>{
    if(msg.channel.id === "687634150693404688") {

        let apt = msg.content.substring(7);
        request("https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=" + apt + "&hoursBeforeNow=1", (err, res, body) => {
            let result = xmljs.xml2json(body, {compact: true});
            let parsedResult = JSON.parse(result);

            msg.reply(parsedResult.response.data.METAR.raw_text._text);
        });
    } else {
        msg.reply("That command is restricted to the #bot-commands channel. Please refrain from using this command outside that channel.");
    }
};

exports.getMetar = metar;
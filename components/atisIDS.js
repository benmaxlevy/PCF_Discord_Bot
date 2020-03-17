const request = require("request"),
    xmljs = require("xml-js");

const addAtis = (msg, client, discord)=>{
    const botChannel = client.channels.cache.get("676668634298449921");
    if(msg.channel.id === "676668634298449921") {
        const apt = msg.content.substring(12, 16);
        const code = msg.content.substring(17, 18);
        const ops = msg.content.substring(19);
        const ids4 = client.channels.cache.get("676771395954540544");
        let metar;
        let idsRole = msg.guild.roles.cache.get("689482236986261518");

        request("https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString="+apt.toUpperCase()+"&hoursBeforeNow=1", (err,res,body)=>{
            let result = xmljs.xml2json(body, {compact: true});
            let metarJSON = JSON.parse(result);
            let metar;
            if(metarJSON.response.data.METAR[0] != null){
                metar = metarJSON.response.data.METAR[0].raw_text._text;
            } else if (metarJSON.response.data.METAR != null){
                metar = metarJSON.response.data.METAR.raw_text._text;
            } else {
                msg.reply("That airport is invalid.");
            }
            const atisEmbed = new discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle(apt.toUpperCase()+" ATIS")
                .setThumbnail("https://cdn.discordapp.com/attachments/676662857831546880/687478153714860117/PCF_transparent.png")
                .addField("Station ID", apt.toUpperCase())
                .addField("Current Information", code.toUpperCase())
                .addField("Runway Operations", ops.toUpperCase())
                .addField("Raw Metar", metar)
                .addField("Disclosure", `This ATIS may not be up-to-date. These ATISs are controlled by the ".updateatis" command in the ${botChannel}.`);
            ids4.send(`${idsRole}`);
            ids4.send(atisEmbed);
        });
    } else {
        msg.reply(`That command is restricted to the ${botChannel} channel. Please refrain from using this command outside that channel.`);
    }
};

exports.addAtis=addAtis;


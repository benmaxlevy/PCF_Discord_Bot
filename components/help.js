const help = (msg, discord, client)=>{
    const botChannel = client.channels.cache.get("687634150693404688");
    if(msg.channel.id === "687634150693404688") {
        const helpEmbed = new discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("PCF Bot Help")
            .setThumbnail("https://cdn.discordapp.com/attachments/676662857831546880/687478153714860117/PCF_transparent.png")
            .addField("Controller Setup", ".newcontroller [CID] [Home/Visitor/LOA/Guest]")
            .addField("ATIS Commands - Add ATIS", ".addAtis [Airport (ICAO)] [Current Info] [Runway Ops]")
            .addField("ATIS Commands - Modify ATIS",".modifyAtis [Airport (ICAO)] [Current Info] [Runway Ops]")
            .addField("ATIS Commands - Remove ATIS",".removeAtis [Airport (ICAO)]")
            .addField("Role Updater (Administrator ONLY)", ".startRoleUpdater");
        msg.reply(helpEmbed)
    } else {
        msg.reply(`That command is restricted to the ${botChannel} channel. Please refrain from using this command outside that channel.`);
    }
};

exports.help = help;
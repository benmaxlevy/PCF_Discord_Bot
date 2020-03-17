const wallop = (msg, client, discord) => {
    const botChannel = client.channels.cache.get("676668634298449921");
    const reportChannel = client.channels.cache.get("689482641413636127");
    if(msg.channel.id === "676668634298449921") {
        if(msg.mentions.members.first()){
            let reportedId = msg.mentions.members.first().id;
            let reported = msg.mentions.members.first();
            let reason = msg.content.replace(`<@!${reportedId}>`, "");
            reason = reason.replace(".wallop","");
            reason = reason.substring(2);
            const report = new discord.MessageEmbed()
                .setTitle("New Report!")
                .setColor("#0099ff")
                .setThumbnail("https://cdn.discordapp.com/attachments/676662857831546880/687478153714860117/PCF_transparent.png")
                .addField("Reported By", `${msg.member}`)
                .addField("Reported Person", `${reported}`)
                .addField("Reason for Report", `${reason}`);
            reportChannel.send(report);
            msg.reply("Thank you for the report. We will look into it and notify you of any progress.");
            msg.delete();
        } else {
            msg.reply("Doesn't look like you reported anyone! Just mention them, along with your report!");
        }
    } else {
        msg.reply(`That command is restricted to the ${botChannel} channel. Please refrain from using this command outside that channel.`);
    }
};

exports.wallop = wallop;
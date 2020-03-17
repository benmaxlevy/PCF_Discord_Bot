const addAtis = (msg, client, discord)=>{
    const botChannel = client.channels.cache.get("676668634298449921");
    if(msg.channel.id === "676668634298449921") {
        const apt = msg.content.substring(9, 13);
        const code = msg.content.substring(14, 15);
        const ops = msg.content.substring(16);
        const ids4 = client.channels.cache.get("676771395954540544");
        let idsRole = msg.guild.roles.cache.get("687668232848539670");
        const atisEmbed = new discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle(apt.toUpperCase()+" ATIS")
            .setThumbnail("https://cdn.discordapp.com/attachments/676662857831546880/687478153714860117/PCF_transparent.png")
            .addField("Station ID", apt.toUpperCase())
            .addField("Current Information", code.toUpperCase())
            .addField("Runway Operations", ops.toUpperCase())
            .addField("Disclosure", `This ATIS may not be up-to-date. These ATISs are controlled by the ".addAtis", ".modifyAtis", and the ".removeAtis" command in the ${botChannel}.`);
        ids4.send(`${idsRole}`);
        ids4.send(atisEmbed);
    } else {
        msg.reply(`That command is restricted to the ${botChannel} channel. Please refrain from using this command outside that channel.`);
    }
};

const removeAtis = (msg, client, discord)=>{
    const botChannel = client.channels.cache.get("687634150693404688");
    if(msg.channel.id === "687634150693404688") {
        let idsRole = msg.guild.roles.cache.get("687668232848539670");
        const apt = msg.content.substring(12, 16);
        const ids4 = client.channels.cache.get("687641595197259872");
        ids4.send(`Aloha, ${idsRole}! The ATIS at ` + apt + ` has now been removed.`);
    } else {
        msg.reply(`That command is restricted to the ${botChannel} channel. Please refrain from using this command outside that channel.`);
    }
};

exports.addAtis=addAtis;

exports.removeAtis=removeAtis;
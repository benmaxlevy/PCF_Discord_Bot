const addAtis = (msg, client)=>{
    if(msg.channel.id === "687634150693404688") {
        const apt = msg.content.substring(9, 13);
        const code = msg.content.substring(14, 15);
        const ops = msg.content.substring(16);
        const ids4 = client.channels.cache.get("687641595197259872");
        let idsRole = msg.guild.roles.cache.get("687668232848539670");
        ids4.send(`Aloha, ${idsRole}! The current ATIS at ` + apt + ` is now ` + code + `. The current OPS are ` + ops);
    } else {
        msg.reply("That command is restricted to the #bot-commands channel. Please refrain from using this command outside that channel.");
    }
};

const modifyAtis = (msg, client)=>{
    if(msg.channel.id === "687634150693404688") {
        const apt = msg.content.substring(12, 16);
        const code = msg.content.substring(17, 18);
        const ops = msg.content.substring(19);
        const ids4 = client.channels.cache.get("687641595197259872");
        let idsRole = msg.guild.roles.cache.get("687668232848539670");
        ids4.send(`Aloha, ${idsRole}! The current ATIS at ` + apt + ` is now ` + code + `. The current OPS are ` + ops);
    } else {
        msg.reply("That command is restricted to the #bot-commands channel. Please refrain from using this command outside that channel.");
    }
};

const removeAtis = (msg, client)=>{
    if(msg.channel.id === "687634150693404688") {
        let idsRole = msg.guild.roles.cache.get("687668232848539670");
        const apt = msg.content.substring(12, 16);
        const ids4 = client.channels.cache.get("687641595197259872");
        ids4.send(`Aloha, ${idsRole}! The ATIS at ` + apt + ` has now been removed.`);
    } else {
        msg.reply("That command is restricted to the #bot-commands channel. Please refrain from using this command outside that channel.");
    }
};

exports.addAtis=addAtis;
exports.modifyAtis=modifyAtis;
exports.removeAtis=removeAtis;
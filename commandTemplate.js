module.exports = {
    name: "name",
    aliases: [], //must include
    cooldown: 0,
    guildOnly: false,
    disabled: false,
    botOwnerOnly: false,
    guildOwnerOnly: false,
    nsfwOnly: false,
    permissions: [], //must include
    run: async (client, message, args) => {
        
    }
}

module.exports.help = {
    usage: "[prefix]name",
    description: "Does stuff."
}
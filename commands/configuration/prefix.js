
const Fs = require("fs")

module.exports = {
    name: 'prefix',
    aliases: [ 'pr' ], //must include
    guildOnly: true,
    cooldown: 20,
    permissions: [ 'MANAGE_GUILD' ], //must include
    run: async (client, message, args) => {
        const prefix = args.join(' ')

        if (!prefix) return client.utils.timedEmbed(message, 'Task Failed', '❌ No prefix provided.', '#36393f')
        let prefixes = JSON.parse(Fs.readFileSync('./storage/prefixes.json', 'utf8'))

        prefixes[message.guild.id] = prefix

        Fs.writeFile('./storage/prefixes.json', JSON.stringify(prefixes), err => {
            if (err)
                throw err
        })

        return client.utils.timedEmbed(message, 'Task Successful', '✅ Succesfully set new prefix.', '#36393f')
    }
}

module.exports.help = {
    usage: '[prefix]prefix <prefix>',
    description: 'Allows you to set the prefix on the server.'
}
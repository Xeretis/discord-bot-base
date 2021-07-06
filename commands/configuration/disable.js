const Fs = require('fs')

module.exports = {
    name: 'disable',
    aliases: [], //must include
    guildOnly: true,
    permissions: [ 'ADMINISTRATOR' ], //must include
    run: async (client, message, args) => {
        const command = args.join(' ').toLowerCase()

        if (!command)
            return client.utils.timedEmbed(message, 'Task Failed', '❌ No command provided.', '#36393f')

        var cmd = null

        if(client.all.has(command))
            cmd = client.all.get(command)

        if (!cmd) return client.utils.timedEmbed(message, 'Task Failed', '❌ Couldn\'t find that command.', '#36393f')

        var disables = JSON.parse(Fs.readFileSync('./storage/disables.json', 'utf8'))

        if (cmd.name == 'disable') return client.utils.timedEmbed(message, 'Task Failed', '❌ Nice one but that ain\'t gonna work.', '#36393f')

        if(disables[message.guild.id] && disables[message.guild.id].includes(cmd.name))
            client.utils.remove(disables[message.guild.id], cmd.name)
        else if (!disables[message.guild.id])
            disables[message.guild.id] = [cmd.name]
        else
            disables[message.guild.id].push(cmd.name)

        Fs.writeFile('./storage/disables.json', JSON.stringify(disables), err => {
            if (err)
                throw err
        })

        return client.utils.timedEmbed(message, 'Task Succesful', '✅ Succesfully toggled command status (whether it\'s disabled or not).', '#36393f')
    }
}

module.exports.help = {
    usage: '[prefix]disable <command>',
    description: 'Allows you to toggle whether a command is disabled or not.'
}
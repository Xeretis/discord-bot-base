const Discord = require('discord.js')
const Fs = require('fs')
const {
    default: didYouMean,
    ReturnTypeEnums
} = require('didyoumean2')

const cooldowns = new Discord.Collection()

module.exports = async message => {
    if (message.author.bot)
        return

    const args = message.content.slice(message.client.config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    const prefixes = JSON.parse(Fs.readFileSync('./storage/prefixes.json', 'utf8'))

    if(!message.content.startsWith(prefixes[message.guild.id] ? prefixes[message.guild.id] : message.client.config.prefix))
        return

    let cmd = null

    if (message.client.all.has(command))
        cmd = message.client.all.get(command)
    else {
        const matching = didYouMean(command, Array.from(message.client.all.keys()), { returnType: ReturnTypeEnums.ALL_SORTED_MATCHES })

        if (matching.length != 0) {
            const result = matching.join('/')
            return message.client.utils.timedEmbed(message, 'Task Failed', `❌ Couldn't find command. Did you mean \`${result}\`?`, '#36393f')
        } else
            return message.client.utils.timedEmbed(message, 'Task Failed', '❌ Couldn\'t find command.', '#36393f')
    }

    //* guildOnly

    if (cmd.guildOnly && !message.guild) return message.client.utils.timedEmbed(message, 'Task Failed', '❌ This command is guild only.', '#36393f')

    //* disabled

    const disables = JSON.parse(Fs.readFileSync('./storage/disables.json', 'utf8'))
    if (cmd.disabled || (disables[message.guild.id] && disables[message.guild.id].includes(cmd.name))) return message.client.utils.timedEmbed(message, 'Task Failed', '❌ This command is disabled.', '#36393f')

    //* botOwnerOnly

    if (cmd.botOwnerOnly && !message.client.config.owners.includes(message.author.id)) return message.client.utils.timedEmbed(message, 'Task Failed', '❌ This command is (bot)owner only.', '#36393f')

    //* guildOwnerOnly

    if (cmd.guildOwnerOnly && !(message.guild.ownerID === message.author.id || message.client.config.owners.includes(message.author.id))) return message.client.utils.timedEmbed(message, 'Task Failed', '❌ This command is (guild)owner only.', '#36393f')

    //* nsfwOnly

    if (cmd.nsfwOnly && !message.channel.nsfw) return message.client.utils.timedEmbed(message, 'Task Failed', '❌ This command is nsfw only.', '#36393f')

    //* permissions

    if (cmd.permissions.lenght != 0 && !(message.client.config.owners.includes(message.author.id) || message.member.permissions.has(cmd.permissions))) return message.client.utils.timedEmbed(message, 'Task Failed', `❌ You need \`${cmd.permissions.join(', ')}\` permission(s) to run this command.`, '#36393f')

    //* cooldown

    if (cmd.cooldown) {
        if (!cooldowns.has(cmd.name))
            cooldowns.set(cmd.name, new Discord.Collection())

        const now = Date.now()
        const timestamps = cooldowns.get(cmd.name)
        const cooldownAmount = cmd.cooldown * 1000

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000
                return message.client.utils.timedEmbed(message, 'Task Failed', `❌ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd.name}\` command.`, '#36393f')
            }
        }

        cmd.run(message.client, message, args)

        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
    } else
        cmd.run(message.client, message, args)

}
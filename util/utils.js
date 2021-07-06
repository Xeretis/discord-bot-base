const Discord = require('discord.js')

module.exports = {
    timedEmbed: function (message, title, description, color) {
        const embed = new Discord.MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setFooter('This message gets deleted in 30 seconds.')
            .setTimestamp()

            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 30000 })
            })
    },
    remove: function (arr) {
        var what, a = arguments, L = a.length, ax
        while (L > 1 && arr.length) {
            what = a[--L]
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1)
            }
        }
        return arr
    }
}
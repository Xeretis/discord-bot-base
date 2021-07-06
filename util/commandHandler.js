const Discord = require('discord.js')
const Fs = require('fs')
const Path = require('path')

const commands = new Discord.Collection()
const aliases = new Discord.Collection()

for (let group of Fs.readdirSync('./commands/').filter(file => Fs.statSync(Path.join('./commands/', file)).isDirectory())) {
    console.log(`[Loading group]: ${group}`)
    for (let file of Fs.readdirSync(Path.resolve(`./commands/${group}`)).filter(file => !Fs.statSync(Path.resolve('./commands/', group, file)).isDirectory()).filter(file => file.endsWith('.js'))) {
        console.log(`[Loading command]: ${file}`)
        file = require(`../commands/${group}/${file}`)
        file.group = group
        commands.set(file.name, file)
        for (let alias of file.aliases)
            aliases.set(alias, file)
    }
}

module.exports = client => {
    client.commands = commands
    client.aliases = aliases
    client.all = commands.concat(aliases)
}
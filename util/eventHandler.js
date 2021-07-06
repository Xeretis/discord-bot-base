const Fs = require('fs')
const Path = require('path')

module.exports = client => {
    for (let file of Fs.readdirSync("./events/").filter(file => !Fs.statSync(Path.resolve(`./events/${file}`)).isDirectory()).filter(file => file.endsWith('.js'))) {
        let event = file.replace(/\.js$/i, '')
        console.log(`[Loading event]: ${event}`)
        if (event === 'ready') 
            client.on(event, () => require(`../events/${event}`)(client))
        else client.on(event, require(`../events/${event}`))
    }
}
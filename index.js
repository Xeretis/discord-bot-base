const Discord = require('discord.js')

const client = new Discord.Client()

client.config = require('./storage/config.json')
client.utils = require('./util/utils.js')

require('./util/commandHandler.js')(client)
require('./util/eventHandler.js')(client)

client.login(client.config.token)
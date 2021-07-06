module.exports = {
    name: 'eval',
    aliases: [],
    botOwnerOnly: true,
    permissions: [],
    run: async (client, message, args) => {
        if(!args[0])
            return client.utils.timedEmbed(message, 'Task Failed', '❌ Nothing to evaluate.', '#36393f')

        const code = args.join(" ")

		try {
			var result = eval(code)
			return client.utils.timedEmbed(message, 'Task successful', `✅ - ${result}`, '#36393f')
		} catch(err) {
			return client.utils.timedEmbed(message, 'Task Failed', `❌ ${err}`, '#36393f')
		}
    }
}

module.exports.help = {
    usage: '[prefix]eval <code>',
    description: 'Evaluates the given code.'
}
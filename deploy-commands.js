const { REST, Routes } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config()
token=process.env.DISCORD_TOKEN
clientId=process.env.CLIENT_ID
guildId=process.env.GUILD_ID


const commands = [];

// These comments are if the organization changes to be commands in subfolders.
// // Grab all the command files from the commands directory you created earlier
// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
    // const commandsPath = path.join(foldersPath, folder);
	// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab all the command files from the commands directory you created earlier

	
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		console.log(command)
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
			console.log(commands+'first time')
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

	console.log(commands+'second time')

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);
// and deploy your commands!

// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

// rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1171172488621871186'))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);
// 	rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1171172488621871187'))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);

// 	rest.delete(Routes.applicationCommand(clientId, '1171172488621871186'))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);
// 	rest.delete(Routes.applicationCommand(clientId, '1171172488621871187'))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in all guilds with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dmroll')
		.setDescription('Rolls your desired dice, but only shows you!'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply({content: `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`, ephemeral: true});
	},
};
const { SlashCommandBuilder } = require('discord.js');
const { diceRoller } = require('../utils/diceRoller');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls your desired dice!')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('The dice that you want to roll')),

	async execute(interaction) {
        const options = interaction.options.getString('option')
        if (!option) {
            return diceRoller(20)
        }
        const diceList=options.split('+')
        rolls[]

for (let i = 0; i<diceList.length;i++) {
    if (parseInt(diceList[i])!==NaN ) {
rolls[i] = diceList[i]
    }
    else {
        currentDieType = diceList[i].toUpperCase.split('D')

    }
}
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};
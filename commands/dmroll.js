const { SlashCommandBuilder } = require('discord.js');
let { diceRoller } = require('../utils/diceRoller');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls your desired dice, secretly!')
        .addStringOption(option =>
            option.setName('input') 
            .setDescription('The dice that you want to roll')),

	async execute(interaction) {
        const options = interaction.options.getString('input') ?? '1d20';
        console.log(options)
        if (!options) {
            sum = diceRoller(20)
        }

        const diceList=options.split('+')
       const rolls = []
       console.log(diceList)
for (let i = 0; i<diceList.length;i++) {
    console.log(rolls) 
  
    if (diceList[i].toUpperCase().split('D').length===1)  {
        console.log(" this is "+ i + "times and I'm a number")
rolls[i] = parseInt(diceList[i])
    }
    else {
        console.log(" this is "+ i + "times and I'm a dice")
        currentDieType = diceList[i].toUpperCase().split('D')
for (j=0;j<currentDieType[0];j++) {
    if (!rolls[i]) {
        rolls[i]=diceRoller(parseInt(currentDieType[1]))
    }
    else {rolls[i]=rolls[i]+diceRoller(parseInt(currentDieType[1]))
}
    }
}
rollSum=rolls.reduce((partialSum,a)=> partialSum+a,0)}
let replyString = ''
console.log(rolls)
for (let k=0;k<rolls.length;k++){
    
    if (k==0){
        console.log(k)
        console.log(rolls[k])
        replyString=replyString+(rolls[k].toString())
        console.log(replyString+'first pass')
    }
    else {
        console.log(k)
        console.log(rolls[k])
        replyString=replyString+'+'+(rolls[k].toString())
        console.log(replyString+"subsequent passes")
    }
}
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Rolled ${options}. ${replyString} = ${rollSum} `);
            
	},
};
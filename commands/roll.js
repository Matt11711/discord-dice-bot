const { SlashCommandBuilder } = require('discord.js');
let { diceRoller } = require('../utils/diceRoller');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls your desired dice, of course!')
        .addStringOption(option =>
            option.setName('input') 
            .setDescription('The dice that you want to roll')),

	async execute(interaction) {
        const options = interaction.options.getString('input') ?? '1d20';
        // console.log(options)
        if (!options) {
            sum = diceRoller(20)
        }

        const diceList=options.split('+')
       const rolls = []
       let sums= []
       let currentDice
       
for (let i = 0; i<diceList.length;i++) {
    // console.log(rolls) 
  
    if (diceList[i].toUpperCase().split('D').length===1)  {
        
rolls[i] = [parseInt(diceList[i])]
sums[i]= parseInt(diceList[i])
    }
    else {
        
        currentDieType = diceList[i].toUpperCase().split('D')
    
        if (currentDieType.length===3) {
           
            if (currentDieType[2][0]==='L') {
                currentDieType[2]= currentDieType[2].substring(1)

                let sumArray = []
                for (let j=0;j<currentDieType[0];j++){
                    sumArray[j]= diceRoller(parseInt(currentDieType[1]))
                }
                
                sumArray.sort(function(a, b){return a - b});
                sumArrayCopy = JSON.parse(JSON.stringify(sumArray));
                rolls[i]=sumArrayCopy
                // console.log(sums)
                for (let j=0;j<currentDieType[2];j++) {
                    sumArray.shift()
                }
                
                // console.log(sums+' sums array')
                sums[i]=sumArray.reduce((partialSum,a)=> partialSum+a,0)
                // console.log(rolls+' rolls array')
                // console.log(i)
            }
            else if (currentDieType[2][0]==='H') {
                currentDieType[2]= currentDieType[2].substring(1)

                let sumArray = []
                for (let j=0;j<currentDieType[0];j++){
                    sumArray[j]= diceRoller(parseInt(currentDieType[1]))
                }
                sumArray.sort(function(a, b){return b - a});
                for (let j=0;j<currentDieType[2];j++) {
                    sumArray.shift()
                }
                sums[i]=sumArray
                rolls[i]=sumArray.reduce((partialSum,a)=> partialSum+a,0)
                
            }
        }
        else {
        // console.log(i)
        // console.log(sums)
        // console.log(rolls)
         currentDice = []
for (j=0;j<currentDieType[0];j++) {
    //  console.log(rolls[i])
//     if (!rolls[i]) {
//         rolls[i]=diceRoller(parseInt(currentDieType[1]))
//     }
//     else {rolls[i]=rolls[i]+diceRoller(parseInt(currentDieType[1]))
// }

currentDice.push(diceRoller(parseInt(currentDieType[1])))
// console.log(currentDice)
rolls[i]=currentDice
sums[i]= currentDice.reduce((partialSum,a)=> partialSum+a,0)
    }
}}}
// console.log(rolls)
// console.log(sums)
rollSum=sums.reduce((partialSum,a)=> partialSum+a,0)
let replyString = ''
for (let i=0;i<rolls.length;i++) {
    replyString+='('
    for (let j=0;j<rolls[i].length;j++) {
        if (j===(rolls[i].length-1)) {
            // console.log(rolls[3][0])
            replyString+=((rolls[i][j]).toString())+')'
        }

else {
    replyString+=((rolls[i][j]).toString())+'+'
}
    }
    if (i<(rolls.length-1)){
        replyString+='+'
    }
}
// for (let k=0;k<rolls.length;k++){
    
//     if (k==0){
       
//         replyString=replyString+(rolls[k].toString())
        
//     }
//     else {
       
//         replyString=replyString+'+'+(rolls[k].toString())
       
//     }
// }
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Rolled ${options}. ${replyString} = ${rollSum} `);
        // await interaction.reply(` ${rollSum} `);
            
	},
};
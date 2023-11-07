 function diceRoller(sides) {
    result = Math.floor(Math.random()*parseInt(sides))
    if (result===0) {
        result=sides
    }
    return result
}

module.exports = {diceRoller}
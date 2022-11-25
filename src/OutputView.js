const { Console } = require('@woowacourse/mission-utils');
const MESSAGE = require('./Message');
const OutputView = {

    printThreeStrike() {
        Console.print(MESSAGE.gameMessage.successEnd);
    },
    
    printRestart() {
       return Console.print(MESSAGE.gameMessage.gameRestart);
    },
    
    printEnd() {
        return Console.print(MESSAGE.gameMessage.gameEnd);
    },
}
module.exports = OutputView;
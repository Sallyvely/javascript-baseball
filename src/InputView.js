const { Console } = require('@woowacourse/mission-utils');
const MESSAGE = require('./Message');
const Vaildate = require('./Vaildate');
const InputView = {

    InputUserNumber(){
        let userInput = 0;
        Console.readLine(MESSAGE.gameMessage.Input, (userNum) => {
            if(Vaildate.checkUserNumVaildation(userNum)) userInput = userNum;
        })
        return userInput;
    },

    InputRestartNumber(){
        let restartNum;
        Console.readLine(MESSAGE.gameMessage.restartMessage, (userNum) => {
            if(Vaildate.checkRestartNum(userNum)) restartNum = userNum;
        })
        return restartNum;
    }
}
module.exports = InputView;
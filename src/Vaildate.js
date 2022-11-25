const MESSAGE = require('./Message');
const Vaildate = {

    checkUserNumLength(userInputNum){
        if(userInputNum.length == MESSAGE.number.gameNumLength){
          return true;
        }
        return false;
      },
    
      /*유저가 입력한 수가 숫자가 맞는지 확인하는 기능*/
      checkUserNumIsNum(userInputNum){
        if(userInputNum > 99 && userInputNum < 1000){
          return true;
        }
        return false;
      },
      
      checkRestartNum(userInputNum) {
        if(userInputNum == MESSAGE.number.restartNumber || userInputNum == MESSAGE.number.endNumber){
          return true;
        }
      },
    
      /*유저가 입력한 수가 서로 다른 수 인지 확인하는 기능*/
      checkUserNumIsDifferent(userInputNum){
        if(userInputNum.charAt(0) == (userInputNum.charAt(1))){
          return false;
        }
        if(userInputNum.charAt(0) == (userInputNum.charAt(2))){
          return false;
        }
        if(userInputNum.charAt(1) == (userInputNum.charAt(2))){
          return false;
        }
        return true;
      },
    
      /*입력 수가 유효한지 확인하는 기능*/
      checkUserNumVaildation(userInputNum){
        if(!this.checkUserNumLength(userInputNum) || !this.checkUserNumIsNum(userInputNum) || !this.checkUserNumIsDifferent(userInputNum) ){
          throw MESSAGE.gameMessage.INPUT_ERROR;
        }
        return true;
      },

}
module.exports = Vaildate;
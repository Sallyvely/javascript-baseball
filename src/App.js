const MissionUtils = require("@woowacourse/mission-utils");
const MESSAGE = require('./Message');
const ERROR_MESSAGE = require('./Message');
const GAME = require('./Message');
class App {
  play() {    
    let computerRandomNum = this.createRandomNumber();
    let userInputNum = this.InputUserNumber();

    if(this.checkUserNumVaildation(userInputNum)){
      MissionUtils.Console.print(this.calResult(computerRandomNum, userInputNum));
    }
    
    while(!this.checkThreeStrike(computerRandomNum, userInputNum) && this.checkUserNumVaildation(userInputNum)){     
      userInputNum = this.InputUserNumber();  
    }}

  createRandomNumber() {
    let computerNumber = "";
    let count = 0;
    while(count < MESSAGE.number.gameNumLength){
      let charNum = MissionUtils.Random.pickNumberInRange(1, 9);
      if(!computerNumber.includes(String(charNum))){
        computerNumber += String(charNum);
        count++;
      }}
      return computerNumber;
    }

    InputUserNumber(){
      let userInput = 0;
      MissionUtils.Console.readLine(MESSAGE.gameMessage.Input, (userNum) => {
        userInput = userNum;
      })
        return userInput;
    }

    strike(computerRandomNum, userInputNum){
      let strikeScore = 0;
      for(let index = 0; index < MESSAGE.number.gameNumLength; index++){
        if(String(computerRandomNum).charAt(index) === String(userInputNum).charAt(index)){
          strikeScore += 1;  
        }
      }  
      return strikeScore;
    }

    /*볼인지 점수 계산하는 기능*/
    ball(computerRandomNum, userInputNum){
      let ballScore = 0;
      for(let index = 0; index < MESSAGE.number.gameNumLength; index++){
        if((computerRandomNum).includes(String(userInputNum).charAt(index)) && !(String(computerRandomNum).charAt(index) === String(userInputNum).charAt(index))){
          ballScore += 1;
        }
      }
      return ballScore;
    }
        /*볼과 스트라이크 점수 계산하는 기능*/
  calResult(computerRandomNum, userInputNum){
    let answer = "";
    const score=this.saveScore(computerRandomNum, userInputNum);
    if(score[0] == 0 && score[1] == 0){
      answer = MESSAGE.score.nothing;
    }
    if(score[0] == 0 && score[1] >0){
      answer = score[1] + MESSAGE.score.ball;
    }
    if(score[0] > 0 && score[1] == 0 && !score[0] == MESSAGE.number.gameNumLength){
      answer = score[0] + MESSAGE.score.strike;
    }
    if(score[0] > 0 && score[1] > 0){
      answer = score[1] + MESSAGE.score.ball + MESSAGE.score.space + score[0] + MESSAGE.score.strike;
    }
    return answer;
  }
  saveScore(computerRandomNum, userInputNum) {
    let score = [];
    score.push(this.strike(computerRandomNum, userInputNum));
    score.push(this.ball(computerRandomNum, userInputNum));
    return score;
  }
    /*3스트라이크 인지 확인하는 기능*/
  checkThreeStrike(computerRandomNum, userInputNum){
    if(this.strike(computerRandomNum, userInputNum) == MESSAGE.number.gameNumLength){
      this.printThreeStrike();
      this.selectGameEnd(userInputNum);
      return true;
      }
      return false;
    }

  printThreeStrike() {
    MissionUtils.Console.print(MESSAGE.score.threeStrike);
    MissionUtils.Console.print(MESSAGE.gameMessage.successEnd);
  }

  /*유저가 입력한 수의 길이가 유효한지 확인하는 기능*/
  checkUserNumLength(userInputNum){
    if(userInputNum === '1' || userInputNum === '2'){
      return true;
    }
    if(userInputNum.length == MESSAGE.number.gameNumLength){
      return true;
    }
    return false;
  }

  /*유저가 입력한 수가 숫자가 맞는지 확인하는 기능*/
  checkUserNumIsNum(userInputNum){
    if(userInputNum === '1' || userInputNum === '2'){
      return true;
    }
    if(userInputNum > 99 && userInputNum < 1000){
      return true;
    }
    return false;
  }
  
  /*유저가 입력한 수가 서로 다른 수 인지 확인하는 기능*/
  checkUserNumIsDifferent(userInputNum){
    if(userInputNum == MESSAGE.number.restartNumber || userInputNum == MESSAGE.number.endNumber){
      return true;
    }
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
  }

  /*입력 수가 유효한지 확인하는 기능*/
  checkUserNumVaildation(userInputNum){
    if(!this.checkUserNumLength(userInputNum)){
      throw MESSAGE.gameMessage.INPUT_ERROR;
    }
    if(!this.checkUserNumIsNum(userInputNum)){
      throw MESSAGE.gameMessage.INPUT_ERROR;
    }
    if(!this.checkUserNumIsDifferent(userInputNum)){
      throw MESSAGE.gameMessage.INPUT_ERROR;
    }
    return true;
  }

  /*게임 종료 여부 선택하는 기능*/
  selectGameEnd(userInputNum){
    userInputNum = this.InputUserNumber();
    if(userInputNum == MESSAGE.number.restartNumber){
      MissionUtils.Console.print(MESSAGE.gameMessage.gameRestart);
      this.play();
      }
    else if(userInputNum == MESSAGE.number.endNumber){
      MissionUtils.Console.print(MESSAGE.gameMessage.gameEnd);
      MissionUtils.Console.close();
    }
    else{
      throw MESSAGE.gameMessage.INPUT_ERROR;
    }
  }
}
module.exports = App;

const MissionUtils = require("@woowacourse/mission-utils");
const MESSAGE = require('./Message');
const OutputView = require('./OutputView');
const InputView = require('./InputView');
class App {
  play() {    
    let computerRandomNum = this.createRandomNumber();
    let userInputNum = InputView.InputUserNumber();
    MissionUtils.Console.print(this.calResult(computerRandomNum, userInputNum));
    
    while(!this.checkThreeStrike(computerRandomNum, userInputNum)){     
      userInputNum = InputView.InputUserNumber();
      MissionUtils.Console.print(this.calResult(computerRandomNum, userInputNum));  
    }
  }

  gameStart() {

  } 

  createRandomNumber() {
    let computerNumber = "";
    let count = 0;
    while(count < MESSAGE.number.gameNumLength){
      const charNum = MissionUtils.Random.pickNumberInRange(1, 9);
      if(!computerNumber.includes(String(charNum))){
        computerNumber += String(charNum);
        count++;
      }}
    return computerNumber;
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
    const score=this.saveScore(computerRandomNum, userInputNum);
    if(score[0] == 0 && score[1] == 0) return MESSAGE.score.nothing;
  
    if(score[0] == 0 && score[1] >0) return score[1] + MESSAGE.score.ball;
    
    if(score[0] > 0 && score[1] == 0) return score[0] + MESSAGE.score.strike;
    
    if(score[0] > 0 && score[1] > 0) return score[1] + MESSAGE.score.ball + MESSAGE.score.space + score[0] + MESSAGE.score.strike;
    
  }
  
  saveScore(computerRandomNum, userInputNum) {
    let score = [];
    score.push(this.strike(computerRandomNum, userInputNum));
    score.push(this.ball(computerRandomNum, userInputNum));
    return score;
  }

  checkThreeStrike(computerRandomNum, userInputNum){
    if(this.strike(computerRandomNum, userInputNum) == MESSAGE.number.gameNumLength){
      OutputView.printThreeStrike();
      this.selectGameEnd();
      return true;
    }
    return false;
  }

  /*게임 종료 여부 선택하는 기능*/
  selectGameEnd(){
    if(InputView.InputRestartNumber() == MESSAGE.number.restartNumber){
      this.gameRestart();
    }
    return this.gameEnd();
  }

  gameRestart() {
    OutputView.printRestart();
    this.play();
  }
  
  gameEnd() {
    OutputView.printEnd();
    MissionUtils.Console.close();
  }
}
module.exports = App;

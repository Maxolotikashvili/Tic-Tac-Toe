import { Component, OnInit } from '@angular/core';

interface gridArrayType {
  id: string,
  value: string,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tic-Tac-Toe';
  gridArray: gridArrayType[] = [];
  choiceList: gridArrayType[] = [];
  idList: string[] = 'ABCDEFGHI'.split('');
  clickCount: number = 0;

  shapeXColor: { color: string } = {
    color: 'green'
  }

  shapeOColor: { color: string } = {
    color: 'blue'
  }

  player1Name: string = '';
  player2Name: string = '';

  gameIsStarted: boolean = false;
  gameHasEnded: boolean = false;

  player1IsWinner: boolean = false;
  player2IsWinner: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.fillGridArray();
  }

  fillGridArray() {
    for (let x = 0; x < 9; x++) {
      this.gridArray.push({ id: this.idList[x], value: '' });
    }
  }

  handlePlayerChoice(item: gridArrayType) {
    if (!this.gameHasEnded) {
      let playerChoice: gridArrayType = this.gridArray.find((element: gridArrayType) => element.id === item.id)!;

      if (
        this.clickCount % 2 !== 1 &&
        this.clickCount <= 9 &&
        this.gridArray[this.gridArray.indexOf(item)].value === ''
      ) {
        this.clickCount++;
        this.gridArray[this.gridArray.indexOf(playerChoice)].value = 'X';
        this.checkWinner(playerChoice);
      } else if (
        this.clickCount % 2 == 1 &&
        this.clickCount <= 9 &&
        this.gridArray[this.gridArray.indexOf(item)].value === ''
      ) {
        this.clickCount++;
        this.gridArray[this.gridArray.indexOf(playerChoice)].value = 'O';
        this.checkWinner(playerChoice);
      }
    }
  }

  checkWinner(playerChoice: gridArrayType) {
    this.choiceList.push(playerChoice);
    let player1: gridArrayType[] = this.choiceList.filter((item: any, index: number) => index % 2 !== 1);
    let player2: gridArrayType[] = this.choiceList.filter((item: any, index: number) => index % 2 === 1);
    let winningCombination = ['ABC', 'DEF', 'GHI', 'ADG', 'BEH', 'CFI', 'AEI', 'CEG'];

    let player1Sum: string = '';
    let player2Sum: string = '';

    player1.forEach((element: gridArrayType) => {
      player1Sum += element.id;
    });

    player2.forEach((element: gridArrayType) => {
      player2Sum += element.id;
    });

    winningCombination.forEach((element: string) => {
      if (
        player1Sum.includes(element[0]) &&
        player1Sum.includes(element[1]) &&
        player1Sum.includes(element[2]) &&
        player1Sum.length >= 3
      ) {
        this.player1IsWinner = true;
        this.gameHasEnded = true;
      } else if (
        player2Sum.includes(element[0]) &&
        player2Sum.includes(element[1]) &&
        player2Sum.includes(element[2]) &&
        player2Sum.length >= 3
      ) {
        this.player2IsWinner = true;
        this.gameHasEnded = true;
      } else if (player1Sum.length === 5 && player2Sum.length === 4) {
        this.gameHasEnded = true;
      }
    });
  }

  restartGame(restartMode: string) {
    if (restartMode === 'restart') {
      for (let item of this.gridArray) {
        item.value = '';
      }
      this.choiceList.splice(0, this.choiceList.length);
      
      this.gameHasEnded = false;
      this.player1IsWinner = false;
      this.player2IsWinner = false;
      this.clickCount = 0;
    } else if (restartMode === 'changeNames') {
      location.reload();
    }
  }
}

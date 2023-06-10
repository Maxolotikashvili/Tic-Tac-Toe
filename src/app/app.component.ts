import { Component, OnInit } from '@angular/core';
import { Tile } from './tile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tictactoe';

  clickCount: number = 0;

  tileArray: Tile[] = [];
  winningCombinationList: string[] = ['ABC', 'DEF', 'GHI', 'ADG', 'BEH', 'CFI', 'AEI', 'CEG'];
  player1ChoiceList: string[] = [];
  player2ChoiceList: string[] = [];

  player1Name: string = 'maxo';
  player2Name: string = 'tako';
  winningTilesForStyling: string = '';

  isGameStarted!: boolean;
  isGameEnded!: boolean;
  isPlayer1Winner: boolean = false;
  isPlayer2Winner: boolean = false;

  ngOnInit(): void {
    this.fillGameBoard();
  }

  //
  receiveDataFromChild(value: {player1Name: string, player2Name: string, isGameStarted: boolean}) {
    this.player1Name = value.player1Name;
    this.player2Name = value.player2Name;
    this.isGameStarted = value.isGameStarted;
  }

  //
  fillGameBoard() {
    const idList: string[] = 'ABCDEFGHI'.split('');

    for (let i = 0; i < 9; i++) {
      this.tileArray.push({ value: '', id: idList[i] });
    }
  }

  //
  handleClick(value: Tile) {
    if (value.value !== '' || this.isGameEnded) {
      return;
    }

    if (this.clickCount % 2 == 0 || this.clickCount === 0) {
      value.value = 'x';
      this.player1ChoiceList.push(value.id);
    } else if (this.clickCount % 2 == 1) {
      value.value = 'o';
      this.player2ChoiceList.push(value.id);
    }
    
    this.clickCount++;
    this.checkWinner();
  }

  //
  checkWinner() {
    for (const list of this.winningCombinationList) {
      if (this.player1ChoiceList.includes(list[0]) && this.player1ChoiceList.includes(list[1]) && this.player1ChoiceList.includes(list[2]) && this.player1ChoiceList.length >= 3) {
        this.winningTilesForStyling = list
        this.isGameEnded = true;
        this.isPlayer1Winner = true;
      } else if (this.player2ChoiceList.includes(list[0]) && this.player2ChoiceList.includes(list[1]) && this.player2ChoiceList.includes(list[2]) && this.player2ChoiceList.length >= 3) {
        this.winningTilesForStyling = list
        this.isGameEnded = true;
        this.isPlayer2Winner = true;
      } else if (this.clickCount === 9) {
        this.isGameEnded = true;  
        console.log(this.isPlayer1Winner, this.isPlayer2Winner, this.isGameEnded);
      }
    }
  }

  //
  restartGame(mode: string) {
    if (mode === 'restart') {
      this.clickCount = 0;
      this.player1ChoiceList = [];
      this.player2ChoiceList = [];
      this.isPlayer1Winner = false;
      this.isPlayer2Winner = false;
      this.isGameEnded = false;
      this.winningTilesForStyling = '';
      this.tileArray = [];
  
      if (this.tileArray.length === 0) {
        this.fillGameBoard();
      }
    } else if (mode === 'change') {
      location.reload();
    }
  }
}

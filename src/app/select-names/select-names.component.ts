import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-names',
  templateUrl: './select-names.component.html',
  styleUrls: ['./select-names.component.scss']
})
export class SelectNamesComponent {
  @Output() emitData = new EventEmitter<{player1Name: string, player2Name: string, isGameStarted: boolean}>();

  player1Name!: string;
  player2Name!: string;
  isGameStarted!: boolean;

  //
  sendData() {
    this.emitData.emit({
      player1Name: this.player1Name,
      player2Name: this.player2Name,
      isGameStarted: !this.isGameStarted
    })
  }

  //
  validate() {
    let validator = true;

    if (this.player1Name === this.player2Name || !this.player1Name || !this.player2Name) {
      validator = true;
    } else {
      validator = false;
    }

    return validator;
  }
}

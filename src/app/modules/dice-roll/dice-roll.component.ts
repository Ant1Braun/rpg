import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EDiceColor, EDiceSymbol } from '../../enums';
import { IDice, IFace } from '../../interfaces';

export const BlueDice: IDice = {
  color: EDiceColor.blue,
  faces: [{
    symbols: []
  }, {
    symbols: []
  }, {
    symbols: [EDiceSymbol.success]
  }, {
    symbols: [EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.advantage, EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.advantage, EDiceSymbol.success]
  }],
  id: '0',
  name: 'Blue dice',
  order: 0
};
export const BlackDice: IDice = {
  color: EDiceColor.black,
  faces: [{
    symbols: []
  }, {
    symbols: []
  }, {
    symbols: [EDiceSymbol.fail]
  }, {
    symbols: [EDiceSymbol.fail]
  }, {
    symbols: [EDiceSymbol.disadvantage]
  }, {
    symbols: [EDiceSymbol.disadvantage]
  }],
  id: '1',
  name: 'Black dice',
  order: 3
};
export const GreenDice: IDice = {
  color: EDiceColor.green,
  faces: [{
    symbols: []
  }, {
    symbols: [EDiceSymbol.success]
  }, {
    symbols: [EDiceSymbol.success]
  }, {
    symbols: [EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.success, EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.advantage, EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.success, EDiceSymbol.success]
  }],
  id: '2',
  name: 'Green dice',
  order: 1
};
export const YellowDice: IDice = {
  color: EDiceColor.yellow,
  faces: [{
    symbols: []
  }, {
    symbols: [EDiceSymbol.critical]
  }, {
    symbols: [EDiceSymbol.success]
  }, {
    symbols: [EDiceSymbol.success]
  }, {
    symbols: [EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.success, EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.success, EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.success, EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.advantage, EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.advantage, EDiceSymbol.advantage]
  }, {
    symbols: [EDiceSymbol.success, EDiceSymbol.success]
  }, {
    symbols: [EDiceSymbol.success, EDiceSymbol.success]
  }],
  id: '3',
  name: 'Yellow dice',
  order: 2
};
export const RedDice: IDice = {
  color: EDiceColor.red,
  faces: [{
    symbols: []
  }, {
    symbols: [EDiceSymbol.fail]
  }, {
    symbols: [EDiceSymbol.disadvantage]
  }, {
    symbols: [EDiceSymbol.disadvantage]
  }, {
    symbols: [EDiceSymbol.disadvantage]
  }, {
    symbols: [EDiceSymbol.fail, EDiceSymbol.fail]
  }, {
    symbols: [EDiceSymbol.fail, EDiceSymbol.disadvantage]
  }, {
    symbols: [EDiceSymbol.disadvantage, EDiceSymbol.disadvantage]
  }],
  id: '4',
  name: 'Red dice',
  order: 4
};
export const PurpleDice: IDice = {
  color: EDiceColor.purple,
  faces: [{
    symbols: []
  }, {
    symbols: [EDiceSymbol.fail]
  }, {
    symbols: [EDiceSymbol.fail]
  }, {
    symbols: [EDiceSymbol.disadvantage]
  }, {
    symbols: [EDiceSymbol.disadvantage]
  }, {
    symbols: [EDiceSymbol.fail, EDiceSymbol.fail]
  }, {
    symbols: [EDiceSymbol.fail, EDiceSymbol.fail]
  }, {
    symbols: [EDiceSymbol.fail, EDiceSymbol.disadvantage]
  }, {
    symbols: [EDiceSymbol.fail, EDiceSymbol.disadvantage]
  }, {
    symbols: [EDiceSymbol.disadvantage, EDiceSymbol.disadvantage]
  }, {
    symbols: [EDiceSymbol.disadvantage, EDiceSymbol.disadvantage]
  }, {
    symbols: [EDiceSymbol.anti_critical]
  }],
  id: '5',
  name: 'Purple dice',
  order: 5
};
export const OrangeDice: IDice = {
  color: EDiceColor.orange,
  faces: [{
    symbols: [EDiceSymbol.negative]
  }, {
    symbols: [EDiceSymbol.negative]
  }, {
    symbols: [EDiceSymbol.negative]
  }, {
    symbols: [EDiceSymbol.negative]
  }, {
    symbols: [EDiceSymbol.negative]
  }, {
    symbols: [EDiceSymbol.negative, EDiceSymbol.negative]
  }, {
    symbols: [EDiceSymbol.positive]
  }, {
    symbols: [EDiceSymbol.positive]
  }, {
    symbols: [EDiceSymbol.positive, EDiceSymbol.positive]
  }, {
    symbols: [EDiceSymbol.positive, EDiceSymbol.positive]
  }, {
    symbols: [EDiceSymbol.positive, EDiceSymbol.positive]
  }],
  id: '6',
  name: 'Orange dice',
  order: 6
};

const defaultDices: IDice[] = [
  BlackDice,
  RedDice,
  PurpleDice,
  BlueDice,
  GreenDice,
  YellowDice,
  OrangeDice
];

@Component({
  selector: 'app-dice-roll',
  templateUrl: './dice-roll.component.html',
  styleUrls: ['./dice-roll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiceRollComponent implements OnInit {
  results?: IFace[];
  dices: IDice[] = [];
  defaultDices = defaultDices.sort((a, b) => a.order - b.order);
  rollCount = 0;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { dices: IDice[] }, private dialogRef: MatDialogRef<DiceRollComponent>) { }

  ngOnInit() {
    this.setDefaultDices();
  }

  getColorClass(color?: EDiceColor): { [key in EDiceColor]?: boolean } | undefined {
    if (!color) {
      return;
    }
    return { [color]: true };
  }

  getDiceNumberById(id: string): number {
    return this.dices.filter(e => e.id === id).length;
  }

  rollDices(): void {
    this.results = this.getRandomFaces(this.dices.sort((a, b) => a.order < b.order ? -1 : 0));
    this.rollCount++;
  }

  private getRandomFaces(dices: IDice[]): IFace[] {
    return dices.map(dice => {
      const face = dice.faces[Math.floor(Math.random() * dice.faces.length)];
      face.color = dice.color;
      return face;
    });
  }

  addCounterDice(d: IDice): void {
    this.dices.push(d);
  }

  rerollDices() {
    this.results = undefined;
    this.setDefaultDices();
  }

  private setDefaultDices(): void {
    this.dices = [...this.data.dices];
  }
}

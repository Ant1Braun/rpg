import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EDiceColor, EDiceSymbol } from '../../enums';
import { IDice, IFace } from '../../interfaces';

export const SWBlueDice: IDice = {
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
  }
],
id: '0',
name: 'SW Blue dice'
};
export const SWBlackDice: IDice = {
  color: EDiceColor.black,
  faces: [{
    symbols: []
  }, {
    symbols: []
  }, {
    symbols: [EDiceSymbol.failure]
  }, {
    symbols: [EDiceSymbol.failure]
  }, {
    symbols: [EDiceSymbol.threat]
  }, {
    symbols: [EDiceSymbol.threat]
  }
],
id: '1',
name: 'SW Black dice'
};
export const SWGreenDice: IDice = {
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
  }
],
id: '2',
name: 'SW Green dice'
};
export const SWYellowDice: IDice = {
  color: EDiceColor.yellow,
  faces: [{
    symbols: []
  }, {
    symbols: [EDiceSymbol.triumph]
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
  }
],
id: '3',
name: 'SW Yellow dice'
};
export const SWPurpleDice: IDice = {
  color: EDiceColor.purple,
  faces: [{
    symbols: []
  }, {
    symbols: [EDiceSymbol.failure]
  }, {
    symbols: [EDiceSymbol.threat]
  }, {
    symbols: [EDiceSymbol.threat]
  }, {
    symbols: [EDiceSymbol.threat]
  }, {
    symbols: [EDiceSymbol.failure, EDiceSymbol.failure]
  }, {
    symbols: [EDiceSymbol.failure, EDiceSymbol.threat]
  }, {
    symbols: [EDiceSymbol.threat, EDiceSymbol.threat]
  }
],
id: '4',
name: 'SW Purple dice'
};
export const SWRedDice: IDice = {
  color: EDiceColor.red,
  faces: [{
    symbols: []
  }, {
    symbols: [EDiceSymbol.failure]
  }, {
    symbols: [EDiceSymbol.threat]
  }, {
    symbols: [EDiceSymbol.threat]
  }, {
    symbols: [EDiceSymbol.threat]
  }, {
    symbols: [EDiceSymbol.failure, EDiceSymbol.failure]
  }, {
    symbols: [EDiceSymbol.failure, EDiceSymbol.threat]
  }, {
    symbols: [EDiceSymbol.threat, EDiceSymbol.threat]
  }
],
id: '5',
name: 'SW Red dice'
};
export const SWWhiteDice: IDice = {
  color: EDiceColor.white,
  faces: [{
    symbols: [EDiceSymbol.dark]
  }, {
    symbols: [EDiceSymbol.dark]
  }, {
    symbols: [EDiceSymbol.dark]
  }, {
    symbols: [EDiceSymbol.dark]
  }, {
    symbols: [EDiceSymbol.dark]
  }, {
    symbols: [EDiceSymbol.dark, EDiceSymbol.dark]
  }, {
    symbols: [EDiceSymbol.light]
  }, {
    symbols: [EDiceSymbol.light]
  }, {
    symbols: [EDiceSymbol.light, EDiceSymbol.light]
  }, {
    symbols: [EDiceSymbol.light, EDiceSymbol.light]
  }, {
    symbols: [EDiceSymbol.light, EDiceSymbol.light]
  }
],
id: '6',
name: 'SW White dice'
};

const defaultSWDices: IDice[] = [
  SWBlueDice,
  SWBlackDice,
  SWGreenDice,
  SWYellowDice,
  SWPurpleDice,
  SWRedDice,
  SWWhiteDice
];

@Component({
  selector: 'app-dice-roll',
  templateUrl: './dice-roll.component.html',
  styleUrls: ['./dice-roll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiceRollComponent implements OnInit {
  results?: IFace[];
  extraDices: IDice[] = [];
  extraResults: IFace[] = [];
  defaultDices = defaultSWDices;
  panelOpenState = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { dices: IDice[] }) { }

  ngOnInit() {
    this.rollDices();
  }

  getExtraDiceNumberById(id: string): number {
    return this.extraDices.filter(e => e.id === id).length;
  }

  rollDices(): void {
    this.results = this.getRandomFaces(this.data.dices);
    this.extraDices = [];
    this.extraResults = [];
  }

  private getRandomFaces(dices: IDice[]): IFace[] {
    return dices.map(dice => {
      const face = dice.faces[Math.floor(Math.random() * dice.faces.length)];
      face.color = dice.color;
      return face;
    });
  }

  addCounterDice(d: IDice): void {
    this.extraDices.push(d);
  }

  rollExtraDices(): void {
    this.extraResults = this.getRandomFaces(this.extraDices);
  }
}

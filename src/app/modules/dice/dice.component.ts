import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EDiceColor, EDiceSymbol } from 'src/app/enums';
import { Dice } from '../../interfaces';

const defaultDices: Dice[] = [
  {
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
  name: 'SW Blue dice',
  color: EDiceColor.blue
  },
  {
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
  name: 'SW Black dice',
  color: EDiceColor.black
  },
  {
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
  name: 'SW Green dice',
  color: EDiceColor.green
  },
  {
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
  name: 'SW Yellow dice',
  color: EDiceColor.yellow
  },
  {
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
  name: 'SW Purple dice',
  color: EDiceColor.purple
  },
  {
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
  name: 'SW Red dice',
  color: EDiceColor.red
  },
  {
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
  name: 'SW Red dice',
  color: EDiceColor.red
  }
];

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiceComponent implements OnInit {
  diceList?: Dice[];

  constructor() { }

  ngOnInit() {
    this.diceList = defaultDices;
  }
}

import { EDiceColor, EDiceSymbol } from '../../enums';
import { IDice } from '../../interfaces';

export const BlueDice: IDice = {
    color: EDiceColor.blue,
    defaultSymbol: EDiceSymbol.advantage,
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
export const WhiteDice: IDice = {
    color: EDiceColor.white,
    defaultSymbol: EDiceSymbol.disadvantage,
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
    name: 'White dice',
    order: 3
};
export const GreenDice: IDice = {
    defaultSymbol: EDiceSymbol.success,
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
    defaultSymbol: EDiceSymbol.critical,
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
    defaultSymbol: EDiceSymbol.fail,
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
    defaultSymbol: EDiceSymbol.anti_critical,
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
    defaultSymbol: EDiceSymbol.positive,
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
import { ISkill, IDicesByLebel } from '../../interfaces';
import { GreenDice, YellowDice } from '../dice-roll/constants';

export const defaultSkills: ISkill[] = [{
    id: '0',
    level: 20,
    max: 90,
    min: 20,
    name: 'athletics',
    characteristic: 'brawn'
},
{
    id: '1',
    max: 90,
    min: 20,
    level: 20,
    name: 'knowledge',
    characteristic: 'intellect'
},
{
    id: '2',
    max: 90,
    min: 20,
    level: 20,
    name: 'perception',
    characteristic: 'cunning'
},
{
    id: '3',
    max: 90,
    min: 20,
    level: 20,
    name: 'medicine',
    characteristic: 'intellect'
},
{
    id: '4',
    max: 90,
    min: 20,
    level: 20,
    name: 'stealth',
    characteristic: 'agility'
},
{
    id: '5',
    max: 90,
    min: 20,
    level: 20,
    name: 'survival',
    characteristic: 'cunning'
},
{
    id: '100',
    max: 90,
    min: 20,
    level: 20,
    name: 'brawl',
    characteristic: 'brawn'
},
{
    id: '101',
    max: 90,
    min: 20,
    level: 20,
    name: 'gunnery',
    characteristic: 'agility'
},
{
    id: '102',
    max: 90,
    min: 20,
    level: 20,
    name: 'melee',
    characteristic: 'brawn'
},
{
    id: '103',
    max: 90,
    min: 20,
    level: 20,
    name: 'light ranged',
    characteristic: 'agility'
},
{
    id: '104',
    max: 90,
    min: 20,
    level: 20,
    name: 'heavy ranged',
    characteristic: 'agility'
}
];

export const defaultDicesByLevel: IDicesByLebel[] = [{
    min: 0,
    max: 9,
    dices: [GreenDice]
}, {
    min: 10,
    max: 19,
    dices: [YellowDice]
}, {
    min: 20,
    max: 29,
    dices: [GreenDice, GreenDice]
}, {
    min: 30,
    max: 39,
    dices: [GreenDice, YellowDice]
}, {
    min: 40,
    max: 49,
    dices: [YellowDice, YellowDice]
}, {
    min: 50,
    max: 59,
    dices: [GreenDice, GreenDice, GreenDice]
}, {
    min: 60,
    max: 69,
    dices: [GreenDice, GreenDice, YellowDice]
}, {
    min: 70,
    max: 79,
    dices: [GreenDice, YellowDice, YellowDice]
}, {
    min: 80,
    max: 89,
    dices: [GreenDice, GreenDice, GreenDice, GreenDice]
}, {
    min: 90,
    max: 99,
    dices: [YellowDice, YellowDice, YellowDice]
}, {
    min: 100,
    max: 109,
    dices: [GreenDice, GreenDice, GreenDice, YellowDice]
}, {
    min: 110,
    max: 119,
    dices: [GreenDice, GreenDice, YellowDice, YellowDice]
}, {
    min: 120,
    max: 129,
    dices: [GreenDice, YellowDice, YellowDice, YellowDice]
}, {
    min: 130,
    max: 139,
    dices: [GreenDice, GreenDice, GreenDice, GreenDice, GreenDice]
}, {
    min: 140,
    max: 149,
    dices: [GreenDice, YellowDice, YellowDice, YellowDice]
}, {
    min: 150,
    max: 159,
    dices: [GreenDice, GreenDice, GreenDice, GreenDice, YellowDice]
}, {
    min: 160,
    max: 169,
    dices: [YellowDice, YellowDice, YellowDice, YellowDice]
}, {
    min: 170,
    max: 179,
    dices: [GreenDice, GreenDice, GreenDice, YellowDice, YellowDice]
}, {
    min: 180,
    max: 189,
    dices: [GreenDice, GreenDice, YellowDice, YellowDice, YellowDice]
}, {
    min: 190,
    max: 199,
    dices: [GreenDice, YellowDice, YellowDice, YellowDice, YellowDice]
}, {
    min: 200,
    max: 200,
    dices: [YellowDice, YellowDice, YellowDice, YellowDice, YellowDice]
}];
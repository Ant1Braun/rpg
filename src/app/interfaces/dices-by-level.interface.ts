import { IDice } from "./dice.interface";

export interface IDicesByLebel {
    min: number;
    max: number;
    dices: IDice[];
}
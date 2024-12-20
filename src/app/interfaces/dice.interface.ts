import { EDiceColor, EDiceSymbol } from "../enums";

export interface IDice {
    color?: EDiceColor;
    defaultSymbol: EDiceSymbol;
    faces: IFace[];
    id: string;
    name: string;
    order: number;
}

export interface IFace {
    symbols: EDiceSymbol[];
    color?: EDiceColor;
}
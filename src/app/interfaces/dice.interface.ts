import { EDiceColor, EDiceSymbol } from "../enums";

export interface IDice {
    color?: EDiceColor;
    faces: IFace[];
    id: string;
    name: string;
}

export interface IFace {
    symbols: EDiceSymbol[];
}
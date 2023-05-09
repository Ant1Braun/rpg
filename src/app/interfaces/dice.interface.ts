import { EDiceColor, EDiceSymbol } from "../enums";

export interface Dice {
    name: string;
    faces: Face[];
    color?: EDiceColor;
}

export interface Face {
    symbols: EDiceSymbol[];
}
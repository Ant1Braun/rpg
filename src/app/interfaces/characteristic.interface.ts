import { ECharacteristic } from '../enums';

export interface ICharacteristic {
    name: ECharacteristic;
    level: number;
    min: number;
    max: number;
}

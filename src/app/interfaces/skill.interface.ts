import { ECharacteristic } from '../enums';

export interface ISkill {
    name: string;
    level: number;
    min: number;
    max: number;
    characteristic: ECharacteristic;
}

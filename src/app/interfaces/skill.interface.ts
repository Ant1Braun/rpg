import { ISkillLevel } from "./skill-level.interface";

export interface ISkill {
    id: number;
    name: string;
    level: number;
    skillLevels: ISkillLevel[];
}
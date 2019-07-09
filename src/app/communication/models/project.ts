import { IIdObject } from 'communication';

export interface IProject extends IIdObject {
    name: string;
    description: string;
    issues: number[];
    image: string;
}

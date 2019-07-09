import { IIdObject } from 'communication';

export interface IIssue extends IIdObject {
    name: string;
    description: string;
    projectId: number;
    inProgress: boolean;
    created: number;
}

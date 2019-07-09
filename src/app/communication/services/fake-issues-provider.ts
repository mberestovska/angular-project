import { Injectable } from '@angular/core';
import { IIssue } from '../models/issue';
import { Observable, throwError } from 'rxjs';
import { FakeProvider } from './fake.provider';
import { map, tap } from 'rxjs/operators';
import { ExcludeId } from './provider';

@Injectable({ providedIn: 'root' })
export class FakeIssuesProvider extends FakeProvider<IIssue> {
    private _issuesStore: { [projectId: number]: IIssue[] } = {};

    generateIssues(projectId: number): number[] {
        this._issuesStore[projectId] = [];

        let length = +Math.random().toFixed() * 2;

        if (length < 2) {
            length = 2;
        }

        for (let i = 0; i <= length; i++) {
            this._issuesStore[projectId].push(generateIssue(projectId, i));
        }
        return this._issuesStore[projectId].map(i => i.id);
    }

    handleProjectCreate(id: number) {
        this._issuesStore[id] = [];
    }

    getItems(projectId?: number): Observable<IIssue[]> {
        if (Array.isArray(this._issuesStore[projectId])) {
            return this._wrapDataInObservable(this._issuesStore[projectId]);
        }

        return throwError({ message: 'Project not found' });
    }

    createItem(item: ExcludeId<IIssue>): Observable<IIssue> {
        const store = this._issuesStore;
        return this._wrapDataInObservable(item).pipe(
            map(() => store[item.projectId].push(item as any) - 1),
            tap(id => store[item.projectId][id].id = id),
            tap(id => store[item.projectId][id].created = Date.now()),
            map(id => ({ ...item, id })),
        );
    }

    getItemById(id: number, projectId?: number): Observable<IIssue> {
        if (projectId == null) {
            return throwError({ message: 'Project not found' });
        }

        return this._wrapDataInObservable(id).pipe(
            map(() => this._issuesStore[projectId].find((item) => item.id === id)),
        );
    }

    updateItem(item: IIssue): Observable<IIssue> {
        if (item.projectId == null) {
            return throwError({ message: 'Project not found' });
        }

        return this._wrapDataInObservable(item).pipe(
            map(() => this._issuesStore[item.projectId].findIndex(i => i.id === item.id)),
            tap(index => this._issuesStore[item.projectId].splice(index, 1, item)),
            map((index) => this._issuesStore[item.projectId][index]),
        );
    }

    deleteItem(id: number, projectId?: number): Observable<boolean> {
        if (projectId == null) {
            return throwError({ message: 'Project not found' });
        }

        return this._wrapDataInObservable(id).pipe(
            map(() => this._issuesStore[projectId].findIndex(i => i.id === id)),
            tap(index => this._issuesStore[projectId].splice(index, 1)),
            map(() => true),
        );
    }
}

const NAMES = [
    'Mike',
    'Rose',
    'Harvy',
    'Tim',
    'Tom',
    'Jeck',
    'Scott',
    'Jessica',
    'Amber',
    'Lorem',
    'Thomas',
];

function generateIssue(projectId: number, id): IIssue {
    return {
        id,
        name: `Issue ${NAMES[(10 * Math.random()).toFixed()]} ${id}`,
        projectId,
        created: Date.now(),
        description: `Description for issue ${NAMES[(10 * Math.random()).toFixed()]} ${id}`,
        inProgress: Math.random() > 0.5
    };
}



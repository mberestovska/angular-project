import { FakeProvider } from './fake.provider';
import { Injectable } from '@angular/core';
import { IProject } from '../models/project';
import { FakeIssuesProvider } from './fake-issues-provider';
import { IssuesProvider } from './issues-provider';
import { ExcludeId } from './provider';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FakeProjectsProvider extends FakeProvider<IProject> {
    protected _delay = 500;

    constructor(private issuesProvider: IssuesProvider) {
        super();

        for (let i = 1; i <= 100; i++) {
            this._store[i] = generateProject(i, issuesProvider);
        }
    }

    createItem(item: ExcludeId<IProject>): Observable<IProject> {
        const provider = this.issuesProvider;

        return super.createItem(item).pipe(
            tap(project => project.issues = []),
            tap(project => provider instanceof FakeIssuesProvider ? provider.handleProjectCreate(project.id) : null),
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
    ],
    IMAGES = [
        'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1542627250-da40d2d18228?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1541018939203-36eeab6d5721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1498409785966-ab341407de6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1562219797-64dfc77689a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1562143260-433c1612d2a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1555633514-9433624af83a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1560789191-20b054060a9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    ];

function generateProject(id, fakeProjectsProvider: IssuesProvider): IProject {
    return {
        id,
        name: `Project ${NAMES[(10 * Math.random()).toFixed()]} ${id}`,
        issues: fakeProjectsProvider instanceof FakeIssuesProvider ? fakeProjectsProvider.generateIssues(id) : [],
        description: `Description for project ${NAMES[(10 * Math.random()).toFixed()]} ${id}`,
        image: IMAGES[(10 * Math.random()).toFixed()],
    };
}

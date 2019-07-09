import { IssuesProvider, ProjectsProvider } from 'communication';
import { TestBed } from '@angular/core/testing';
import { FakeProjectsProvider } from './fake-projects-provider';
import { FakeIssuesProvider } from './fake-issues-provider';

describe('Project provider', () => {
    let provider: ProjectsProvider;

    beforeEach(() => {
        provider = TestBed.configureTestingModule({
            providers: [
                {
                    provide: ProjectsProvider,
                    useClass: FakeProjectsProvider,
                },
                {
                    provide: IssuesProvider,
                    useClass: FakeIssuesProvider,
                },
            ],
        }).get(ProjectsProvider);
    });

    it('service store should be fulfilled', (done) => {
        expect(provider.getItems().subscribe((items) => {
            expect(items.length > 0).toBe(true);
            done();
        }));
    });

    it('project should contains issues', (done) => {
        expect(provider.getItemById(1).subscribe((item) => {
            expect(item.issues.length > 0).toBe(true);
            done();
        }));
    });
});

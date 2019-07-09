import { NgModule } from '@angular/core';
import { ProjectsProvider } from './services';
import { FakeProjectsProvider } from './services/fake-projects-provider';
import { IssuesProvider } from './services';
import { FakeIssuesProvider } from './services/fake-issues-provider';

@NgModule({
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
})
export class CommunicationModule {

}

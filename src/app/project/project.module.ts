import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProjectComponent } from './project.component';
import { ProjectRoutes } from './project.routing';
import { CommunicationModule } from 'communication';
import { ProjectItemComponent } from './project-item/project-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { IssueDetailsComponent } from './project-detail/issue-details/issue-details.component';
import { IssueEditComponent } from './project-detail/issue-details/issue-edit/issue-edit.component';
import { ProgressPipe } from './pipe/progress.pipe';
import { NamePipe } from './pipe/name.pipe';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProjectRoutes,
        HttpClientModule,
        CommunicationModule,
        NgxPaginationModule,
    ],
    declarations: [
        ProjectComponent,
        ProjectItemComponent,
        ProjectDetailComponent,
        ProjectEditComponent,
        IssueDetailsComponent,
        IssueEditComponent,
        ProgressPipe,
        NamePipe
    ],
})
export class ProjectModule {
}

import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { IssueDetailsComponent } from './project-detail/issue-details/issue-details.component';

const routes: Routes = [
    {
        path: 'projects',
        component: ProjectComponent,
        data: {
            meta: {
                title: 'project.title',
                description: 'project.text',
                override: true,
            },
        },
        // children: [
        //     {path: ':id', component: ProjectDetailComponent}
        // ],
    },
    {
        path: 'projects/new',
        component: ProjectEditComponent,
    },
    {
        path: 'projects/:id',
        component: ProjectDetailComponent,
    },

    {
        path: 'projects/:id/edit',
        component: ProjectEditComponent,
    },
    {
        path: 'projects/:id/issue/:index',
        component: IssueDetailsComponent,
    },


];

export const ProjectRoutes = RouterModule.forChild(routes);

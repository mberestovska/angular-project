import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IProject, ProjectsProvider, IssuesProvider, IIssue } from 'communication';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: IProject;
  id: number;
  issue: IIssue;
  

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectsProvider: ProjectsProvider, 
              private issuesProvider: IssuesProvider) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'] + 1;
        console.log(this.id);
        this.projectsProvider.getItemById(this.id).subscribe(
          (project: IProject) => {
            this.project = project;
            console.log('first instance ', this.project);
            this.issuesProvider.getItems(this.id)
              .subscribe(
                (issues: []) => {
                  this.project.issues = issues;
                }
              );
          }
        );
      }
    );
  }

  onEditProject() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProject() {
    this.projectsProvider.deleteItem(this.id);
    this.router.navigate(['/projects']);
  }

  onIssueDone(index: number) {
    const currentIssue = this.project.issues[index];
    this.issuesProvider.getItemById(currentIssue['id'], this.id).subscribe(
      (res: IIssue) => {
        this.issue = res;
        console.log(this.issue);
        this.issue.inProgress = !this.issue.inProgress;
      }
    );  
  } 

  onDeleteIssue(i: number) {
    this.issuesProvider.deleteItem(i, this.id).subscribe(
      (res: boolean) => {
        console.log(res);
      } 
    );
  }
 
}

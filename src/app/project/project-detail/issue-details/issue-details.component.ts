import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProjectsProvider, IssuesProvider, IProject, IIssue } from 'communication';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {
  project: IProject;
  id: number;
  issue: any;
  index: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectsProvider: ProjectsProvider, 
              private issuesProvider: IssuesProvider) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'] + 1;
        this.index = +params['index'];
        this.projectsProvider.getItemById(this.id).subscribe(
          (project: IProject) => {
            this.project = project;
            console.log('first instance ', this.project);
            this.issuesProvider.getItemById(this.index, this.id)
              .subscribe(
                (issue: IIssue) => {
                  this.issue = issue;
                  console.log('issue ', this.issue);
                }
              );
          }
        );
      }
    );
  }

  onDeleteIssue() {
    // this deletes item but only in this component
    // this.issuesProvider.deleteItem(this.index, this.id);

    this.project.issues.splice(this.index, 1);
    this.router.navigate(['/projects', this.id - 1]);
  }

}

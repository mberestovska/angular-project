import { Component, OnInit, OnDestroy } from '@angular/core';
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
    if (window.confirm('Are you sure you want to delete this issue?')) {
      // this.project.issues.splice(this.index, 1);
      this.issuesProvider.deleteItem(this.index, this.id).subscribe(console.log);
      this.router.navigate(['/projects', this.id - 1]);
    }

  }

  onEditIssue() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onCancelIssue() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}

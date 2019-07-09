import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProjectsProvider, IProject, IssuesProvider, IIssue } from '../communication';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectsArray: any;
  subscription: Subscription;
  issuesArray: any;

  constructor(private projectsProvider: ProjectsProvider,
              private issuesProvider: IssuesProvider,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectsProvider.getItems()
      .subscribe(
        (projects: IProject[]) => {
          this.projectsArray = projects;
          console.log('array from list comp', this.projectsArray);
        }
      );
     
    // this doesn't work, trying to get issues in project details  
    // this.projectsArray.forEach(element => {
    //   element.issues = this.issuesProvider.getItems(element.id)
    //     .subscribe(
    //       (res: []) => {
    //         this.issuesArray.issues = res;
    //         console.log('with issues', this.issuesArray);
    //       }
    //     );
    // });
    
  }

  onNewProject() {
    console.log('clicked on new project');
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}

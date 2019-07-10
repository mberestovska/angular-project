import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { ProjectsProvider, IProject } from '../communication';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectsArray: any;
  subscription: Subscription;
  issuesArray: any;
  p: number;

  constructor(private projectsProvider: ProjectsProvider,
              private router: Router,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);

    this.projectsProvider.getItems()
      .subscribe(
        (projects: IProject[]) => {
          this.projectsArray = projects;
          console.log('array from list comp', this.projectsArray);
        }
      );
    
  }

  onNewProject() {
    console.log('clicked on new project');
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}

import { Component, OnInit, Input} from '@angular/core';

import { IProject, ProjectsProvider } from 'communication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() project: IProject;
  @Input() index: number;
  @Input() projectsArray: IProject[];

  constructor(private projectsProvider: ProjectsProvider,
    private router: Router) { }

  ngOnInit() {
  }

  onDeleteProject(index: number) {
    const id = index + 1;
    this.projectsProvider.deleteItem(id);
    console.log('on Delete Project clicked', id);
    this.projectsArray.splice(index, 1);
    console.log('new array', this.projectsArray);
    this.router.navigate(['/projects']);
  }
}

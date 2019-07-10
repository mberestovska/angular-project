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
  @Input() page: number;

  constructor(private projectsProvider: ProjectsProvider,
    private router: Router) { }

  ngOnInit() {
    this.checkPageNumber(this.page);
  }

  onDeleteProject(index: number) {
    let id, currentIndex;
    if (this.page > 1) {
      // 5 here is the number of items per page
      currentIndex = ((this.page - 1 ) * 5) + index;
    } else { currentIndex = index; }

    id = this.projectsArray[currentIndex].id;

    if (window.confirm('Are sure you want to delete ' + this.project.name + '?')) {
      // put your delete method logic here
      console.log(id);
    this.projectsProvider.deleteItem(id).subscribe(console.log);
    console.log('on Delete Project clicked', id);
    this.projectsArray.splice(index, 1);
    console.log('new array', this.projectsArray);
    this.router.navigate(['/projects']);
    }
    
  }

  private checkPageNumber(p: number) {
    if (this.page > 1) {
      console.log('page number', this.page);
      this.index = ((this.page - 1) * 5) + this.index;
    }
  } 
}

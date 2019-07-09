import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { ProjectsProvider, IProject, IssuesProvider, IIssue } from 'communication';



@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  projectsArray: any;
  project: IProject;
  id: number;
  editMode = false;
  projectForm: FormGroup;
  issues: IIssue[];
  issue: IIssue;
 
  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private projectsProvider: ProjectsProvider,
    private issuesProvider: IssuesProvider) { this.initForm(); }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'] + 1;
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.projectsProvider.getItemById(this.id)
          .subscribe(
            (res: IProject) => {
              this.project = res;
              console.log('project onInit', this.project);
            }
          );

        this.issuesProvider.getItems(this.id)
          .subscribe(
            (res: IIssue[]) => {
              this.issues = res;
            }
          );
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.projectForm);
    // if (this.editMode) {
    //   this.projectsProvider.getItems()
    //     .subscribe(
    //       (res: IProject[]) => { this.projectsArray = res; }
    //     );
    //   // tslint:disable-next-line: prefer-const
    //   this.project = this.projectsArray(this.id);
    //   this.projectsProvider.updateItem(this.project);
    //   // this.projectsProvider.updateItem(this.id, this.projectForm.value);
    // } else {
    //   this.projectsProvider.createItem(this.projectForm.value);
    // }
    // this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIssue(index: number) {
    (<FormArray>this.projectForm.get('issues')).removeAt(index);
  }

  onAddIssue() {
    this.issuesProvider.createItem(this.issue);
    console.log('1 ', this.issues);
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    (<FormArray> this.projectForm.get('issues')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
    console.log('2 ', this.issues);
    
  }

  private initForm() {
    let projectName = '';
    let projectImage = '';
    let projectDescription = '';
    // tslint:disable-next-line: prefer-const
    let projectIssues = new FormArray([]);
  

    if (this.editMode) {
      // tslint:disable-next-line: prefer-const
      // let project;
      
      this.projectsProvider.getItemById(this.id)
        .subscribe(
          (res: IProject) => {
            this.project = res;
            console.log('if EditMode project', this.project);
            projectName = this.project.name;
            projectImage = this.project.image;
            projectDescription = this.project['description'];

            if (this.issues) {

              // tslint:disable-next-line: prefer-const
              for (let issue of this.issues) {
                projectIssues.push(
                  new FormGroup({
                    'name': new FormControl(issue.name, Validators.required)
                  })
                );
              }
            }
          }
        );
    }
  
    this.projectForm = new FormGroup({

      'name': new FormControl(projectName, Validators.required),

      'image': new FormControl(projectImage, Validators.required),

      'description': new FormControl(projectDescription, Validators.required),

      'issues': projectIssues
    });
  
  }
  


}

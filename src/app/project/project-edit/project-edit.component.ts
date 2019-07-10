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
            },
          );
      }
    );

    this.issuesProvider.getItems(this.id)
      .subscribe(
        (res: IIssue[]) => {
          this.issues = res;
        }
      );

    this.initForm();
    
    console.log('isValid', this.projectForm.valid);

  }

  onSubmit() {
    console.log(this.projectForm);

    const newProject = { ...this.project, ...this.projectForm.value };

    if (this.editMode) {
      this.projectsProvider.updateItem(newProject).subscribe(console.log);
    } else {
      this.projectsProvider.createItem(newProject).subscribe(console.log);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIssue(index: number) {
    (<FormArray>this.projectForm.get('issues')).removeAt(index);
  }

  onAddIssue() {
    this.issuesProvider.createItem(this.issue);
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    (<FormArray>this.projectForm.get('issues')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
    console.log('updated issues ', this.issues);

  }

  private initForm() {

    if (this.editMode) {
      this.projectsProvider.getItemById(this.id)
        .subscribe((project: IProject) => {
          this.project = project;
          console.log('if EditMode project', this.project);

          this.projectForm.patchValue(project);


          // if (this.issues) {

          //   // tslint:disable-next-line: prefer-const
          //   for (let issue of this.issues) {
          //     projectIssues.push(
          //       new FormGroup({
          //         'name': new FormControl(issue.name, Validators.required)
          //       })
          //     );
          //   }

          // }
        }
        );
    }

    this.projectForm = new FormGroup({

      name: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

  }



}

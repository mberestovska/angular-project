import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProject, IIssue, ProjectsProvider, IssuesProvider } from 'communication';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.scss']
})
export class IssueEditComponent implements OnInit {

  project: IProject;
  id: number;
  index: number;
  editMode = false;
  issueForm: FormGroup;
  issue: IIssue;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private projectsProvider: ProjectsProvider,
    private issuesProvider: IssuesProvider) {  }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        console.log('params', params);
        this.id = +params['id'] + 1;
        this.index = +params['index'];
        this.editMode = params['id'] != null;
        console.log('isEditMode', this.editMode);
        this.projectsProvider.getItemById(this.id)
          .subscribe(
            (res: IProject) => {
              this.project = res;
              console.log('project onInit', this.project);
            },
          );
      }
    );

    this.issuesProvider.getItemById(this.index, this.id)
      .subscribe(
        (res: IIssue) => {
          this.issue = res;
          console.log('issue onInit', this.issue);
        }
      );

    this.initForm();

  }

  onIssueSubmit() {
    const newIssue = { ...this.issue, ...this.issueForm.value };
    console.log('newIssue', newIssue);
    if (this.editMode) {
      this.issuesProvider.updateItem(newIssue).subscribe(console.log);
    } else {
      this.issuesProvider.createItem(newIssue).subscribe(console.log);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIssue(index: number) {
    console.log('delete btn clicked');
  }

  private initForm() {

    if (this.editMode) {
     
      this.issuesProvider.getItemById(this.index, this.id).subscribe(
        (issue: IIssue) => {
          this.issue = issue;
          console.log('issue from initForm', this.issue);
          this.issueForm.patchValue(issue);
          console.log(this.issueForm.value);
        }
      );
    }

    this.issueForm = new FormGroup({

      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

  }

}

import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent {
  form!: FormGroup;
  id: any;
  isChecked: boolean = false;
  isEditMode: boolean | null = null;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private dataService: DataService,
  ) {}


  ngOnInit(): void {

    // this.isEditMode = this.route.snapshot.paramMap.get('status');
    this.route.params.subscribe(params => {
      this.isEditMode = params['status'];
      console.log("this.isEditMode", this.isEditMode);
    })

    if (this.isEditMode) {
      this.dataService.currentData
      .pipe()
      .subscribe(data => {
        this.id = data[0];
        this.isChecked = data[1];
        console.log(data);
      })
    }


    if (this.isEditMode) {
      this.userService.getById(this.id)
          .pipe()
          .subscribe(x => this.form.patchValue(x));
    }
    console.log(this.id);
    console.log(this.isChecked);
    // this.isAddMode = !this.id;
    
    this.form = this.formBuilder.group({
        pTitle: ['', Validators.required],
        category: ['', Validators.required],
        author: ['', Validators.required],
    });


  }

      // convenience getter for easy access to form fields
      get f(): { [key: string]: AbstractControl } { 
        return this.form.controls; 
      }

      onSubmit() {
          this.submitted = true;
  
          // reset alerts on submit
          // this.alertService.clear();
  
          // stop here if form is invalid
          if (this.form.invalid) {
              return;
          }
  
          this.loading = true;
          if (!this.isEditMode) {
              this.createUser();
          } else {
              this.updateUser();
          }
      }

      onReset(): void {
        this.submitted = false;
        this.form.reset();
      }
      
      private createUser() {

        console.log(this.form.value);
        this.userService.create(this.form.value)
        .pipe()
        .subscribe((d) => {
          console.log(d);
        })

        alert("New Page Details added Successfully");
        this.router.navigateByUrl("/pages");
          //     .pipe(first())
          //     .subscribe(() => {
          //         this.alertService.success('User added', { keepAfterRouteChange: true });
          //         this.router.navigate(['../'], { relativeTo: this.route });
          //     })
          //     .add(() => this.loading = false);
      }
  
      private updateUser() {
          this.userService.update(this.id, this.form.value)
              .pipe()
              .subscribe((d) => {
                console.log(d);
                alert("Data Updated Successfully");
                this.router.navigateByUrl("/pages");
                  // this.alertService.success('User updated', { keepAfterRouteChange: true });
                  // this.router.navigate(['../../'], { relativeTo: this.route });
              })
          //     .add(() => this.loading = false);
      }

    ngOnDestroy() {
      this.isChecked = false;
      this.id = null;
      this.isEditMode = null;
    }

}

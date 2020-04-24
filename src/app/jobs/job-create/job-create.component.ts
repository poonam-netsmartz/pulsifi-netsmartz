import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

import { JobsService } from "../job.service";
import { Job } from "../job.model";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-job-create",
  templateUrl: "./job-create.component.html",
  styleUrls: ["./job-create.component.css"]
})
export class JobCreateComponent implements OnInit, OnDestroy {
  enteredTitle = "";
  enteredContent = "";
  job: Job;
  isLoading = false;
  userId: string;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private jobId: string;
  private authStatusSub: Subscription;

  constructor(
    public jobsService: JobsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.userId = this.authService.getUserId();
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      date: new FormControl(null, {
        validators: [Validators.required]
      }),
      location: new FormControl(null),
      street: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      country: new FormControl(null),
      status: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
    });

  }


  onSaveJob() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
      this.jobsService.addJob(
      this.userId,
      this.form.value.title,
      this.form.value.date,
      this.form.value.description,
      this.form.value.location,
      this.form.value.street,
      this.form.value.city,
      this.form.value.state,
      this.form.value.country,
      this.form.value.status  
      );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}

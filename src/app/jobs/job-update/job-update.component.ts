import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { JobsService } from "../job.service";
import { Job } from "../job.model";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-job-update",
  templateUrl: "./job-update.component.html",
  styleUrls: ["./job-update.component.scss"]
})
export class JobUpdateComponent implements OnInit, OnDestroy {
  enteredTitle = "";
  enteredContent = "";
  job: Job;
  isLoading = false;
  form: FormGroup;
  userId: string;
  imagePreview: string;
  private mode = "create";
  private jobId: string;
  private authStatusSub: Subscription;

  constructor(
    public jobsService: JobsService,
    public route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

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

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("jobId")) {
        this.mode = "edit";
        this.jobId = paramMap.get("jobId");      
        this.jobsService.getJob(this.jobId).subscribe(jobData => {
          this.isLoading = false;
          this.job = {
            id: jobData.id,
            title: jobData.title,
            date: jobData.date,
            description: jobData.description,
            userId: jobData.userId,
            location: jobData.location,
            street: jobData.street,
            city: jobData.city,
            state: jobData.state,
            country: jobData.country,
            status: jobData.status
          };
          this.form.setValue({
            title: this.job.title,
            description: this.job.description,
            date: this.job.date,
            location: this.job.location,
            street: this.job.street,
            city: this.job.city,
            state: this.job.state,
            country: this.job.country,
            status: this.job.status
          });
        });
      }
      if (paramMap.has("deleteId")) {
       if(confirm("Are you sure you want to delete this job")) {        
        this.jobId = paramMap.get("deleteId");      
        this.jobsService.deleteJob(this.jobId).subscribe(jobData => {
          this.isLoading = false;     
          this.router.navigate(["/"]);
        });
      }  
    }
    });
  }

  onSaveJob() {
    if (this.form.invalid) {
      return;
    }
    this.jobsService.updateJob(
      this.jobId,
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

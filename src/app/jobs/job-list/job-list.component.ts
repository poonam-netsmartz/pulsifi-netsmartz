import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";

import { Job } from "../job.model";
import { JobsService } from "../job.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-job-list",
  templateUrl: "./job-list.component.html",
  styleUrls: ["./job-list.component.css"]
})
export class JobListComponent implements OnInit, OnDestroy {
  // jobs = [
  //   { title: "First Job", content: "This is the first job's content" },
  //   { title: "Second Job", content: "This is the second job's content" },
  //   { title: "Third Job", content: "This is the third job's content" }
  // ];
  jobs: Job[] = [];
  isLoading = false;
  totalJobs = 0;
  jobsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  role: string;
  private jobsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public jobsService: JobsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();    
    this.role = localStorage.getItem("Role");
    let userId = null;
    if(this.role == "ROLE_RECRUITER"){
      let userId = this.userId;
    }
    this.jobsService.getJobs(Number(userId), this.jobsPerPage, this.currentPage);
    this.jobsSub = this.jobsService
      .getJobUpdateListener()
      .subscribe((jobData: { jobs: Job[]; jobCount: number }) => {
        this.isLoading = false;
        this.totalJobs = jobData.jobCount;
        this.jobs = jobData.jobs;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.jobsPerPage = pageData.pageSize;
    this.jobsService.getJobs(Number(this.userId), this.jobsPerPage, this.currentPage);
  }

  onDelete(jobId: string) {
    this.isLoading = true;
    this.jobsService.deleteJob(jobId).subscribe(() => {
      this.jobsService.getJobs(Number(this.userId), this.jobsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}

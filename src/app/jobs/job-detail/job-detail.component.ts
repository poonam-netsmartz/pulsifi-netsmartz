import { Component, OnInit } from '@angular/core';
import { JobsService } from "../job.service";
import { Job } from "../job.model";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  job: Job;
  private jobId: string;
  constructor(
    public jobsService: JobsService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("jobId")) {
        this.jobId = paramMap.get("jobId");    
        this.jobsService.getJob(this.jobId).subscribe(jobData => {
          this.job = jobData
        });
      }
    });
  }

}

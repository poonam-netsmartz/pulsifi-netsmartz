import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Job } from "./job.model";

const BACKEND_URL = environment.apiUrl + "/jobs/";

@Injectable({ providedIn: "root" })
export class JobsService {
  private jobs: Job[] = [];
  private jobsUpdated = new Subject<{ jobs: Job[]; jobCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getJobs(userId: number, jobsPerPage: number, currentPage: number) {
    const queryParams = `?userId=${userId}&pagesize=${jobsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; jobs: any; maxJobs: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(jobData => {
          return {
            jobs: jobData.jobs.map(job => {
              return {
                title: job.title,
                description: job.description,
                id: job.id,
              };
            }),
            maxJobs: jobData.maxJobs
          };
        })
      )
      .subscribe(transformedJobData => {
        this.jobs = transformedJobData.jobs;
        this.jobsUpdated.next({
          jobs: [...this.jobs],
          jobCount: transformedJobData.maxJobs
        });
      });
  }

  getJobUpdateListener() {
    return this.jobsUpdated.asObservable();
  }

  getJob(id: string) {
    return this.http.get<{
      id: string;
      title: string;
      date: string;
      description: string;
      userId: string;
      location: string,
      street: string,
      city: string, 
      state: string,
      country: string,
      status:string
    }>(BACKEND_URL + id);
  }

  addJob(userId:string,title: string, date: string, description: string,
    location: string,street: string, city: string, state: string,country:string,status:string) {
    let jobData: Job | FormData;  
    jobData = {
      userId:userId,
      title: title,
      date: date,
      description: description,
      location: location,
      street: street,
      city: city, 
      state: state,
      country: country,
      status:status
    };

    this.http
      .post<{ message: string; job: Job }>(
        BACKEND_URL,
        jobData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updateJob(id: string,userId:string, title: string, date: string, description: string,
    location: string,street: string, city: string, state: string,country:string,status:string) {
    let jobData: Job | FormData;  
      jobData = {
        id: id,
        userId:userId,
        title: title,
        date: date,
        description: description,
        location: location,
        street: street,
        city: city, 
        state: state,
        country: country,
        status:status
      };
    this.http
      .put(BACKEND_URL + id, jobData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteJob(jobId: string) {
    return this.http.delete(BACKEND_URL + jobId);
  }
}

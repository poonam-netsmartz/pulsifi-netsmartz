import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { JobCreateComponent } from "./job-create/job-create.component";
import { JobListComponent } from "./job-list/job-list.component";
import { AngularMaterialModule } from "../angular-material.module";
import { JobUpdateComponent } from './job-update/job-update.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

@NgModule({
  declarations: [JobCreateComponent, JobListComponent, JobUpdateComponent, JobDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class JobsModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobListComponent } from "./jobs/job-list/job-list.component";
import { JobCreateComponent } from "./jobs/job-create/job-create.component";
import { JobUpdateComponent } from "./jobs/job-update/job-update.component";
import { JobDetailComponent } from "./jobs/job-detail/job-detail.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", component: JobListComponent, canActivate: [AuthGuard] },
  { path: "create", component: JobCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:jobId", component: JobUpdateComponent, canActivate: [AuthGuard] },
  { path: "delete/:deleteId", component: JobUpdateComponent, canActivate: [AuthGuard] },
  { path: "view/:jobId", component: JobDetailComponent, canActivate: [AuthGuard] },
  { path: "auth",  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}

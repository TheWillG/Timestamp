import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { EditComponent } from './components/edit/edit.component';
import { ResetConfirmComponent } from './components/reset-confirm/reset-confirm.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './components/home/home.module#HomePageModule' },
  { path: 'add', component: AddComponent },
  { path: 'countdown/:id', component: CountdownComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'reset/:id', component: ResetConfirmComponent },
  { path: 'history/:id', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

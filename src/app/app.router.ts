import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { CountdownComponent } from './components/countdown/countdown.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './components/home/home.module#HomePageModule' },
  { path: 'add', component: AddComponent },
  { path: 'countdown/:id', component: CountdownComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  {path: 'workorder', loadChildren: () => import('./pages/workorder/workorder.module').then(m => m.WorkorderPageModule)},
  {path: 'production', loadChildren: () => import('./pages/production/production.module').then(m => m.ProductionPageModule)},
  {path: '*', pathMatch: 'full', redirectTo: 'login'},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

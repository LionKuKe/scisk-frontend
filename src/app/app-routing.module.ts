import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// *******************************************************************************
// Layouts

import { Layout2Component } from './layout/layout-2/layout-2.component';
import { Layout2FlexComponent } from './layout/layout-2-flex/layout-2-flex.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import {LoginComponent} from './authentication/login/login.component';
import {LayoutHorizontalSidenavComponent} from './layout/layout-horizontal-sidenav/layout-horizontal-sidenav.component';
import {AuthGuard} from './authentication/guard/auth.guard';


// *******************************************************************************
// Routes

/* tslint:disable */
const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'feature', canActivate: [AuthGuard],
    component: LayoutHorizontalSidenavComponent, loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  },

  { path: '', redirectTo: 'feature/home', pathMatch: 'full' },

  /*{ path: 'dashboards', canActivate: [AuthGuard], component: Layout2Component, loadChildren: () => import('./+dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'layouts', canActivate: [AuthGuard], loadChildren: () => import('./+layouts/layouts.module').then(m => m.LayoutsModule) },
  { path: 'typography', canActivate: [AuthGuard], component: Layout2Component, loadChildren: () => import('./+typography/typography.module').then(m => m.TypographyModule) },
  { path: 'ui', canActivate: [AuthGuard], component: Layout2Component, loadChildren: () => import('./+ui/ui.module').then(m => m.UiModule) },
  { path: 'forms', canActivate: [AuthGuard], component: Layout2Component, loadChildren: () => import('./+forms/forms.module').then(m => m.FormsModule) },
  { path: 'tables', canActivate: [AuthGuard], component: Layout2Component, loadChildren: () => import('./+tables/tables.module').then(m => m.TablesModule) },
  { path: 'charts', canActivate: [AuthGuard], component: Layout2Component, loadChildren: () => import('./+charts/charts.module').then(m => m.ChartsModule) },
  { path: 'icons', canActivate: [AuthGuard], component: Layout2Component, loadChildren: () => import('./+icons/icons.module').then(m => m.IconsModule) },
  { path: 'miscellaneous', canActivate: [AuthGuard], component: Layout2Component, loadChildren: () => import('./+miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule) },

  { path: 'pages', canActivate: [AuthGuard], component: Layout2Component, loadChildren: () => import('./+pages/pages.module').then(m => m.PagesModule) },
  { path: 'pages', canActivate: [AuthGuard], component: Layout2FlexComponent, loadChildren: () => import('./+pages/pages-flex.module').then(m => m.PagesFlexModule) },
  { path: 'pages', canActivate: [AuthGuard], component: LayoutBlankComponent, loadChildren: () => import('./+pages/pages-blank.module').then(m => m.PagesBlankModule) },

  { path: 'complete-ui/plugins', canActivate: [AuthGuard], component: LayoutBlankComponent, loadChildren: () => import('./+complete-ui/complete-ui-plugins.module').then(m => m.CompleteUiPluginsModule) },
  { path: 'complete-ui/charts', canActivate: [AuthGuard], component: LayoutBlankComponent, loadChildren: () => import('./+complete-ui/complete-ui-charts.module').then(m => m.CompleteUiChartsModule) },
  { path: 'complete-ui', canActivate: [AuthGuard], component: LayoutBlankComponent, loadChildren: () => import('./+complete-ui/complete-ui-base.module').then(m => m.CompleteUiBaseModule) },*/

  // 404 Not Found page
  { path: '**', component: NotFoundComponent }
];
/* tslint:enable */

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

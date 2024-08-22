import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VoucherComponent } from './pages/voucher/voucher.component';

const mainTitle = 'Master Mobile'
export const routes: Routes = [
    { path: '', component: HomeComponent, title: `Home | ${mainTitle}`},
    { path: 'dashboard', component: DashboardComponent, title: `Dashboard | ${mainTitle}`},
    { path: 'voucher', component: VoucherComponent, title: `Voucher | ${mainTitle}`},
    { path: '*', redirectTo: '/', pathMatch: 'full'}
];

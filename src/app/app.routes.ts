import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VoucherComponent } from './pages/voucher/voucher.component';
import { VoucherDailyComponent } from './pages/voucher/voucher-daily/voucher-daily.component';
import { VoucherInfoComponent } from './pages/voucher/voucher-info/voucher-info.component';

const mainTitle = 'Master Mobile'
export const routes: Routes = [
    { path: '', component: HomeComponent, title: `Home | ${mainTitle}`},
    { path: 'dashboard', component: DashboardComponent, title: `Dashboard | ${mainTitle}`},
    { path: 'voucher', component: VoucherComponent, title: `Voucher | ${mainTitle}`, children: [
        { path: 'daily', component: VoucherDailyComponent,  title: `Voucher | ${mainTitle}` },
        { path: ':date', component: VoucherInfoComponent, title: `Voucher | ${mainTitle}`},
        { path: '', redirectTo: '/voucher/daily', pathMatch: 'full'}
    ]},
    { path: '*', redirectTo: '/', pathMatch: 'full'}
];

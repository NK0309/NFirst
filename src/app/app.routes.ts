import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'customers',
        component: CustomersComponent,
    },
    // {
    //     path: 'footer',
    //     component: FooterComponent,
    // }
];

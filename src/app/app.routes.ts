import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./user-list/user-list.module').then((m) => m.UserListPageModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('./errors/not-found/not-found.module').then(
        (m) => m.NotFoundPageModule
      ),
  },
];

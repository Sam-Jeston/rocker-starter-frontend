import { provideRouter, RouterConfig }  from '@angular/router'
import { SongComponent } from './song/song.component'
import { ContactComponent } from './contact/contact.component'

const routes: RouterConfig = [
  {
    path: 'home',
    component: SongComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

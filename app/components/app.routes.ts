import { provideRouter, RouterConfig }  from '@angular/router'
import { SongComponent } from './song/song.component'
import { InvolvedComponent } from './involved/involved.component'
import { HowComponent } from './how/how.component'

const routes: RouterConfig = [
  {
    path: 'home',
    component: SongComponent
  },
  {
    path: 'how-it-works',
    component: HowComponent
  },
  {
    path: 'get-involved',
    component: InvolvedComponent
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

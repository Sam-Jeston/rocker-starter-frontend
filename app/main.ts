///<reference path="../typings/index.d.ts"/>

import { bootstrap } from '@angular/platform-browser-dynamic'
import { HTTP_PROVIDERS } from '@angular/http'
import 'rxjs/Rx'

import { AppComponent } from './components/app.component'
import { APP_ROUTER_PROVIDERS } from './components/app.routes'

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS
])

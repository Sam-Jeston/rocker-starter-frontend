///<reference path="../typings/index.d.ts"/>

import { bootstrap } from '@angular/platform-browser-dynamic'
import { HTTP_PROVIDERS } from '@angular/http'
import { enableProdMode } from '@angular/core'

import { AppComponent } from './app/components/app.component'
import { APP_ROUTER_PROVIDERS } from './app/components/app.routes'

import './css/styles.css'

if (process.env.ENV === 'production') {
  enableProdMode()
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS
])

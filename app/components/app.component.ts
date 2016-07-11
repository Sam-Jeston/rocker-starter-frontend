import { Component } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'
import { SongComponent } from './song/song.component'
import { InvolvedComponent } from './involved/involved.component'
import { HowComponent } from './how/how.component'

@Component({
  selector: 'my-app',
  templateUrl: 'app/components/app.html',
  directives: [ROUTER_DIRECTIVES],
  precompile: [SongComponent, InvolvedComponent, HowComponent]
})

// Comenneted out i
export class AppComponent {
  title = 'This is the title'
}

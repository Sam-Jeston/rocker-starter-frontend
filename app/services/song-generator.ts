import { Injectable } from '@angular/core'

@Injectable()
export class SongService {
  getSong() {
    return {name: 'Hello'}
  }
}

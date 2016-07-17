import { Component, OnInit } from '@angular/core'
import { SongService } from '../../services/song-generator'
import { StaveComponent } from './stave/stave.component'

@Component({
  selector: 'song',
  templateUrl: 'song.html',
  providers: [SongService],
  directives: [StaveComponent]
})

export class SongComponent {
  songData = null
  key = null
  displaySong = false

  constructor(private songService: SongService) { }

  getSong() {
    this.songService.getSong().then((data) => {
      this.songData = data

      if (this.songData.progression[0] === 'i') {
        this.key = 'minor'
      } else {
        this.key = 'major'
      }

      this.displaySong = true
    })
  }

  resetSong() {
    this.displaySong = false
    this.getSong()
  }

  clear() {
    this.songData = null
    this.displaySong = false
  }
}

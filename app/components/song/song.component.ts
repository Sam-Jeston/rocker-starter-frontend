import { Component, OnInit } from '@angular/core'
import { SongService } from '../../services/song-generator'

@Component({
  selector: 'song',
  templateUrl: 'app/components/song/song.html',
  providers: [SongService]
})

export class SongComponent {
  songData = null
  displaySong = false

  constructor(private songService: SongService) { }

  getSong() {
    this.songService.getSong().then((data) => {
      this.songData = data
      this.displaySong = true
    )
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

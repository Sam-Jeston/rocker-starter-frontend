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
  key: string
  displaySong: boolean
  chordMap = {
    'i': 'Am',
    'ii': 'Bm',
    'iii': 'C#m',
    'iv': 'Dm',
    'v': 'Em',
    'vi': 'F#m',
    'vii': 'G#m',
    'I': 'A',
    'II': 'B',
    'III': 'C',
    'IV': 'D',
    'V': 'E',
    'VI': 'F',
    'VII': 'G'
  }

  loading: boolean = false
  humanProgression: string

  constructor(private songService: SongService) { }

  getSong() {
    this.loading = true
    this.songService.getSong().then((data) => {
      this.songData = data
      this.humanProgression = this.songData.progression.split(' ').map((c) => {
        return this.chordMap[c]
      }).join(' ')

      if (this.songData.progression[0] === 'i') {
        this.key = 'minor'
      } else {
        this.key = 'major'
      }

      this.displaySong = true
      this.loading = false
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

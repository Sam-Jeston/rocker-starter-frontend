import { Component, OnInit } from '@angular/core'
import { SongService } from '../../services/song-generator'

@Component({
  selector: 'song',
  templateUrl: 'app/components/song/song.html',
  providers: [SongService]
})

export class SongComponent implements OnInit {
  title = 'This is the title'
  songs = null

  constructor(private songService: SongService) { }

  getSong() {
    this.songs = this.songService.getSong()
  }

  ngOnInit() {
    this.getSong()
  }
}

import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'
import 'rxjs/add/operator/toPromise'

interface SongResponse {
  fileName: string
  progression: Bar
  melodyString: string
  songBase: string
}

interface Bar {
  firstBar: string[]
  secondBar: string[]
  thirdBar: string[]
  fourthBar: string[]
}

@Injectable()
export class SongService {
  private getSongUrl = '/api/create-song'

  constructor(private http: Http) {}

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getSong(): Promise<SongResponse> {
    return this.http.get(this.getSongUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  downloadSong(fileName) {
    window.open(fileName, '_blank', '')
  }
}

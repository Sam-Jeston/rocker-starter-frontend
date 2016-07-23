import { Component, Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/share'

@Injectable()
export class FileUploadService {
  private $progress: Observable<any>
  private progress: number = 0
  private progressObserver: any

  constructor() {
    this.$progress = new Observable(observer => {
      this.progressObserver = observer
    })
  }

  public getObserver(): Observable<any> {
    return this.$progress
  }

  // Upload file with XML request due to lack of support from angular2 for file uploads
  // a this point
  public upload(url: string, file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      let formData: FormData = new FormData()
      let xhr: XMLHttpRequest = new XMLHttpRequest()

      formData.append("file", file, file.name)

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(xhr.response)
          }
        }
      }

      FileUploadService.setUploadUpdateInterval(200)

      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100)
        this.progressObserver.next(this.progress)
      }

      xhr.open('POST', url, true)
      xhr.send(formData)
    })
  }

  private static setUploadUpdateInterval(interval: number): void {
    setInterval(() => { }, interval)
  }
}

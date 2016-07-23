import { Component } from '@angular/core'
import { FileUploadService } from '../../services/file-upload'
import { includes } from 'lodash'

@Component({
  selector: 'get-involved',
  templateUrl: 'involved.html',
  providers: [FileUploadService]
})

export class InvolvedComponent {
  targetFile
  isUploading: boolean
  uploadProgress: number = 0
  uploadRoute: string = '/api/upload-file'
  uploadError: string
  uploadSuccess: boolean

  constructor(private fileUploadService: FileUploadService) { }

  public fileChange(event): void {
    this.uploadSuccess = false
    this.uploadError = ''

    this.targetFile = event.srcElement.files[0]

    if (this.targetFile.size > 1000000) {
      this.uploadError = 'File size must be below 1mb'
      return
    }

    let validAudioFormats = ['audio/mp3', 'audio/mpeg3', 'audio/x-mpeg-3', 'audio/wav', 'audio/x-wav']

    if (!includes(validAudioFormats, this.targetFile.type)) {
      this.uploadError = 'The file uploaded must be an mp3 or wav file'
      return
    }

    this.uploadHandler(event.srcElement)
  }

  private uploadHandler(element): Promise<any> {
    if (!this.targetFile) {
      return
    }

    this.isUploading = true

    this.fileUploadService.getObserver()
      .subscribe(progress => {
        this.uploadProgress = progress
      });

    return this.fileUploadService.upload(this.uploadRoute, this.targetFile).then(() => {
      this.isUploading = false
      this.uploadSuccess = true
      this.targetFile = null
      this.uploadProgress = 0
      element.value = ''
    }).catch((err) => {
      this.isUploading = false
      this.uploadSuccess = false
      this.targetFile = null
      this.uploadProgress = 0
      console.log(err)
      this.uploadError = err.error || err
    })

  }
}

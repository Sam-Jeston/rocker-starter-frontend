import { Component, OnInit, Input } from '@angular/core'
import * as _ from 'lodash'

let Vex = require('vexflow')
let VF = Vex.Flow

interface Notes {
  firstBar: string[]
  secondBar: string[]
  thirdBar: string[]
  fourthBar: string[]
}

@Component({
  selector: 'stave',
  templateUrl: 'stave.html'
})

export class StaveComponent implements OnInit {
  @Input() notes: Notes
  @Input() key: String

  ngOnInit() {
    let noteMap = {
      'A': "a/4",
      'B': "b/4",
      'C': "c/5",
      'D': "d/5",
      'E': "e/5",
      'F': "f/5",
      'G': "g/5",
      'Z': "b/4"
    }

    let tempMap = {
      '0.5': "8",
      '1': "4",
      '1.5': "4",
      '2': "2",
      '2.5': ["2", "8"],
      '3': "2"
    }

    console.log(this.notes)

    // Create an SVG renderer and attach it to the DIV element named "boo".
    let div = document.getElementById('stave')
    let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG)

    // Configure the rendering context.
    renderer.resize(600, 150)
    let context = renderer.getContext()
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed")

    // Create a stave of width 400 at position 10, 40 on the canvas.
    let displayStave = new VF.Stave(10, 40, 600)
    displayStave.addClef("treble").addTimeSignature("4/4")

    if (this.key === 'major') {
      displayStave.addKeySignature('A')
    }

    displayStave.setContext(context).draw();

    // Generate the notes object
    let createdNotes = []
    let tiePositions = []

    function restHandler (note, duration) {
      if (note === 'Z') {
        return `${duration}r`
      } else {
        return duration
      }
    }

    function createNotes (bar) {
      _.each(bar, (note) => {
        if (note[1] === '#') {
          note = note.split('#').join('')
        }

        // At this point rests are only possible on 1/4 and 1/8 notes, hence the
        // calls to the rest handler
        if (note.length < 2) {
          let vfNote = new VF.StaveNote({ keys: [noteMap[note[0]]], duration: restHandler(note[0], tempMap[note[1]]) })
          if (note[1] === '3') {
            vfNote.addDotToAll()
          }

          createdNotes.push(vfNote)
        } else {
          let tempExtract = note.substring(1, 4)

          if (tempExtract !== '2.5') {
            let vfNote = new VF.StaveNote({ keys: [noteMap[note[0]]], duration: restHandler(note[0], tempMap[tempExtract]) })
            if (tempExtract === '1.5') {
              vfNote.addDotToAll()
            }

            createdNotes.push(vfNote)
          } else {
            createdNotes.push(new VF.StaveNote({ keys: [noteMap[note[0]]], duration: tempMap[tempExtract][0] }))
            createdNotes.push(new VF.StaveNote({ keys: [noteMap[note[0]]], duration: tempMap[tempExtract][1] }))
            let currentNotes = createdNotes.length
            console.log(currentNotes)
            tiePositions.push(new VF.StaveTie({
              first_note: createdNotes[currentNotes - 2],
              last_note: createdNotes[currentNotes - 1],
              first_indices: [0],
              last_indices: [0]
            }))
          }
        }
      })

      createdNotes.push(new Vex.Flow.BarNote(1))
    }

    createNotes(this.notes.firstBar)
    createNotes(this.notes.secondBar)
    createNotes(this.notes.thirdBar)
    createNotes(this.notes.fourthBar)
    let beams = VF.Beam.generateBeams(createdNotes)
    VF.Formatter.FormatAndDraw(context, displayStave, createdNotes)
    beams.forEach(function(b) {b.setContext(context).draw()})

    tiePositions.forEach(function(t) {t.setContext(context).draw()})
  }
}

import {Component, OnInit, ViewChild} from '@angular/core'
import {AppGraph} from '../../../../lib/app-graph/AppGraph'
import {VideoPlayer} from '../../../../lib/video-player/VideoPlayer'
import {FrameStream} from '../../../../lib/recurse_and_C/FrameStream'
import {TreeSpy} from '../../../../lib/recurse_and_C/TreeSpy'
import {RecursiViz} from '../../../../lib/recurse_and_C/RecursiViz'

import 'rxjs/add/operator/do'
import {CODE_STUB} from './default-text'

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {
  get speed(): number {
    return this._speed
  }

  set speed(value: number) {
    this._speed = value
    if (this.player !== undefined) {
      this.player.speed = value
    }
  }

  @ViewChild('editor') editor

  player: VideoPlayer
  text: string = CODE_STUB
  args = '[ 5 ]'
  _speed = 200
  rv: RecursiViz

  ngOnInit() {
  }

  play() {
    if (this.player === undefined) {
      this.submitCode()
      return
    }
    this.player.play()
  }

  initPlayer() {
    this.player = new VideoPlayer(new AppGraph('graph-canvas'))
    this.player.speed = this.speed

    let fs = new FrameStream()
    let ts = new TreeSpy(fs)
    this.rv = new RecursiViz(ts)

    fs.frames$.subscribe(frame => this.player.addFrame(frame))
  }

  submitCode() {
    let argString = this.args
    let codeString = this.text
    this.initPlayer()
    if (argString.trim() === '') { argString = '[]' }

    let entrypoint
    eval(codeString)
    let _args = eval(argString)
    if (!entrypoint) { return alert('No function exported!') }
    if (!Array.isArray(_args)) { return alert('Invalid args!') }

    this.rv.visualize(entrypoint, _args)
    this.player.play()
  }

  saveSnippet() {
    let key = prompt('Enter the snippet key: ')
    localStorage[key] = this.text
    alert('Saved!')
  }

  loadSnippet() {
    let key = prompt('Enter the snippet key: ')
    let snippet = localStorage[key]
    if (!snippet) { return alert('No snippet found!') }
    this.text = snippet
  }

  shouldShowPlayButton() {
    if (this.player === undefined) return true
    return !this.player.playing
  }

}

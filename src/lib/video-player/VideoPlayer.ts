import {AppGraph} from '../app-graph/AppGraph'
import {interval} from 'rxjs/observable/interval'
import 'rxjs/add/operator/takeWhile'

export class VideoPlayer {

  public speed = 200

  private playDirection = 1
  public playing

  private curFrame = 0
  private frames = []

  constructor(private graph: AppGraph) {}

  public addFrame(frame) {
    this.frames.push(frame)
    if(this.frames.length === 1) this.forward()
  }

  public clearFrames() {
    this.frames = []
    this.curFrame = 0
  }

  public play() {
    this.playDirection = 1
    this.animate()
  }

  public startOver() {
    while(this.curFrame > 1) this.back()
  }

  public rewind() {
    this.playDirection = -1
    this.animate()
  }

  public pause() {
    this.playing = false
  }

  private animate() {
    if(this.playing) return
    this.playing = true
    interval(this.speed)
      .takeWhile(_ => this.playing)
      .subscribe( _ => {
        if(this.playDirection > 0) this.forward()
        else this.back()

        if(this.curFrame === 1 || this.curFrame === this.frames.length)
          this.playing = false
      })
  }

  public forward() {
    if(this.curFrame === this.frames.length) return
    event = this.frames[this.curFrame++]
    this.graph.dispatch(event)
  }

  public back() {
    if(this.curFrame <= 1) return
    event = this.frames[--this.curFrame]
    this.graph.undo(event)
  }

}

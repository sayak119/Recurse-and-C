import {Subject} from "rxjs/Subject"

export class FrameStream {

    changes$ = new Subject()
    frames$

    constructor(){
        this.frames$ = this.changes$
            .asObservable()
            .map(this.convertToGraph)
    }

    // TODO: recursive copy
    convertToGraph(data) {
        return { ...data }
    }

}

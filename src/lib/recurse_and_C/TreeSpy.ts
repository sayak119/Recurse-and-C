import 'rxjs/add/operator/map'
import {FrameStream} from './FrameStream'
import {CallNode} from './CallNode'
import {CallEdge} from './CallEdge'

let id = 0
let edgeId = 0

function createNode(node, edge) {
  return {
    type: 'create',
    node,
    edge
  }
}

function editNode(old, node) {
  return {
    type: 'edit',
    old,
    node
  }
}

export class TreeSpy {

  callStack = []

  constructor(public frameStream: FrameStream) {}

  onCall({args}) {
    let node: CallNode = this.defaultNode(args.join(', '))
    let edge: CallEdge = this.makeParentEdge(node)

    this.callStack.push(node.id)
    this.frameStream.changes$.next(createNode(node, edge))
    return node
  }

  onEval({node, value}) {
    let old = { ...node }
    let newNode = { ...node }

    newNode.label += ' => ' + value
    newNode.color = {
      background: 'lightgreen',
      border: 'black'
    }

    this.frameStream.changes$.next(editNode(old, newNode))
    this.callStack.pop()
  }

  protected defaultNode(label: string): CallNode {
    return {
      id: ++id,
      level: this.callStack.length,
      color: {
        background: 'pink',
        border: 'black'
      },
      shape: 'box',
      label: label
    }
  }

  protected makeParentEdge(node: CallNode): CallEdge {
    if(this.callStack.length <= 0) return
    return {
      id: ++edgeId,
      from: this.callStack[this.callStack.length - 1],
      to: node.id
    }
  }

}

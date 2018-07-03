export class RecursiViz {

  constructor(public treeSpy) { }

  func

  visualize(myRecursiveFunction, ...args) {
    this.func = myRecursiveFunction
    this.recurse(...args)
  }

  recurse(...args) {
    let node = this.treeSpy.onCall({args})
    let result = this.func(this.recurse.bind(this), ...args)
    this.treeSpy.onEval({node, value: result})
    return result
  }

}

declare let vis

const treeOptions = {
  edges: {
    smooth: {
      type: 'cubicBezier',
      forceDirection: 'vertical',
      roundness: 0.4
    }
  },
  layout: {
    hierarchical: {
      direction: 'UD'
    }
  },
  physics: false
}

export class AppGraph {

  networkGraph
  data

  constructor(containerID: string) {
    this.data = {
      nodes: new vis.DataSet(),
      edges: new vis.DataSet()
    }

    this.networkGraph = new vis.Network(
      document.getElementById(containerID),
      this.data,
      treeOptions
    )
  }

  dispatch(event) {
    switch (event.type) {
      case 'create':
        this.data.nodes.add(event.node)
        if(event.edge)
          this.data.edges.add(event.edge)
        break
      case 'edit':
        this.data.nodes.update(event.node)
        break
    }
  }

  undo(event) {
    switch (event.type) {
      case 'create':
        this.data.nodes.remove(event.node.id)
        if(event.edge) this.data.edges.remove(event.edge.id)
        break
      case 'edit':
        this.data.nodes.update(event.old)
        break
    }
  }

}

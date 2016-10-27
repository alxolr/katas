module.exports =
  class WeightedGraph {
    constructor () {
      this.edges = []
      this.vertexes = []
    }

    /**
     * Add an edge to the graph
     *
     * @param {String}  from
     * @param {String}  to
     * @param {Number}  weight
     * @param {Boolean} directed
     */
    addEdge (from, to, weight, directed) {
      directed = directed || this.directed

      if (!this.edges[from]) this.edges[from] = []

      this.edges[from].push({
        to: to,
        weight: weight || Infinity
      })

      if (!directed) {
        this.addEdge(to, from, weight, true)
      }
    }
}

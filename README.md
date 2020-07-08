# Graph Theory Redux Tool
A work in progress upgrade of a previous project I started, visualizing graph theory algorithms like BFS, DFS and Djikstras alogirthms.
Link to web hosted project: [Graph Theory Redux Tool](https://alphabeard.github.io/links/Graph_Theory/index.html).

## General Code Explanation
The nodesArray and edgesArray global arrays hold all the  node and edge information. Each node objects has its own HTML Element and position information. The edges are based on the nodes and update their positions from the nodes they are connected to. The global requestFrameAnimation() function animates everything. Each nodes location is kept in an x in y property and update the HTML element with the update() function. This added a layer of abstraction that was originally intended to give the nodes velocity more easily.
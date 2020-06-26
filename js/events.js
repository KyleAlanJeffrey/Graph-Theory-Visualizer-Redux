var currentNode = undefined;
var currentEdge = undefined;
var bfsInterval;

var mouseX = 0;
var mouseY = 0;

var bfsObj;

document.body.onmousemove = mouseMove;

function BFSclicked() {
    bfsObj = new BFS_class(graph, 0);
    bfsInterval = setInterval(() => { BFS(bfsObj) }, 300);
}
function mouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY - NAVBAR_HEIGHT;
    if (toolbar.nodeMoveinProgress) {
        currentNode.x = mouseX - NODE_RADIUS;
        currentNode.y = mouseY;
    }
}

function canvasClicked() {
    if (toolbar.nodeCreateTool) {//Nodecreatetool must be active to make node
        nodeCreate(mouseX, mouseY + NAVBAR_HEIGHT);
    }
}

function nodeCreate(x, y) {
    let body = document.getElementById("canvas");
    let node = new Node(x - NODE_RADIUS, y - NODE_RADIUS, body);
    node.nodeElement.onmousedown = function () { nodeClicked(node) }; //Cannot do this inside the constructor because can't pass "this" 
    nodesArray.push(node);
    graph.addVertex();
    node.nodeElement.classList += " node-placed";
}

function nodeClicked(node) {
    /* Enable Moving NodeClicked */
    if (!toolbar.nodeCreateTool && !toolbar.edgeCreateTool) {
        toolbar.nodeMoveinProgress = !toolbar.nodeMoveinProgress;
        currentNode = node;

        /* Create Edge And Assign Second Node to Mouse Pointer */
    } else if (toolbar.edgeCreateTool && !toolbar.edgeCreateinProgress) {
        toolbar.edgeCreateinProgress = true;
        let edge = new Edge(mouseX, mouseY, node, undefined, svgElement);
        currentEdge = edge;
        edgesArray.push(edge);

        /* Assign Second Node of Current Edge to This node*/
    } else if (toolbar.edgeCreateinProgress) {
        toolbar.edgeCreateinProgress = false;

        // DELETE DUPLICATE EDGES
        let edgeWithSameTerminus = edgesArray.filter(edge => edge.node2 == node); //find edges with same node2
        if (edgeWithSameTerminus[0]) {
            if (edgeWithSameTerminus[0].node1 == currentEdge.node1) { //delete edge if the same edge
                currentEdge.destroyHTMLElement();
                edgesArray.pop();
            }
        }else{
            currentEdge.node2 = node;
            graph.addEdge(currentEdge.node1.vertex, currentEdge.node2.vertex);
    
        }

    }
}

// function createGrid() {
//     let body = document.getElementById("canvas");
//     let padding = 20;
//     let nodeSpace = NODE_RADIUS * 2 + padding;
//     let w = WIDTH / nodeSpace;
//     let h = HEIGHT / nodeSpace;
//     for (let i = 0; i < h - 1; i++) {
//         for (let j = 0; j < w - 1; j++) {
//             nodeCreate(nodeSpace * j, nodeSpace * i, body);
//         }
//     }
// }
// function destroyGrid() {
//     let n = nodesArray.length;
//     for (let index = 0; index < n; index++) {
//         let node = nodesArray.pop();
//         node.destroyHTMLElement();
//     }
// }

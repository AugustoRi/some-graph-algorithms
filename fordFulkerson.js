function BFS(graph, source, target, parent) {
    const ROW = graph.length;
    let visited = new Array(ROW).fill(false);

    let queue = [];

    queue.push(source);
    visited[source] = true;

    while (queue.length > 0) {
        let j = queue.shift();

        for (let i = 0; i < graph[j].length; i++) {
            if (!visited[i] && graph[j][i] > 0) {
                queue.push(i);
                visited[i] = true;
                parent[i] = j;

                if (i === target) {
                    return true;
                }
            }
        }
    }

    return false;
}

function FordFulkerson(graph, source, target) {
    const ROW = graph.length;
    let parent = new Array(ROW).fill(-1);

    let max_flow = 0;

    while (BFS(graph, source, target, parent)) {
        let path_flow = Number.MAX_VALUE;
        let s = target;

        while (s !== source) {
            path_flow = Math.min(path_flow, graph[parent[s]][s]);
            s = parent[s];
        }

        max_flow += path_flow;

        let v = target;
        while (v !== source) {
            let u = parent[v];
            graph[u][v] -= path_flow;
            graph[v][u] += path_flow;
            v = parent[v];
        }
    }

    return max_flow;
}

const examples = [
    {
        graph: [
            [0, 16, 13, 0, 0, 0],
            [0, 0, 10, 12, 0, 0],
            [0, 4, 0, 0, 14, 0],
            [0, 0, 9, 0, 0, 20],
            [0, 0, 0, 7, 0, 4],
            [0, 0, 0, 0, 0, 0]
        ],
        source: 0,
        target: 5
    },
    {
        graph: [
            [12, 11, 13, 0, 0, 0],
            [0, 0, 10, 12, 6, 0],
            [0, 4, 8, 0, 7, 0],
            [0, 0, 9, 0, 0, 20],
            [0, 0, 0, 7, 0, 4],
            [0, 0, 0, 0, 0, 0]
        ],
        source: 0,
        target: 5
    },
    {
        graph: [
            [0, 18, 10, 0, 0, 0, 0],
            [0, 0, 12, 0, 0, 11, 0],
            [0, 0, 0, 7, 6, 0, 0],
            [0, 0, 0, 0, 15, 0, 9],
            [0, 0, 0, 0, 0, 4, 10],
            [0, 0, 0, 0, 0, 0, 8],
            [0, 0, 0, 0, 0, 0, 0]
        ],
        source: 1,
        target: 6
    }    
]

examples.map((ex) => {
    console.log("The maximum possible flow is " + FordFulkerson(ex.graph, ex.source, ex.target));     
})
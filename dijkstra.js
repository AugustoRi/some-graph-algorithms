function findMinDistance(distances, visited, length) {
    let minDistance = Number.MAX_VALUE;
    let minIndex = -1;

    for (let vertex = 0; vertex < length; vertex++) {
        if (!visited[vertex] && distances[vertex] <= minDistance) {
            minDistance = distances[vertex];
            minIndex = vertex;
        }
    }
    return minIndex;
}

function dijkstraAlgorithm(graph, source) {
    let distances = new Array(graph.length).fill(Number.MAX_VALUE);
    let visited = new Array(graph.length).fill(false);

    distances[source] = 0;

    for (let count = 0; count < graph.length - 1; count++) {
        let nearestVertex = findMinDistance(distances, visited, graph.length);

        visited[nearestVertex] = true;

        for (let vertex = 0; vertex < graph.length; vertex++) {
            if (!visited[vertex] && graph[nearestVertex][vertex] !== 0 &&
                distances[nearestVertex] !== Number.MAX_VALUE &&
                distances[nearestVertex] + graph[nearestVertex][vertex] < distances[vertex]) {
                distances[vertex] = distances[nearestVertex] + graph[nearestVertex][vertex];
            }
        }
    }

    displayDistances(distances, graph.length);
}

function displayDistances(distances, length) {
    console.log("Vértice \t Distância a partir da fonte");
    for (let i = 0; i < length; i++) {
        console.log(i + " \t\t " + distances[i]);
    }
}

const examples = [
    {
        graph: [
            [0, 7, 9, 0, 0, 14],
            [7, 0, 10, 15, 0, 0],
            [9, 10, 0, 11, 0, 2],
            [0, 15, 11, 0, 6, 0],
            [0, 0, 0, 6, 0, 9],
            [14, 0, 2, 0, 9, 0]
        ],
        source: 0,
    },
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
    },   
]

examples.map((ex) => {
    dijkstraAlgorithm(ex.graph, ex.source);     
})
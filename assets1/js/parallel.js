var width = 1500,
height = 900,
margin = { top: 70, right: 10, bottom: 10, left: 30 };


var svg = d3.select("#parallel-container").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dimensions = ["Triglyceride", "Creatinine", "HbA1c", "Total Cholesterol", "Glycated Albumin", "Age"];
var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// Load data from CSV file
d3.csv('assets1/staticdata/parllel.csv').then(function(data) {
// Convert data types if needed
data.forEach(function(d) {
    d.Triglyceride = +d.Triglyceride;
    d.Creatinine = +d.Creatinine;
    d.HbA1c = +d.HbA1c;
    d['Total Cholesterol'] = +d['Total Cholesterol'];
    d['Glycated Albumin'] = +d['Glycated Albumin'];
    d.Age = +d.Age;
});

// Initialize scale for each dimension
var x = d3.scalePoint().range([0, width]).padding(1).domain(dimensions),
    y = {};
dimensions.forEach(function(dim) {
    y[dim] = d3.scaleLinear().domain(d3.extent(data, function(d) { return +d[dim]; })).range([height, 0]);
});

// Initialize nodes and edges for edge bundling
var node_set = {};
data.forEach(function(d) {
    dimensions.forEach(function(dim) {
        node_set[dim + "_" + d[dim]] = { x: x(dim), y: y[dim](d[dim]), id: dim + "_" + d[dim] };
    });
});

var nodes = Object.keys(node_set).map(function(key) { return node_set[key]; });
var edges = [];
data.forEach(function(d) {
    dimensions.forEach(function(dim, i) {
        if (i < dimensions.length - 1) {
            var sourceId = dim + "_" + d[dim],
                targetId = dimensions[i + 1] + "_" + d[dimensions[i + 1]],
                sourceNode = node_set[sourceId],
                targetNode = node_set[targetId];

            if (sourceNode && targetNode) { // Ensure nodes exist
                edges.push({
                    source: nodes.indexOf(sourceNode),
                    target: nodes.indexOf(targetNode),
                    class: d.Comorbidities
                });
            }
        }
    });
});

// Draw axis function
function drawAxis() {
    svg.selectAll(".dimension").remove();
    var g = svg.selectAll(".dimension").data(dimensions).enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

    g.append("g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(d3.axisLeft(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { return d; });

   // Add axis labels
   g.append("text")
        .attr("class", "axis-label")
        .attr("x", 0)
        .attr("y", -5)
        .text(function(d) { return d; });

    // Add axis values
    g.append("text")
        .attr("class", "axis-value")
        .attr("x", 0)
        .attr("y", height + margin.top + 15)
        .text(function(d) { return d3.extent(data, function(v) { return +v[d]; }).join(' - '); });
}
// Draw legend function
// Draw legend function
function drawLegend() {
// Define Comorbidities value mapping
var comorbidityMap = {
'0': 'No',
'1': 'Few',
'2': 'Numerous'
};

// Get unique mapped Comorbidities values
var mappedComorbidities = Array.from(new Set(data.map(d => comorbidityMap[d.Comorbidities])));

// Create color scale based on mapped values
var colorScale = d3.scaleOrdinal()
.domain(mappedComorbidities)
.range(d3.schemeCategory10);

// Create legend group
var legend = svg.selectAll(".legend")
.data([null])
.enter().append("g")
.attr("class", "legend")
.attr("transform", "translate(" + 20 + "," + 20 + ")");

// Add legend items
var legendItems = legend.selectAll(".legend-item")
.data(mappedComorbidities)
.enter().append("g")
.attr("class", "legend-item")
.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legendItems.append("rect")
.attr("class", "legend-color")
.attr("x", 0)
.attr("y", 0)
.attr("width", 12)
.attr("height", 12)
.style("fill", function(d) { return colorScale(d); });

legendItems.append("text")
.attr("x", 18)
.attr("y", 9)
.attr("dy", ".35em")
.style("text-anchor", "start")
.text(function(d) { return d; });
}
// Draw lines function
function drawLines(bundled) {
    svg.selectAll(".line").remove();
    if (bundled) {
        var kdeeb = d3.ForceEdgeBundling()
            .step_size(0.2)
            .compatibility_threshold(0.6)
            .nodes(nodes)
            .edges(edges);
        var results = kdeeb();
        svg.selectAll(".line")
            .data(results)
            .enter()
            .append("path")
            .attr("class", "line")
            .attr("data-index", function(d, i) { return i; })
            .attr("d", function(d) {
                var path = d3.path();
                path.moveTo(d[0].x, d[0].y);
                for (var i = 1; i < d.length; i++) {
                    path.lineTo(d[i].x, d[i].y);
                }
                return path.toString();
            })
            .style("stroke", function(d, i) { return colorScale(edges[i].class); });
    }
    
    svg.selectAll(".line")
        .data(data)
        .enter().append("path")
        .attr("class", "line")
        .attr("d", function(d) {
            return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
        })
        .style("stroke", function(d) { return colorScale(d.Comorbidities); });
}

// Toggle bundling function
var bundled = false;
function toggleBundling() {
    bundled = !bundled;
    drawLines(bundled);
}

// Initial drawing
drawAxis();
drawLines(bundled);
drawLegend();
// Bind button click event
document.getElementById("toggleBundling").addEventListener("click", toggleBundling);
});
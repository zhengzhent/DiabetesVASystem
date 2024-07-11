function drawChart1(){
    var data = [
        { axis: "BMI", value: 0.03575837140741426 },
        { axis: "Total Cholestero", value: 0.04226590811344324 },
        { axis: "Age", value: 0.05047677192450276 },
        { axis: "Weight", value: 0.04030900716587742 },
        { axis: "HDLC", value: 0.037197568712670374 },
        { axis: "Heigh", value: 0.038578074512063416 },
        { axis: "SmokHistory", value: 0.037575195418321994 }
    ];
// 提取所有值
const values = data.map(item => item.value);

// 找到最小值和最大值
const min = Math.min(...values);
const max = Math.max(...values);

// 归一化函数，将值归一化到0到0.5之间
const normalize = (value, min, max) => 0.5 * (value - min*0.9) / (max - min);

// 对每个数据点进行归一化
const normalizedData = data.map(item => ({
    axis: item.axis,
    value: normalize(item.value, min, max)
}));
    data = normalizedData

    const width = 820; // 调整宽度
    const height = 500; // 调整高度
    const margin = { top: 50, right: 50, bottom: 30, left: 50 };
    const radius = Math.min(width, height) / 2 - Math.max(margin.top, margin.right, margin.bottom, margin.left);

    // 创建SVG容器
    const svg = d3.select("#radius")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // 创建比例尺
    const angleSlice = Math.PI * 2 / data.length;
    const rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, 0.5]); // 调整比例尺的最大值以增大多边形的面积

    // 创建六边形背景层次
    const levels = 5;
    const colors = ["#f2f2f2", "#e6e6e6", "#cccccc", "#b3b3b3", "#999999"];
    for (let i = levels; i > 0; i--) {
        const levelFactor = radius * (i / levels);
        const points = data.map((d, j) => {
            const x = levelFactor * Math.cos(angleSlice * j - Math.PI / 2);
            const y = levelFactor * Math.sin(angleSlice * j - Math.PI / 2);
            return [x, y];
        });

        svg.append("polygon")
            .attr("points", points.map(d => d.join(",")).join(" "))
            .attr("fill", colors[i - 1])
            .attr("stroke", "none")
            .attr("opacity", 0.3);
    }

    // 绘制轴
    const axisGrid = svg.append("g").attr("class", "axisWrapper");

    const axis = axisGrid.selectAll(".axis")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => rScale(0.5) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => rScale(0.5) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-width", "2px");

    // 添加指标标签
    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "15px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => rScale(0.6) * Math.cos(angleSlice * i - Math.PI / 2)) // 调整标签位置
        .attr("y", (d, i) => rScale(0.6) * Math.sin(angleSlice * i - Math.PI / 2)) // 调整标签位置
        .attr("fill", "white")
        .text(d => d.axis);

    // 绘制雷达图区域
    const radarLine = d3.lineRadial()
        .radius(d => rScale(d.value))
        .angle((d, i) => i * angleSlice);

    const radarWrapper = svg.append("g").attr("class", "radarWrapper");

    radarWrapper.append("path")
        .datum(data)
        .attr("class", "radarArea")
        .attr("d", radarLine)
        .style("fill", "rgba(0, 150, 200, 0.5)")
        .style("stroke", "rgba(0, 150, 200, 0.7)")
        .style("stroke-width", 2);

    // 添加顶点小圆，其半径表示数值大小
    radarWrapper.selectAll(".radarCircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r", d => rScale(d.value) * 0.09) // 小圆的半径根据数值大小比例缩放
        .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2));


    // 添加数值标签
    radarWrapper.selectAll(".radarValue")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "radarValue")
        .attr("x", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2) - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .text(d => d.value.toFixed(4));
}

function drawChart2(){
    var data = [
        { axis: "BMI", value: 0.03470607683445969 },
        { axis: "Total Cholestero", value: 0.04135959398661112 },
        { axis: "Age", value: 0.05666315057693745 },
        { axis: "Weight", value: 0.04077615193818655 },
        { axis: "HDLC", value: 0.03836038301967904 },
        { axis: "Height", value: 0.037630474935548594 },
        { axis: "SmokingHistory", value: 0.037274160026708955 }
    ];

    const width = 820; // 调整宽度
    const height = 500  ; // 调整高度
    const margin = { top: 50, right: 50, bottom: 30, left: 50 };
    const radius = Math.min(width, height) / 2 - Math.max(margin.top, margin.right, margin.bottom, margin.left);
    const values = data.map(item => item.value);

// 找到最小值和最大值
const min = Math.min(...values);
const max = Math.max(...values);

// 归一化函数，将值归一化到0到0.5之间
const normalize = (value, min, max) => 0.5 * (value - min*0.9) / (max - min);

// 对每个数据点进行归一化
const normalizedData = data.map(item => ({
    axis: item.axis,
    value: normalize(item.value, min, max)
}));
    data = normalizedData
    // 创建SVG容器
    const svg = d3.select("#radius")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // 创建比例尺
    const angleSlice = Math.PI * 2 / data.length;
    const rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, 0.5]); // 调整比例尺的最大值以增大多边形的面积

    // 创建六边形背景层次
    const levels = 5;
    const colors = ["#f2f2f2", "#e6e6e6", "#cccccc", "#b3b3b3", "#999999"];
    for (let i = levels; i > 0; i--) {
        const levelFactor = radius * (i / levels);
        const points = data.map((d, j) => {
            const x = levelFactor * Math.cos(angleSlice * j - Math.PI / 2);
            const y = levelFactor * Math.sin(angleSlice * j - Math.PI / 2);
            return [x, y];
        });

        svg.append("polygon")
            .attr("points", points.map(d => d.join(",")).join(" "))
            .attr("fill", colors[i - 1])
            .attr("stroke", "none")
            .attr("opacity", 0.3);
    }

    // 绘制轴
    const axisGrid = svg.append("g").attr("class", "axisWrapper");

    const axis = axisGrid.selectAll(".axis")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => rScale(0.5) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => rScale(0.5) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-width", "2px");

    // 添加指标标签
    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => rScale(0.6) * Math.cos(angleSlice * i - Math.PI / 2)) // 调整标签位置
        .attr("y", (d, i) => rScale(0.6) * Math.sin(angleSlice * i - Math.PI / 2)) // 调整标签位置
        .attr("fill", "white")
        .text(d => d.axis);

    // 绘制雷达图区域
    const radarLine = d3.lineRadial()
        .radius(d => rScale(d.value))
        .angle((d, i) => i * angleSlice);

    const radarWrapper = svg.append("g").attr("class", "radarWrapper");

    radarWrapper.append("path")
        .datum(data)
        .attr("class", "radarArea")
        .attr("d", radarLine)
        .style("fill", "rgba(0, 150, 200, 0.5)")
        .style("stroke", "rgba(0, 150, 200, 0.7)")
        .style("stroke-width", 2);

    // 添加顶点小圆，其半径表示数值大小
    radarWrapper.selectAll(".radarCircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r", d => rScale(d.value) * 0.09) // 小圆的半径根据数值大小比例缩放
        .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2));


    // 添加数值标签
    radarWrapper.selectAll(".radarValue")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "radarValue")
        .attr("x", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2) - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .text(d => d.value.toFixed(4));
}

function drawChart3(){
    var data = [
        { axis: "BMI", value: 0.03896161209829686 },
        { axis: "Total Cholestero", value: 0.028002270120143818 },
        { axis: "Age", value: 0.04239389234404776 },
        { axis: "Weight", value: 0.039874241228286075 },
        { axis: "HDLC", value: 0.03787327121907167 },
        { axis: "Height", value: 0.03868028345961063 },
        { axis: "SmokingHistory", value: 0.038784258793837206 }
    ];
    const values = data.map(item => item.value);

// 找到最小值和最大值
const min = Math.min(...values);
const max = Math.max(...values);

// 归一化函数，将值归一化到0到0.5之间
const normalize = (value, min, max) => 0.5 * (value - min*0.9) / (max - min);

// 对每个数据点进行归一化
const normalizedData = data.map(item => ({
    axis: item.axis,
    value: normalize(item.value, min, max)
}));
    data = normalizedData

    const width = 820; // 调整宽度
    const height = 500; // 调整高度
    const margin = { top: 50, right: 50, bottom: 30, left: 50 };
    const radius = Math.min(width, height) / 2 - Math.max(margin.top, margin.right, margin.bottom, margin.left);

    // 创建SVG容器
    const svg = d3.select("#radius")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // 创建比例尺
    const angleSlice = Math.PI * 2 / data.length;
    const rScale = d3.scaleLinear()
        .range([0, radius])
        .domain([0, 0.5]); // 调整比例尺的最大值以增大多边形的面积

    // 创建六边形背景层次
    const levels = 5;
    const colors = ["#f2f2f2", "#e6e6e6", "#cccccc", "#b3b3b3", "#999999"];
    for (let i = levels; i > 0; i--) {
        const levelFactor = radius * (i / levels);
        const points = data.map((d, j) => {
            const x = levelFactor * Math.cos(angleSlice * j - Math.PI / 2);
            const y = levelFactor * Math.sin(angleSlice * j - Math.PI / 2);
            return [x, y];
        });

        svg.append("polygon")
            .attr("points", points.map(d => d.join(",")).join(" "))
            .attr("fill", colors[i - 1])
            .attr("stroke", "none")
            .attr("opacity", 0.3);
    }

    // 绘制轴
    const axisGrid = svg.append("g").attr("class", "axisWrapper");

    const axis = axisGrid.selectAll(".axis")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => rScale(0.5) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => rScale(0.5) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-width", "2px");

    // 添加指标标签
    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => rScale(0.6) * Math.cos(angleSlice * i - Math.PI / 2)) // 调整标签位置
        .attr("y", (d, i) => rScale(0.6) * Math.sin(angleSlice * i - Math.PI / 2)) // 调整标签位置
        .attr("fill", "white")
        .text(d => d.axis);

    // 绘制雷达图区域
    const radarLine = d3.lineRadial()
        .radius(d => rScale(d.value))
        .angle((d, i) => i * angleSlice);

    const radarWrapper = svg.append("g").attr("class", "radarWrapper");

    radarWrapper.append("path")
        .datum(data)
        .attr("class", "radarArea")
        .attr("d", radarLine)
        .style("fill", "rgba(0, 150, 200, 0.5)")
        .style("stroke", "rgba(0, 150, 200, 0.7)")
        .style("stroke-width", 2);

    // 添加顶点小圆，其半径表示数值大小
    radarWrapper.selectAll(".radarCircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r", d => rScale(d.value) * 0.08) // 小圆的半径根据数值大小比例缩放
        .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2));


    // 添加数值标签
    radarWrapper.selectAll(".radarValue")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "radarValue")
        .attr("x", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2) - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .text(d => d.value.toFixed(4));
}


function graph1(){
    var myChart = echarts.init(document.getElementById('t2gform'));
    // 读取 JSON 数据
    fetch('./assets1/staticdata/graph_analysis_output_0.json')
    .then(response => response.json())
    .then(data => {
        // 获取所有节点的symbolSize值用于归一化
        const symbolSizes = data.nodes.map(node => node.symbolSize);
        const minSymbolSize = Math.min(...symbolSizes);
        const maxSymbolSize = Math.max(...symbolSizes);

        // 归一化函数
        const normalize = (value) => {
            if (maxSymbolSize === minSymbolSize) {
                return 1; // 避免除以零的情况
            }
            return (value - minSymbolSize) / (maxSymbolSize - minSymbolSize);
        };

        // 类别颜色映射
        const categoryColors = ['#FBEA2E', '#4F99C9', '#A8D3A0', '#EC3E31'];

        // 使用数据生成图表
        var option = {
            title: {
                text: 'feature_graph',
                top: 'top',
                left: 'center',
                textStyle: {
                    color: '#ffffff', // 字体颜色调白
                    fontSize: 20 // 字体大小调大
                }
            },
            tooltip: {},
            legend: [{
                data: data.categories.map(function (a) {
                    return a.name;
                }),
                bottom: 10,
                textStyle: {
                    color: '#ffffff', // 图例字体颜色调白
                    fontSize: 14 // 图例字体大小调大
                }
            }],
            series: [
                {
                    name: 'feature_graph',
                    type: 'graph',
                    layout: 'none',
                    data: data.nodes.map(node => {
                        const normalizedSize = normalize(node.symbolSize) * 5; // 归一化并放大
                        return {
                            ...node,
                            symbolSize: normalizedSize * 10,
                            itemStyle: {
                                color: categoryColors[node.category] // 根据类别设置颜色
                            },
                            label: {
                                show: true,
                                fontSize: Math.max(10, normalizedSize * 10),
                                color: '#ffffff' // 动态调整标签字体颜色
                            }
                        };
                    }),
                    links: data.links,
                    categories: data.categories.map((category, index) => ({
                        ...category,
                        itemStyle: {
                            color: categoryColors[index] // 设置类别颜色
                        }
                    })),
                    roam: true,
                    label: {
                        position: 'right'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.4
                    }
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option);
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });
}


function graph2(){
    var myChart = echarts.init(document.getElementById('t2gform'));
    // 读取 JSON 数据
    fetch('./assets1/staticdata/graph_analysis_output_1.json')
    .then(response => response.json())
    .then(data => {
        // 获取所有节点的symbolSize值用于归一化
        const symbolSizes = data.nodes.map(node => node.symbolSize);
        const minSymbolSize = Math.min(...symbolSizes);
        const maxSymbolSize = Math.max(...symbolSizes);

        // 归一化函数
        const normalize = (value) => {
            if (maxSymbolSize === minSymbolSize) {
                return 1; // 避免除以零的情况
            }
            return (value - minSymbolSize) / (maxSymbolSize - minSymbolSize);
        };

        // 类别颜色映射
        const categoryColors = ['#FBEA2E', '#4F99C9', '#A8D3A0', '#EC3E31'];

        // 使用数据生成图表
        var option = {
            title: {
                text: 'feature_graph',
                top: 'top',
                left: 'center',
                textStyle: {
                    color: '#ffffff', // 字体颜色调白
                    fontSize: 20 // 字体大小调大
                }
            },
            tooltip: {},
            legend: [{
                data: data.categories.map(function (a) {
                    return a.name;
                }),
                bottom: 10,
                textStyle: {
                    color: '#ffffff', // 图例字体颜色调白
                    fontSize: 14 // 图例字体大小调大
                }
            }],
            series: [
                {
                    name: 'feature_graph',
                    type: 'graph',
                    layout: 'none',
                    data: data.nodes.map(node => {
                        const normalizedSize = normalize(node.symbolSize) * 5; // 归一化并放大
                        return {
                            ...node,
                            symbolSize: normalizedSize * 10,
                            itemStyle: {
                                color: categoryColors[node.category] // 根据类别设置颜色
                            },
                            label: {
                                show: true,
                                fontSize: Math.max(10, normalizedSize * 10),
                                color: '#ffffff' // 动态调整标签字体颜色
                            }
                        };
                    }),
                    links: data.links,
                    categories: data.categories.map((category, index) => ({
                        ...category,
                        itemStyle: {
                            color: categoryColors[index] // 设置类别颜色
                        }
                    })),
                    roam: true,
                    label: {
                        position: 'right'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.4
                    }
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option);
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });
}


function graph3(){
    var myChart = echarts.init(document.getElementById('t2gform'));
    // 读取 JSON 数据
    fetch('./assets1/staticdata/graph_analysis_output_2.json')
    .then(response => response.json())
    .then(data => {
        // 获取所有节点的symbolSize值用于归一化
        const symbolSizes = data.nodes.map(node => node.symbolSize);
        const minSymbolSize = Math.min(...symbolSizes);
        const maxSymbolSize = Math.max(...symbolSizes);

        // 归一化函数
        const normalize = (value) => {
            if (maxSymbolSize === minSymbolSize) {
                return 1; // 避免除以零的情况
            }
            return (value - minSymbolSize) / (maxSymbolSize - minSymbolSize);
        };

        // 类别颜色映射
        const categoryColors = ['#FBEA2E', '#4F99C9', '#A8D3A0', '#EC3E31'];

        // 使用数据生成图表
        var option = {
            title: {
                text: 'feature_graph',
                top: 'top',
                left: 'center',
                textStyle: {
                    color: '#ffffff', // 字体颜色调白
                    fontSize: 20 // 字体大小调大
                }
            },
            tooltip: {},
            legend: [{
                data: data.categories.map(function (a) {
                    return a.name;
                }),
                bottom: 10,
                textStyle: {
                    color: '#ffffff', // 图例字体颜色调白
                    fontSize: 14 // 图例字体大小调大
                }
            }],
            series: [
                {
                    name: 'feature_graph',
                    type: 'graph',
                    layout: 'none',
                    data: data.nodes.map(node => {
                        const normalizedSize = normalize(node.symbolSize) * 5; // 归一化并放大
                        return {
                            ...node,
                            symbolSize: normalizedSize * 10,
                            itemStyle: {
                                color: categoryColors[node.category] // 根据类别设置颜色
                            },
                            label: {
                                show: true,
                                fontSize: Math.max(10, normalizedSize * 6.5),
                                color: '#ffffff' // 动态调整标签字体颜色
                            }
                        };
                    }),
                    links: data.links,
                    categories: data.categories.map((category, index) => ({
                        ...category,
                        itemStyle: {
                            color: categoryColors[index] // 设置类别颜色
                        }
                    })),
                    roam: true,
                    label: {
                        position: 'right'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.4
                    }
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option);
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });
}





function handleRowClick(event) {
    const comorbidities = event.currentTarget.cells[7].innerText; // Get the Comorbidities value
    console.log(comorbidities);

    d3.select("#radius").selectAll("*").remove();

    if (comorbidities === 'No') {
        drawChart1();
        graph1();
    } else if (comorbidities === 'few') {
        drawChart2();
        graph2();
    } else if (comorbidities === 'Numerous') {
        drawChart3();
        graph3();
    }
}

$(document).ready(function() {
    const table = $('#example').DataTable();

    // 为表格行添加事件监听器
    $('#example tbody').on('click', 'tr', function(event) {
        handleRowClick(event);
    });
});
function drawChart1(){
    //下图  无并发症
    var data = [
        { axis: "BMI", value: 0.033912789949410396 },
        { axis: "Total Cholestero", value: 0.03752143305837681 },
        { axis: "Age", value: 0.035428206647068326 },
        { axis: "HbA1c", value: 0.04023312598524471 },
        { axis: "HDLC", value: 0.034485360932825664 },
        { axis: "Heigh", value: 0.038578074512063416 },
        { axis: "SmokHistory", value: 0.03834008031439394 }
    ];
// 提取所有值
const values = data.map(item => item.value);

// 找到最小值和最大值
const min = Math.min(...values);
const max = Math.max(...values);

// 归一化函数，将值归一化到0到0.5之间
const normalize = (value, min, max) => 0.3 * (value - min*0.9) / (max - min);

// 对每个数据点进行归一化
const normalizedData = data.map(item => ({
    axis: item.axis,
    value: normalize(item.value, min, max)
}));
    data = normalizedData

    const width = 900; // 调整宽度
    const height = 550; // 调整高度
    const margin = { top: 80, right: 50, bottom: 50, left: 50 };
    const radius = Math.min(width, height) / 2 - Math.max(margin.top, margin.right, margin.bottom, margin.left);

    
    // 创建SVG容器
    const svg = d3.select("#radius-none")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`); // 左移和上移调整
    
        // 添加标题
    svg.append("text")
        .attr("x", -5)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "start")
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .style("fill", "white") // 设置字体颜色为白色
        .text("Complications");
    // 创建雷达图容器
    const radarGroup = svg.append("g")
        .attr("transform", `translate(${width / 2 - margin.left}, ${height / 2 - margin.top})`); // 调整雷达图位置
    
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

        radarGroup.append("polygon")
            .attr("points", points.map(d => d.join(",")).join(" "))
            .attr("fill", colors[i - 1])
            .attr("stroke", "none")
            .attr("opacity", 0.3);
    }

    // 绘制轴
    const axisGrid = radarGroup.append("g").attr("class", "axisWrapper");

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

    const radarWrapper = radarGroup.append("g").attr("class", "radarWrapper");

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
        .attr("x", (d, i) => (rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)) * 1.2) // 调整标签位置，乘以常数1.2
        .attr("y", (d, i) => (rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)) * 1.2) // 调整标签位置，乘以常数1.2
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .text(d => d.value.toFixed(4));

}

function drawChart2() {
    // 上图 有并发症
    var data = [
        { axis: "BMI", value: 0.03465619616546316 },
        { axis: "Total Cholestero", value: 0.03461175499440055 },
        { axis: "Age", value: 0.05666315057693745 },
        { axis: "HbA1c", value: 0.033375770311231616 },
        { axis: "HDLC", value: 0.03836038301967904 },
        { axis: "Height", value: 0.04169885024653397 },
        { axis: "SmokingHistory", value: 0.03777191515038214 }
    ];

    const width = 900; // 调整宽度
    const height = 550; // 调整高度
    const margin = { top: 80, right: 50, bottom: 50, left: 20 }; // 调整左边距
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
    data = normalizedData;

    // 创建SVG容器
    const svg = d3.select("#radius")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`); // 左移和上移调整

    // 添加标题
    svg.append("text")
        .attr("x", 0)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "start")
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .style("fill", "white") // 设置字体颜色为白色
        .text("No complications");

    // 创建雷达图容器
    const radarGroup = svg.append("g")
        .attr("transform", `translate(${width / 2 - margin.left}, ${height / 2 - margin.top})`); // 调整雷达图位置

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

        radarGroup.append("polygon")
            .attr("points", points.map(d => d.join(",")).join(" "))
            .attr("fill", colors[i - 1])
            .attr("stroke", "none")
            .attr("opacity", 0.3);
    }

    // 绘制轴
    const axisGrid = radarGroup.append("g").attr("class", "axisWrapper");

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
        .attr("fill", "white") // 设置字体颜色为白色
        .text(d => d.axis);

    // 绘制雷达图区域
    const radarLine = d3.lineRadial()
        .radius(d => rScale(d.value))
        .angle((d, i) => i * angleSlice);

    const radarWrapper = radarGroup.append("g").attr("class", "radarWrapper");

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

    // 添加数值标签，并且单独处理 BMI 标签的位置
    radarWrapper.selectAll(".radarValue")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "radarValue")
        .attr("x", (d, i) => {
            if (d.axis === "BMI") {
                return (rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)) * 1.2;
            }
            return (rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)) * 1.2;
        })
        .attr("y", (d, i) => {
            if (d.axis === "BMI") {
                return (rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)) * 1.5; // 向上移动
            }
            return (rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)) * 0.9;
        })
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
        .style("fill", "white") // 设置字体颜色为白色
        .text(d => d.value.toFixed(4));
}



document.addEventListener("DOMContentLoaded", function() {
    drawChart1();
    drawChart2();
});

function graph(id) {
    console.log(`Graph function called with ID: ${id}`);
    var myChart = echarts.init(document.getElementById('t2gform'));

    // 构建文件路径
    const filePath = `./assets1/staticdata/patientdata/Comorbidities10_shanghai_patient_${id}_graph_analysis_output.json`;
    console.log(`Fetching data from: ${filePath}`);

    // 读取 JSON 数据
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched successfully', data);

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

            // 使用数据生成图表
            var option = {
                title: {
                    text: 'Feature Graph',
                    top: 'top',
                    left: 'center',
                    textStyle: {
                        color: '#ffffff', // 字体颜色调白
                        fontSize: 25 // 字体大小调大
                    }
                },
                tooltip: {},
                legend: {
                    data: data.categories.map(function (a) {
                        return a.name;
                    }),
                    bottom: '30', // 向下移动
                    textStyle: {
                        color: '#ffffff', // 字体颜色调白
                        fontSize: 15 // 字体大小调大
                    }
                },
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
                                label: {
                                    show: true,
                                    fontSize: Math.max(20, normalizedSize * 7), // 动态调整标签字体大小
                                    color: '#ffffff' // 节点标签颜色调白
                                }
                            };
                        }),
                        links: data.links,
                        categories: data.categories,
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
    const comorbidities = event.currentTarget.cells[7].innerText;
    const patientId = event.currentTarget.cells[0].innerText;
    graph(patientId); // Get the Comorbidities value
    console.log(patientId);


}

$(document).ready(function() {
    const table = $('#example').DataTable();

    // 为表格行添加事件监听器
    $('#example tbody').on('click', 'tr', function(event) {
        handleRowClick(event);
    });
});
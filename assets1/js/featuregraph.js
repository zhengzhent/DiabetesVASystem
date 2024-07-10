function graph1(){
    document.addEventListener("DOMContentLoaded", function() {
        // 基于准备好的容器初始化 ECharts 实例
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

                // 使用数据生成图表
                var option = {
                    title: {
                        text: 'feature_graph',
                        top: 'top',
                        left: 'center',
                        textStyle: {
                            color: '#ffffff', // 字体颜色调白
                            fontSize: 15 // 字体大小调大
                        }
                    },
                    tooltip: {},
                    legend: [{
                        data: data.categories.map(function (a) {
                            return a.name;
                        })
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
                                    label: {
                                        show: true,
                                        fontSize: Math.max(10, normalizedSize / 2) // 动态调整标签字体大小
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
    });
}

function graph2(){
    document.addEventListener("DOMContentLoaded", function() {
        // 基于准备好的容器初始化 ECharts 实例
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

                // 使用数据生成图表
                var option = {
                    title: {
                        text: 'feature_graph',
                        top: 'top',
                        left: 'center'
                    },
                    tooltip: {},
                    legend: [{
                        data: data.categories.map(function (a) {
                            return a.name;
                        })
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
                                    label: {
                                        show: true,
                                        fontSize: Math.max(10, normalizedSize / 2) // 动态调整标签字体大小
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
    });
}

function graph3(){
    document.addEventListener("DOMContentLoaded", function() {
        // 基于准备好的容器初始化 ECharts 实例
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

                // 使用数据生成图表
                var option = {
                    title: {
                        text: 'feature_graph',
                        top: 'top',
                        left: 'center'
                    },
                    tooltip: {},
                    legend: [{
                        data: data.categories.map(function (a) {
                            return a.name;
                        })
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
                                    label: {
                                        show: true,
                                        fontSize: Math.max(10, normalizedSize / 2) // 动态调整标签字体大小
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
    });
}

function handleRowClick_grpah(event) {
    const comorbidities1 = event.currentTarget.cells[7].innerText; // Get the Comorbidities value
    console.log(comorbidities1);

    d3.select("#radius").selectAll("*").remove();

    if (comorbidities1 === 'No') {
        graph1();
    } else if (comorbidities1 === 'few') {
        graph2();
    } else if (comorbidities1 === 'Numerous') {
        graph3();
    }
}

$(document).ready(function() {
    const table = $('#example').DataTable();

    // 为表格行添加事件监听器
    $('#example tbody').on('click', 'tr', function(event) {
        handleRowClick_grpah(event);
    });
});
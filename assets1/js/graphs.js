function graph1(){
    var myChart = echarts.init(document.getElementById('graph-None'));
    // 读取 JSON 数据
    fetch('./assets1/staticdata/graphss_analysis_output_0.json')
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
        const categoryColors = ['#FBEA2E', '#4F99C9', '#A8D3A0', '#b44d58'];

        // 按symbolSize对节点排序，并选择前7个节点
        const topNodes = data.nodes
            .map((node, index) => ({ ...node, index }))
            .sort((a, b) => b.symbolSize - a.symbolSize)
            .slice(0, 7)
            .map(node => node.index);

        // 使用数据生成图表
        var option = {
            title: {
                text: 'No Complications',
                top: '10px',
                left: '10px',
                textStyle: {
                    color: '#ffffff', // 字体颜色调白
                    fontSize: 25 // 字体大小调大
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
                    data: data.nodes.map((node, index) => {
                        const normalizedSize = normalize(node.symbolSize) * 5; // 归一化并放大
                        return {
                            ...node,
                            symbolSize: normalizedSize * 5,
                            itemStyle: {
                                color: categoryColors[node.category] // 根据类别设置颜色
                            },
                            label: {
                                show: topNodes.includes(index), // 仅显示前7个节点的名字
                                fontSize: Math.max(10, normalizedSize * 5),
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
    var myChart = echarts.init(document.getElementById('graph-Com'));
    // 读取 JSON 数据
    fetch('./assets1/staticdata/graphss_analysis_output_1.json')
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
        const categoryColors = ['#FBEA2E', '#4F99C9', '#A8D3A0', '#b44d58'];

        // 按symbolSize对节点排序，并选择前7个节点
        const topNodes = data.nodes
            .map((node, index) => ({ ...node, index }))
            .sort((a, b) => b.symbolSize - a.symbolSize)
            .slice(0, 7)
            .map(node => node.index);

        // 使用数据生成图表
        var option = {
            title: {
                text: 'Complications',
                top: '10px',
                left: '10px',
                textStyle: {
                    color: '#ffffff', // 字体颜色调白
                    fontSize: 25 // 字体大小调大
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
                    data: data.nodes.map((node, index) => {
                        const normalizedSize = normalize(node.symbolSize) * 5; // 归一化并放大
                        return {
                            ...node,
                            symbolSize: normalizedSize * 5,
                            itemStyle: {
                                color: categoryColors[node.category] // 根据类别设置颜色
                            },
                            label: {
                                show: topNodes.includes(index), // 仅显示前7个节点的名字
                                fontSize: Math.max(10, normalizedSize * 5),
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



document.addEventListener("DOMContentLoaded", function() {
    graph1();
    graph2();
});
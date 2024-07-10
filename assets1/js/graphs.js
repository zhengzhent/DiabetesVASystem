var myChart = echarts.init(document.getElementById('graphs'));

// 异步加载数据
var option;

option = {
backgroundColor: 'rgba(0,0,0,0)',

toolbox: {
show: true,
feature: {
mark: { show: true },
dataView: { show: true, readOnly: false },
restore: { show: true },
saveAsImage: { show: true },

}
},
tooltip: {
trigger: 'item'
},
series: [
{
name: 'Patient profile',
type: 'pie',
radius: [50, 250],
center: ['50%', '50%'],
roseType: 'area',
itemStyle: {
borderRadius: 8
},
data: [
{ value: 52, name: 'level 1' },
{ value: 10, name: 'level 2' },
{ value: 5, name: 'level 3' }
]
}
]
};
    myChart.setOption(option);
  myChart.on('click', function (params) {
    // 处理点击事件，并在图表2中显示相应内容
    console.log(params);
    switch (params.name) {
        case 'level 1':
            // 加载 level 1 的数据
            updateGraph1(params.name)
            break;
        case 'level 2':
            // 加载 level 2 的数据
            updateGraph1(params.name);
            break;
        case 'level 3':
            // 加载 level 3 的数据
            updateGraph1(params.name);
            break;
        default:
            // 默认加载的数据
            updateGraph1(params.name);
    }
});
function updateGraph1(categoryName){
  var myChart = echarts.init(document.getElementById('graphs'));
myChart.showLoading();

// 使用 jQuery 的 $.get 方法获取 GEXF 文件数据
$.get('assets1/staticdata/level1.gexf', function (xml) {
    myChart.hideLoading();

    var graph = echarts.dataTool.gexf.parse(xml);
    var categories = [];
    var categories = [
        { name: '社区1', itemStyle: { color: '#10ff1b' } },  // 绿色
        { name: '社区2', itemStyle: { color: '#90d7ec' } },   // 蓝色
        { name: '社区3', itemStyle: { color: '#ffe600' } }, // 黄色
        { name: '社区4', itemStyle: { color: '#6950a1' } }  // 紫色
    ];

    graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.value = node.symbolSize;
        node.category = node.attributes.class;
    });



    var option = {
      backgroundColor: 'rgba(0,0,0,0)',

        tooltip: {},
        legend: [{
            data: categories.map(function (a) {
                return a.name;
            })
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: 'Graph Visualization',
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                categories: categories,
                roam: true,
                focusNodeAdjacency: true,

            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            lineStyle: {
            normal: {
                color: 'source',
                opacity: 0.15, 
                curveness: 0.3
            }
        }
            }
        ]
    };

    myChart.setOption(option);
}, 'xml');
}

function updateGraph2(categoryName){
  var myChart = echarts.init(document.getElementById('graphs'));
myChart.showLoading();

// 使用 jQuery 的 $.get 方法获取 GEXF 文件数据
$.get('assets1/staticdata/level2.gexf', function (xml) {
    myChart.hideLoading();

    var graph = echarts.dataTool.gexf.parse(xml);
    var categories = [];
    var categories = [
        { name: '社区1', itemStyle: { color: '#10ff1b' } },  // 绿色
        { name: '社区2', itemStyle: { color: '#90d7ec' } },   // 蓝色
        { name: '社区3', itemStyle: { color: '#ffe600' } }, // 黄色
        { name: '社区4', itemStyle: { color: '#6950a1' } }  // 紫色
    ];

    graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.value = node.symbolSize;
        node.category = node.attributes.class;
    });



    var option = {
      backgroundColor: 'rgba(0,0,0,0)',

        tooltip: {},
        legend: [{
            data: categories.map(function (a) {
                return a.name;
            })
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: 'Graph Visualization',
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                categories: categories,
                roam: true,
                focusNodeAdjacency: true,

            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            lineStyle: {
            normal: {
                color: 'source',
                opacity: 0.15, 
                curveness: 0.3
            }
        }
            }
        ]
    };

    myChart.setOption(option);
}, 'xml');
}

function updateGraph3(categoryName){
  var myChart = echarts.init(document.getElementById('graphs'));
myChart.showLoading();

// 使用 jQuery 的 $.get 方法获取 GEXF 文件数据
$.get('assets1/staticdata/level3.gexf', function (xml) {
    myChart.hideLoading();

    var graph = echarts.dataTool.gexf.parse(xml);
    var categories = [];
    var categories = [
        { name: '社区1', itemStyle: { color: '#10ff1b' } },  // 绿色
        { name: '社区2', itemStyle: { color: '#90d7ec' } },   // 蓝色
        { name: '社区3', itemStyle: { color: '#ffe600' } }, // 黄色
        { name: '社区4', itemStyle: { color: '#6950a1' } }  // 紫色
    ];

    graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.value = node.symbolSize;
        node.category = node.attributes.class;
    });



    var option = {
      backgroundColor: 'rgba(0,0,0,0)',

        tooltip: {},
        legend: [{
            data: categories.map(function (a) {
                return a.name;
            })
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: 'Graph Visualization',
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                categories: categories,
                roam: true,
                focusNodeAdjacency: true,

            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            lineStyle: {
            normal: {
                color: 'source',
                opacity: 0.15, 
                curveness: 0.3
            }
        }
            }
        ]
    };

    myChart.setOption(option);
}, 'xml');
}


// 初始化图表对象
var chart = echarts.init(document.getElementById('sickriskchart'));
var data = [
    [0,0,30],
    [1,0,6],
    [2,0,2],
    [0,1,22],
    [1,1,4],
    [2,1,3],
    [0,2,33],
    [1,2,5],
    [2,2,3],
    [0,3,19],
    [1,3,5],
    [2,3,2],
    [0,4,5],
    [1,4,2],
    [2,4,1],
    [0,5,47],
    [1,5,9],
    [2,5,3],
    [0,6,24],
    [1,6,6],
    [2,6,4],
    [0,7,28],
    [1,7,4],
    [2,7,1],
    [0,8,8],
    [1,8,2],
    [2,8,2],
    [0,9,44],
    [1,9,8],
    [2,9,3]
    ]
    var hours = ['1级', '2级', '3级'];
    var days = ['男', '女', 'BMI异常组', 'BMI正常组', '有家族史组','无家族史组','有高血压组','无高血压组','糖化血红蛋白较高组','糖化血红蛋白较低组'];
// 图表1配置
var option1s = {
    tooltip: {
        position: 'top',
        formatter: function(params) {
                return '类目：' + days[params.value[1]] + '<br/>' + '人数：' + params.data[2];
            }
        },
        animation: false,
        grid: {
            left: '2%',
            right: '15%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: hours,
            axisLine : {
                        lineStyle : {
                            color : '#FFFFFF'
                        }
                    },
                    axisLabel: {  
                   interval:0,  
                   rotate:20,
                   color: 'black'
                   
                } ,
                splitLine: {
              show: false  
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(0, 101, 175, 0)','rgba(17, 110, 189, 0.2)']
                }
            },
            
            name: '程度分级',
            nameLocation: 'end',
            nameTextStyle: {
                color: 'black',
            }
        },
        yAxis: {
            type: 'category',
            data: days,
            axisLine : {
                        lineStyle : {
                            color : '#fff'
                        }
                    },
                    axisLabel: {  
                   interval:0,  
                   rotate:20,
                   color: 'black'
                   
                } ,
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(0, 101, 175, 0)','rgba(17, 110, 189, 0.2)']
                }
            },
            name: '群体分组',
            nameTextStyle: {
                color: 'black' // 修改 y 轴名称颜色为黑色
            }
        },
        visualMap: {
            min: 1,
            max: 33,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '1%',
            text: ['33','1'],// 文本，默认为数值文本
            //color:['#20a0ff','#D2EDFF'],
            calculable: false,
            color: [
            '#FA6400', '#FC8E45', '#FBC42C','#CCE088','#5FD77E'
        ],
        textStyle: { // 调整文本样式
                    color: 'black'
                }
        },
        series: [{
            name: 'Punch Card',
            type: 'heatmap',
            data: data,
            label: {
                normal: {
                    show: true,
                    formatter: function (params) {
                        return params.data[2];
                    }
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 0, 0, 0.5)'
                }
            }
        }]
};
// prettier-ignore
const hours1 = [
    '性别', '家族史', '并发症', '高血压', '程度分级', '糖化血红蛋白高低', 'BMI高低'
];
// prettier-ignore
const days1 = [
'性别', '家族史', '并发症', '高血压', '程度分级', '糖化血红蛋白高低', 'BMI高低'
];
// prettier-ignore
const data1 = [[0, 0, 1], 
[0, 1, 0.143],
[0, 2, 0.042], 
[0, 3, 0.077], 
[0, 4, 0.046], 
[0, 5, 0.3], 
[0, 6, 0.2], 
[1,0,0.143],
[1,1,1],
[1,2,0.115],
[1,3,0.087],
[1,4,0.153],
[1,5,0.052],
[1,6,0.005],
[2,0,0.042],
[2,1,0.115],
[2,2,1],
[2,3,0.834],
[2,4,0.428],
[2,5,0.066],
[2,6,0.079],
[3,0,0.077],
[3,1,0.087],
[3,2,0.834],
[3,3,1],
[3,4,0.176],
[3,5,0.071],
[3,6,0.135],
[4,0,0.046],
[4,1,0.153],
[4,2,0.428],
[4,3,0.176],
[4,4,1],
[4,5,0.132],
[4,6,0.017],
[5,0,0.3],
[5,1,0.052],
[5,2,0.066],
[5,3,0.071],
[5,4,0.132],
[5,5,1],
[5,6,0.007],
[6,0,0.2],
[6,1,0.005],
[6,2,0.079],
[6,3,0.135],
[6,4,0.017],
[6,5,0.007],
[6,6,1]
]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
// 图表2配置  
var option2s = {
    tooltip: {
        position: 'top'
      },
      grid: {
        left: '2%',
        right: '15%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: hours1,
        splitArea: {
          show: true
        },
       axisLabel: {  
               interval:0,  
               rotate:20,
               color: 'black'
               
            }
      },
      yAxis: {
        type: 'category',
        data: days1,
        splitArea: {
          show: true
        },
        axisLabel: {  
               interval:0,  
               rotate:10,
               color: 'black'
               
            }
      },
      visualMap: {
        min: 0,
        max: 0.5,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
        inRange: {
                color: ['green','yellow', 'red']
            },
        show:false
      },
      series: [
        {
          name: 'Punch Card',
          type: 'heatmap',
          data: data1,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
};

// 默认显示图表1
chart.setOption(option1s); 

// 按钮点击事件
$('#button1').click(function() {
  chart.setOption(option1s);
});

$('#button2').click(function() {
  chart.setOption(option2s); 
});
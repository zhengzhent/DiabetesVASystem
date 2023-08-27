// exception.js

function createChartA() {
  var oldChart = echarts.getInstanceByDom(document.getElementById("exception1"));
  if (oldChart) {
    echarts.dispose(oldChart);
  }
    var mycharts = echarts.init(document.getElementById("exception1"));

    var data = [  { name: '高血压', value: 33 },
    { name: '脑血管病变', value: 3 },
    { name: '心血管病变', value: 8 },
    { name: '视网膜病变', value: 3 },
    { name: '糖尿病肾病', value: 2 },
    { name: '周围神经病变', value: 3 },
    { name: '糖尿病足', value: 1 },
    { name: '牙周病', value: 0 },
    { name: '皮肤感染', value: 1 },
    { name: '其他', value: 0 },
    { name: '糖尿病酮症（或酸中毒）', value: 3 },
    { name: '高渗性昏迷', value: 0 },
    { name: '乳酸性酸中毒', value: 0 }];
    var links = [  { source: '高血压', target: '脑血管病变', value: 3 },
    { source: '高血压', target: '心血管病变', value: 5 },
    { source: '高血压', target: '糖尿病肾病', value: 2 },
    { source: '高血压', target: '周围神经病变', value: 1 },
    { source: '高血压', target: '糖尿病足', value: 1 },
    { source: '高血压', target: '皮肤感染', value: 1 },
    { source: '高血压', target: '糖尿病酮症（或酸中毒）', value: 3 },
    { source: '脑血管病变', target: '糖尿病肾病', value: 1 },
    { source: '脑血管病变', target: '糖尿病酮症（或酸中毒）', value: 2 },
    { source: '视网膜病变', target: '周围神经病变', value: 2 },
    { source: '心血管病变', target: '周围神经病变', value: 1 },
    { source: '心血管病变', target: '糖尿病肾病', value: 1 },
    { source: '糖尿病肾病', target: '糖尿病酮症（或酸中毒）', value: 1 },
    { source: '糖尿病肾病', target: '糖尿病足', value: 1 }];
    var option = {  title: {
        text: '并发症关系图',
        subtext: 'Circular layout',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {},
      legend: [
        {
          data: data.map(function (a) {
            return a.name;
          })
        }
      ],
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: '当前疾病人数',
          type: 'graph',
          layout: 'circular',
          circular: {
            rotateLabel: true
          },
          data: data.map(function (item) {
            return {
              name: item.name,
              value: item.value,
              symbolSize: item.value *3, // 调整节点的大小
              itemStyle: {
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                  offset: 0,
                  color: 'rgba(129, 227, 238, 1)' // 起始节点颜色
                }, {
                  offset: 1,
                  color: 'rgba(25, 13, 207, 1)' // 终点节点颜色
                }])
              }
            };
          }),
          links: links.map(function (item) {
            return {
              source: item.source,
              target: item.target,
              value: item.value,
              lineStyle: {
                width: item.value*2, // 调整边的宽度
                color: function () {
                  var sourceNode = data.find(function (node) {
                    return node.name === item.source;
                  });
                  return sourceNode && sourceNode.itemStyle && sourceNode.itemStyle.color;
                }
              }
            };
          }),
    
          roam: true,
          label: {
            position: 'right',
            formatter: '{b}'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          }
        }
      ] };
  
    mycharts.setOption(option);
  }
  var chartA1;
  function createChartA1() {
    var oldChart = echarts.getInstanceByDom(document.getElementById("exception2"));
    if (oldChart) {
      echarts.dispose(oldChart);
    }
    var chart = echarts.init(document.getElementById("exception2"));
    if (chartA1) {
        chartA1.dispose();
      }
    let globalArray = [];
    var hasComplications = [ 1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,1,1,1,0,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,0,1,0,1,1,0,0,1 ];
  
    function processData(data) {
      globalArray = data.map(item => [item['日期'], item['编号'], item['血糖值'], item['时间段'],hasComplications[item['编号']-1]]);
      renderChart();
    }
  
    function renderChart() {
      var schema = [   { name: 'date', index: 0, text: '日期' },
      { name: 'index', index: 1, text: 'index' },
      { name: '血糖值', index: 2, text: '血糖值' },
      { name: '时间段', index: 3, text: '时间段' } ];
      var lineStyle = {   width: 1,
        opacity: 0.5 };
      var option = {  
      backgroundColor: 'rgba(220, 249, 250, 0.9)',
      tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function(params) {
          var data = params.data;
          var patientId = data[0];
          var bloodSugar1 = data[1];
          var bloodSugar2 = data[2];
          var bloodSugar3 = data[3];
          var bloodSugar4 = data[4];
          var bloodSugar5 = data[5];
          var bloodSugar6 = data[6];
          var bloodSugar7 = data[7];
          return `患者编号：${patientId}<br>早餐前血糖值：${bloodSugar1}<br>早餐后血糖值：${bloodSugar2}<br>午餐前血糖值：${bloodSugar3}<br>午餐后血糖值：${bloodSugar4}<br>晚餐前血糖值：${bloodSugar5}<br>晚餐后血糖值：${bloodSugar6}<br>睡前血糖值：${bloodSugar7}`;
        }
      },
      parallelAxis: [
        {
          dim: 0,
          name: '编号',
          inverse: true,
          max: 70,
          nameLocation: 'start',
          axisLabel: {
            color: 'black'
          }
        },
        { dim: 1, name: '早餐前血糖值',axisLabel: {color: 'black'}},
        { dim: 2, name: '早餐后血糖值',axisLabel: {color: 'black'}},
        { dim: 3, name: '午餐前血糖值' ,axisLabel: {color: 'black'}},
        { dim: 4, name: '午餐后血糖值',axisLabel: {color: 'black'}},
        { dim: 5, name: '晚餐前血糖值' ,axisLabel: {color: 'black'}},
        { dim: 6, name: '晚餐后血糖值' ,axisLabel: {color: 'black'}},
        { dim: 7, name: '睡前血糖值' ,axisLabel: {color: 'black'}},
      ],
      visualMap:{
        type:'piecewise',
        show:true,
        min:0,
        max:1,
        dimension:8,
        inRange:{
          color:['blue','red'],
        },
        pieces:[
          {value:0 ,label:'无并发症'},
          {value:1 , label:'有并发症'}
        ],
        textStyle:{
          color:'black'
        }
      },
      
      parallel: {
        left: '5%',
        right: '18%',
        bottom: 100,
        parallelAxisDefault: {
          type: 'value',
          name: 'index',
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            color: 'black',
            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: '#aaa'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#777'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#fff'
          }
        }
      },
      series: [
        {
          name: '血糖值',
          type: 'parallel',
          lineStyle: lineStyle,
          data: globalArray
        }
      ]};
  
      chart.setOption(option);
    }
  
    function loadData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          globalArray = globalArray.concat(data.map(item => [ item['编号'], item['早餐前'],item['早餐后'],item['午餐前'],item['午餐后'],item['晚餐前'],item['晚餐后'],item['睡前'],hasComplications[item['编号']-1]]));
          renderChart();
        })
        .catch(error => console.log(error));
    }
  
    loadData('data/datanew.json');
}
  
function createChartB1()
{
  var oldChart = echarts.getInstanceByDom(document.getElementById("exception2"));
  if (oldChart) {
    echarts.dispose(oldChart);
  }
  var systolic = [136, 162, 165, 147, 115, 199, 128, 149, 147, 120, 194, 159, 136, 172, 143, 173, 116, 159, 144, 101, 130, 134, 137, 124, 169, 139, 139, 168, 111, 129, 152, 180, 148, 142, 126, 100, 137, 135, 119, 126, 117, 121, 136, 171, 131, 127, 156, 117, 164, 138, 137, 138, 148, 120, 151, 133, 138, 159, 163, 138, 137, 152, 175, 149, 132, 100, 178];
  var diastolic = [82, 84, 99, 92, 75, 147, 77, 98, 78, 66, 73, 97, 85, 101, 88, 107, 84, 91, 80, 56, 78, 79, 71, 80, 101, 85, 100, 94, 64, 58, 88, 100, 79, 77, 65, 79, 65, 82, 89, 72, 82, 72, 96, 89, 97, 75, 110, 77, 101, 77, 85, 81, 92, 56, 103, 59, 79, 99, 90, 90, 91, 87, 88, 83, 89, 78, 102];
  var hasComplications=[0,0,1,1,0,1,1,1,1,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1]

  var myChart = echarts.init(document.getElementById('exception2'));

  
  var option = {
      title: {
          text: '血压哑铃图'
      },
      tooltip: {},
      yAxis: {
          type: 'value',
          name: '血压'
      },
      xAxis: {
          type: 'category',
          name: 'Index',
          data: Array.from({ length: systolic.length }, (_, i) => i)
      },
      dataZoom:[
          {
              tyoe:'slider'
          }
      ],
      graphic: [{
          type: 'text',
          left: 'center',
          top: 'top',
          style: {
          text: '蓝色线条表示女，橙色线条表示男',
          font: '14px Microsoft YaHei',
          fill: 'rgba(0, 0, 0, 0.65)'
          }
      }],
      legend: {
          data: ['收缩压', '舒张压'],
          left: 'right',
          top: 'top',
          orient: 'vertical',
          align: 'right',
          textStyle: {
          color: 'rgba(0, 0, 0, 0.65)'
          }
      },
      series: [
          {
              name: '收缩压',
              type: 'scatter',
              data: systolic,
              itemStyle: {
                  color: 'red'
              },
              symbol: function (value, params) {
                  // 判断是否为异常收缩压
                  if (value > 140) {
                      return 'arrow';
                  }
                  return 'circle';
              },
              symbolSize: function (value, params) {
                  // 设置异常收缩压箭头的大小
                  if (value > 140) {
                      return 10;
                  }
                  return 5;
              },
              symbolRotate: 180  // 设置异常收缩压箭头朝上
          },
          {
              name: '舒张压',
              type: 'scatter',
              data: diastolic,
              itemStyle: {
                  color: 'blue'
              },
              symbol: function (value, params) {
                  // 判断是否为异常舒张压
                  if (value > 90) {
                      return 'arrow';
                  }
                  return 'circle';
              },
              symbolSize: function (value, params) {
                  // 设置异常舒张压箭头的大小
                  if (value > 90) {
                      return 10;
                  }
                  return 5;
              },
              symbolRotate: 0  // 设置异常舒张压箭头朝下
          },
          {
              name: 'Connection',
              type: 'custom',
              data: Array.from({ length: systolic.length }, (_, i) => [i, systolic[i], diastolic[i]]),
              renderItem: function (params, api) {
                  var dataIndex = api.value(0);
                  var systolicValue = systolic[dataIndex];
                  var diastolicValue = diastolic[dataIndex];
                  var hasComplication = hasComplications[dataIndex];
                  var lineColor = hasComplication === 1 ? 'orange' : 'blue';
                  var point1 = api.coord([dataIndex, systolicValue]);
                  var point2 = api.coord([dataIndex, diastolicValue]);
                  return {
                      type: 'line',
                      shape: {
                          x1: point1[0],
                          y1: point1[1],
                          x2: point2[0],
                          y2: point2[1]
                      },
                      style: api.style({
                          stroke: lineColor,  // 设置线条颜色
                          lineWidth: 3
                      })
                  };
              },
              silent: true,
              animation: false
          }
      ]
  };

  // 使用配置项显示图表
  myChart.setOption(option);
}

function createChartB(){
  var oldChart = echarts.getInstanceByDom(document.getElementById("exception1"));
  if (oldChart) {
    echarts.dispose(oldChart);
  }
  fetch('data/lifedata.json')
  .then(response => response.json())
  .then(data => {
    // 筛选男性和女性数据
    const maleData = data.filter(person => person.性别 === '男');
    const femaleData = data.filter(person => person.性别 === '女');

    // 提取男性和女性的BMI、腰围和臀围数据
    const bmiMale = maleData.map(person => person.BMI);
    const waistMale = maleData.map(person => person.腰围);
    const hipMale = maleData.map(person => person.臀围);

    const bmiFemale = femaleData.map(person => person.BMI);
    const waistFemale = femaleData.map(person => person.腰围);
    const hipFemale = femaleData.map(person => person.臀围);

    // 使用 ECharts 的盒须图数据格式
    const maleBoxplotData = echarts.dataTool.prepareBoxplotData([
      bmiMale,
      waistMale,
      hipMale,
    ]);
    const femaleBoxplotData = echarts.dataTool.prepareBoxplotData([
      bmiFemale,
      waistFemale,
      hipFemale,
    ]);

    // 创建图表
    const myChart = echarts.init(document.getElementById('exception1'));

    // 设置图表选项
    const option = {
      title: {
        text: '男女BMI、腰围和臀围差异',
        left: 'center',
      },
      legend: {
        y: '10%',
        data: ['男性', '女性'],
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow',
        },
        formatter: formatter,
      },
      grid: {
        left: '10%',
        top: '20%',
        right: '10%',
        bottom: '15%',
      },
      xAxis: {
        type: 'category',
        data: ['BMI', '腰围', '臀围'],
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
          show: true,
        },
        axisLabel: {
          formatter: '{value}',
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        name: '值',
        min: 0,
        max: 120,
        splitArea: {
          show: false,
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 20,
        },
        {
          show: true,
          height: 20,
          type: 'slider',
          top: '90%',
          xAxisIndex: [0],
          start: 0,
          end: 20,
        },
      ],
      series: [
        {
          name: '男性',
          type: 'boxplot',
          data: maleBoxplotData.boxData,
          tooltip: { formatter: formatter },
        },
        {
          name: '女性',
          type: 'boxplot',
          data: femaleBoxplotData.boxData,
          tooltip: { formatter: formatter },
        },
        {
          name: '男性异常值',
          type: 'scatter',
          data: maleBoxplotData.outliers.map(item => ({ value: item })),
          symbol: 'circle',
          itemStyle: {
            color: 'red',
          },
          tooltip: {
            formatter: '男性异常值: {b0}<br>{c0}',
          },
          symbolPosition: 'end'
        },
        {
          name: '女性异常值',
          type: 'scatter',
          data: femaleBoxplotData.outliers.map(item => ({ value: item })),
          symbol: 'circle',
          itemStyle: {
            color: 'red',
          },
          tooltip: {
            formatter: '女性异常值: {b0}<br>{c0}',
          },
          symbolPosition: 'end'
        },
      ],
    };

    // 绘制图表
    myChart.setOption(option);

    // 定义 tooltip 格式化函数
    function formatter(param) {
      if (param.seriesType === 'boxplot') {
        return (
          param.seriesName +
          ' ' +
          param.name +
          ':<br>' +
          '上边缘: ' +
          param.data[5] +
          '<br>' +
          '上四分位数: ' +
          param.data[4] +
          '<br>' +
          '中位数: ' +
          param.data[3] +
          '<br>' +
          '下四分位数: ' +
          param.data[2] +
          '<br>' +
          '下边缘: ' +
          param.data[1]
        );
      }
    }
  })
  .catch(err => console.error('Error fetching data:', err));
}

function createChartC(){
  var oldChart = echarts.getInstanceByDom(document.getElementById("exception1"));
  if (oldChart) {
    echarts.dispose(oldChart);
  }
var chartsss=echarts.init(document.getElementById("exception1"))
let colorStopsArray = [
  [{
    offset: 0,
    color: 'rgba(204,251,255, 0.8)',
    //  0%  处的颜色
  },
    {
      offset: 1,
      color: 'rgba(239,150,197, 0.8)',
      //  100%  处的颜色
    },
  ],
  [{
    offset: 0,
    color: 'rgba(249,149,127, 0.8)',
    //  0%  处的颜色
  },
    {
      offset: 1,
      color: 'rgba(242,245,208, 0.8)',
      //  100%  处的颜色
    },
  ],
  [{
    offset: 0,
    color: 'rgba(234,229,201, 0.8)',
    //  0%  处的颜色
  },
    {
      offset: 1,
      color: 'rgba(108,198,203, 0.8)',
      //  100%  处的颜色
    },
  ],
  [{
    offset: 0,
    color: 'rgba(159,165,213, 0.8)',
    //  0%  处的颜色
  },
    {
      offset: 1,
      color: 'rgba(232,245,200, 0.8)',
      //  100%  处的颜色
    },
  ],
  [{
    offset: 0,
    color: 'rgba(200,115,255, 0.8)',
    //  0%  处的颜色
  },
    {
      offset: 1,
      color: 'rgba(174,186,248, 0.8)',
      //  100%  处的颜色
    },
  ],
  [{
    offset: 0,
    color: 'rgba(12,123,179, 0.8)',
    //  0%  处的颜色
  },
    {
      offset: 1,
      color: 'rgba(242,186,232, 0.8)',
      //  100%  处的颜色
    },
  ],
    [{
    offset: 0,
    color: 'rgba(124,128,179, 0.8)',
    //  0%  处的颜色
  },
    {
      offset: 1,
      color: 'rgba(247,185,165, 0.8)',
      //  100%  处的颜色
    },
  ],
  [{
    offset: 0,
    color: 'rgba(165,26,144, 0.8)',
    //  0%  处的颜色
  },
    {
      offset: 1,
      color: 'rgba(64,86,155, 0.8)',
      //  100%  处的颜色
    },
  ],
    [{
    offset: 0,
    color: 'rgba(12,123,179, 0.8)',
    //  0%  处的颜色
  },
    {
      offset: 1,
      color: 'rgba(242,186,232, 0.8)',
      //  100%  处的颜色
    },
  ],
    [{
    offset: 0,
    color: 'rgba(12,123,179, 0.8)',
    //  0%  处的颜色
  },
    {
      offset: 1,
      color: 'rgba(242,186,232, 0.8)',
      //  100%  处的颜色
    },
  ]
];

let riskName = ['无症状', '多饮', '多尿', '多食', '视力模糊', '感染', '手脚麻木', '下肢浮肿', '体重明显下降', '其他'];
let riskData = [172, 84, 8, 88, 12, 0, 3, 4, 0, 0];

var option = {
  title: {
    text: '个数(个)',
    x: '2%',
    y: '1%',
    textStyle: {
      color: '#1890FF',
      fontSize: 10,
      fontWeight: 400,
    },
  },
  grid: {
    left: '5%',
    top: '8%',
    bottom: '10%',
    right: '5%',
    containLabel:true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none',
    },
    extraCssText: 'width:100px;height:60px;'
  },
  xAxis: {
    data: riskName,
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(45, 140, 240, 0.65)',
        width: 1,
        //这里是为了突出显示加上的
      },
    },
    axisLabel: {
      show: true,
      interval: 0,
      //代表显示所有x轴标签显示
      rotate: 45,
      //代表逆时针旋转45度
      margin: 8,
      textStyle: {
        color: '#1890FF',
        fontSize: 10,
        fontWeight: 400,
      },
    },
  },
  yAxis: [{
    splitNumber: 2,
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(24,144,255, 0.15)',
        width: 1,
        //这里是为了突出显示加上的
      },
    },
    axisLabel: {
      inside: false,
      textStyle: {
        color: '#1890FF',
        fontWeight: 400,
        fontSize: 7,
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: 'rgba(255,255,255,.5)',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(24,144,255, 0.15)',
        width: 1,
        type: 'solid',
      },
    },
  },
  ],
  series: [{
    name: '个数',
    type: 'pictorialBar',
    barCategoryGap: '-50%',
    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    label: {
      show: false,
      position: 'top',
      distance: 15,
      color: '#1890FF',
      fontWeight: 'bolder',
      fontSize: 5,
    },
    itemStyle: {
      normal: {
        color: function(data) {
          var obj = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              colorStopsArray[data.dataIndex][0],
              colorStopsArray[data.dataIndex][1],
            ],
            global: false,
            //  缺省为  false
          }

          return obj
        },
      },
      emphasis: {
        opacity: 1,
      },
    },
    data: riskData,
    z: 10,
  },
  ],
};
chartsss.setOption(option)
}

function createChartC1(){
  var oldChart = echarts.getInstanceByDom(document.getElementById("exception2"));
  if (oldChart) {
    echarts.dispose(oldChart);
  }
  // 假设你已经知道了以下数据，以对象数组的形式表示
  const data = [
    { category: '无症状', 控制满意: 172, 控制不满意: 0 },
    { category: '多饮', 控制满意: 80, 控制不满意: 4 },
    { category: '多食', 控制满意: 84, 控制不满意: 4 },
    { category: '多尿', 控制满意: 8, 控制不满意: 0 },
    { category: '视力模糊', 控制满意: 12, 控制不满意: 0 },
    { category: '手脚麻木', 控制满意: 3, 控制不满意: 0 },
    { category: '下肢浮肿', 控制满意: 4, 控制不满意: 0 },
  ];

  // 定义表格的数据，包括症状、相关系数和p值
  const tableData = [
    { category: '无症状', 相关系数: -0.17, p值: 0.006 },
    { category: '多饮', 相关系数: 0.182, p值: 0.003 },
    { category: '多食', 相关系数: 0.175, p值: 0.004 },
    { category: '多尿', 相关系数: -0.022, p值: 0.722 },
    { category: '视力模糊', 相关系数: -0.027, p值: 0.661 },
    { category: '手脚麻木', 相关系数: -0.013, p值: 0.829 },
    { category: '下肢浮肿', 相关系数: -0.015, p值: 0.803 },
  ];

  // 提取症状名称作为 xAxis 的 data
  const symptoms = data.map(item => item.category);

  // 将数据转换为 ECharts 所需的 series 格式
  const seriesData = [
    { name: '控制满意', type: 'bar', data: data.map(item => item['控制满意']) },
    { name: '控制不满意', type: 'bar', data: data.map(item => item['控制不满意']) },
  ];

  // 自定义tooltip的格式，包括柱状图和表格
  const customTooltip = params => {
    const index = params[0].dataIndex;
    const symptom = symptoms[index];
    const correlation = tableData[index].相关系数;
    const pValue = tableData[index].p值;

    let content = `<div>症状：${symptom}</div>`;
    content += `<div>与控制程度的Kendall's tau相关系数：${correlation.toFixed(2)}</div>`;
    content += `<div>与控制程度的Kendall's tau相关系数的p值：${pValue.toFixed(2)}</div>`;

    return content;
  };

  // 初始化 ECharts 实例
  const chart = echarts.init(document.getElementById('exception2'));

  // 设置图表配置项
  const option = {
    title: {
      text: '不同随访分类下各症状的患者随访条数',
      left: 'left',
      textStyle: {
        color: '#1890FF',
        fontSize: 10,
        fontWeight: 400,
      },
    },
    legend: {
      data: ['控制满意', '控制不满意'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: customTooltip,
    },
    xAxis: {
      type: 'category',
      data: symptoms,
    },
    yAxis: {
      type: 'value',
    },
    series: seriesData,
  };

  // 使用刚指定的配置项和数据显示图表
  chart.setOption(option);

}

function createChartD(){
  var oldChart = echarts.getInstanceByDom(document.getElementById("exception1"));
  if (oldChart) {
    echarts.dispose(oldChart);
  }
  var chart4 =echarts.init(document.getElementById('exception1'));
  var getdata = [
    [4.16,11.78,16.8,6.84,4.89,5.38,5.83,7.62,9.66,12.38,6.44,6.34,5.2,13.98,9.32,6.97,9.89,5.8,6.9,8.9,5.73,5.45,10.5,15.38,8.5,8.2,5.49,14.2,8.94,13.9,6.3,7.3,10.9,7.9,14.6,7,7.8,12.6,9.3,7.38,14.71,12.3,3.9,10],
    [16,9.2,10.3,5.6,11.7,6.2,12.1,15,10.2,11.7,9.4,8.6,6.2,9.3,13.8,16.2,5.8,7.5,9.7,12.8,6.5,12.9,8.9,11.4,15.5,10.1,9.8,6.4,7,9.5,9.1,11.5,6.8,10.7,6.9,7.7,8.5,6.3,7.1,8.8,8,7.3]
]
var getname=['空腹血糖','糖化血红蛋白'];
var option = {
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '50',
        right: '20',
        top:'40',
        bottom:'40',
    },
    xAxis: {
        type: 'category',
        data: getname,
        axisLabel: {
            color: '#777777',
            textStyle: {
                fontSize: '13'
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            lineStyle: {
                color: '#333333',
            }
        },
        splitLine: {
            show: false
        }
    },

    yAxis: {
        type: 'value',
		name:'值',
        nameTextStyle: {
            color: '#777777',
            fontSize: 13,
            padding:[0,0,0,60]
        },
        axisLabel: {
            color: '#777777',
            textStyle: {
                fontSize: '13'
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            lineStyle: {
                color: '#333333',
            }
        },
        splitLine: {
            lineStyle: {
                color: '#D1D1D1',
            },
        }

    },
    series: [{
            name: 'boxplot',
            type: 'boxplot',
            data: getdata,
            itemStyle: {
                normal: {
                    borderColor: '#4B96F3',
                    borderWidth: 2,
                    color: '#D9EAFF',
                }
            },
            tooltip: {
                formatter: function(param) {
                    return [

                        'Upper: ' + param.data[5] ,
                        'Q3: ' + param.data[4],
                        'Median: ' + param.data[3] ,
                        'Q1: ' + param.data[2] ,
                        'Lower: ' + param.data[1]
                    ].join('<br/>')
                }
            }
        }, {
            name: '异常',
            type: 'scatter',
            symbolSize: 10,
            data: [
                [0, 17, "异常"],
            ],
            itemStyle: {
                normal: {
                    color: 'rgba(75,150,243,.7)',
                }
            },
            label: {
                show: false,
            },
        },{
            name: '异常',
            type: 'scatter',
            symbolSize: 10,
            data: [
                [3, 75, "异常"],
            ],
            itemStyle: {
                normal: {
                    color: 'rgba(75,150,243,.7)',
                }
            },
            label: {
                show: false,
            },
        }
    ]
};
  chart4.setOption(option);
}

function createChartD1(){
  var oldChart = echarts.getInstanceByDom(document.getElementById("exception2"));
  if (oldChart) {
    echarts.dispose(oldChart);
  }
  var chart5=echarts.init(document.getElementById('exception2'))
  // See https://github.com/ecomfe/echarts-stat
echarts.registerTransform(ecStat.transform.regression);
const data = [
  [4.16,16],
  [11.78,9.2],
  [16.8,11.7],
  [6.84,6.2],
  [4.89,12.1],
  [5.38,15],
  [7.62,10.2],
  [9.66,11.7],
  [12.38,9.4],
  [6.44,8.6],
  [6.34,6.2],
  [5.2,9.3],
  [13.98,13.8],
  [5.8,5.8],
  [6.9,7.5],
  [8.9,9.7],
  [5.73,12.8],
  [5.45,12.9],
  [10.5,8.9],
  [15.38,11.4],
  [8.2,6.4],
  [5.49,7],
  [14.2,9.5],
  [8.94,9.1],
  [13.9,11.5],
  [6.3,6.8],
  [10.9,7.7],
  [14.6,8.5],
  [7,6.3],
  [7.6,7.1],
  [12.6,8.8],
  [7.38,8],
  [14.71,7.3]
];
var option = {
  dataset: [
    {
      source: data
    },
    {
      transform: {
        type: 'ecStat:regression',
        // 'linear' by default.
        config: { method: 'polynomial', formulaOn: 'end'}
      }
    }
  ],
  title: {
    text: '空腹血糖与糖化血红蛋白关系',
    sublink: 'https://github.com/ecomfe/echarts-stat',
    left: 'center'
  },
  legend: {
    bottom: 5
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: {
    name:'空腹血糖',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  yAxis: {
    name:'糖化血红蛋白(%)',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: 'scatter',
      type: 'scatter'
    },
    {
      name: 'line',
      type: 'line',
      datasetIndex: 1,
      symbolSize: 0.1,
      symbol: 'circle',
      label: { show: true, fontSize: 16 },
      labelLayout: { dx: -20 },
      encode: { label: 2, tooltip: 1 }
    }
  ]
};
  chart5.setOption(option);
}

function updateCharts(selectedOption) {
    const exception1ChartContainer = document.getElementById("exception1");
    const exception2ChartContainer = document.getElementById("exception2");
    if (selectedOption === "option1") {
      exception1ChartContainer.style.display = "block";
      exception2ChartContainer.style.display = "block";
      createChartA(); // 在选项1时调用创建图表A的函数
      createChartA1(); // 在选项1时调用创建图表A1的函数
    } else if (selectedOption === "option2") {
      // ... 这里可以根据需要添加其他选项的处理 ...
      createChartB();
      createChartB1();
      exception1ChartContainer.style.display = "block";
      exception2ChartContainer.style.display = "block";
    } else if(selectedOption === "option3"){
      createChartC();
      createChartC1();
      exception1ChartContainer.style.display = "block";
      exception2ChartContainer.style.display = "block";
    } else if(selectedOption === "option4"){
      createChartD();
      createChartD1()
      exception1ChartContainer.style.display = "block";
      exception2ChartContainer.style.display = "block";
    }
  }
  
  // 为 select 元素添加事件监听器
  const selectElement = document.getElementById("chart-options");
  selectElement.addEventListener("change", function (event) {
    const selectedOption = event.target.value;
    updateCharts(selectedOption);
  });
  
  // 初始时调用更新函数，显示基于默认选定选项的默认图表
  updateCharts(selectElement.value);
  
function createChartA(){
    var mycharts = echarts.init(document.getElementById("exception1"));

var data = [
  { name: '高血压', value: 33 },
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
  { name: '乳酸性酸中毒', value: 0 }
];

var links = [
  { source: '高血压', target: '脑血管病变', value: 3 },
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
  { source: '糖尿病肾病', target: '糖尿病足', value: 1 }
];

var option = {
  title: {
    text: 'Les Miserables',
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
  ]
};

mycharts.setOption(option);
}


function createChartA1()
{
    var chart = echarts.init(document.getElementById("exception2"));
    let globalArray = [];
    var hasComplications=[1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,1,1,1,0,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,0,1,0,1,1,0,0,1]

function processData(data) {
globalArray = data.map(item => [item['日期'], item['编号'], item['血糖值'], item['时间段'],hasComplications[item['编号']-1]]);
renderChart(); 
}


function renderChart() {
var schema = [
  { name: 'date', index: 0, text: '日期' },
  { name: 'index', index: 1, text: 'index' },
  { name: '血糖值', index: 2, text: '血糖值' },
  { name: '时间段', index: 3, text: '时间段' }
];
var lineStyle = {
  width: 1,
  opacity: 0.5
};
var option = {
  backgroundColor: '#333',
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
      inverse: false,
      max: 70,
      nameLocation: 'start'
    },
    { dim: 1, name: '早餐前血糖值' },
    { dim: 2, name: '早餐后血糖值'},
    { dim: 3, name: '午餐前血糖值' },
    { dim: 4, name: '午餐后血糖值'},
    { dim: 5, name: '晚餐前血糖值' },
    { dim: 6, name: '晚餐后血糖值' },
    { dim: 7, name: '睡前血糖值' },
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
      color:'#fff'
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
        color: '#fff',
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
  ]
};
chart.setOption(option);
}


function loadData(url) {
fetch(url)
  .then(response => response.json())
  .then(data => {
    globalArray = globalArray.concat(data.map(item => [item['编号'], item['早餐前'],item['早餐后'],item['午餐前'],item['午餐后'],item['晚餐前'],item['晚餐后'],item['睡前'],hasComplications[item['编号']-1]]));
    console.log(globalArray)
    renderChart();
  })
  .catch(error => console.log(error));
}


loadData('data/datanew.json');
}

  // 为两个图表添加全局数组
  let chartAData = [];
  let chartA1Data = [];

  // 为每个图表添加独立的ECharts实例
  var chartAInstance = echarts.init(document.getElementById("exception1"));
  var chartA1Instance = echarts.init(document.getElementById("exception2"));

  // ... 您的 createChartA() 和 createChartA1() 函数 ...

  // 更新函数，用于渲染 chartA 和 chartA1 图表
  function updateCharts(selectedOption) {
    if (selectedOption === "option1") {
      chartAData = [];
      chartA1Data = [];
      createChartA(); // 创建 chartA 数据
      chartAInstance.setOption(createChartA()); // 设置 chartA 数据
      createChartA1(); // 创建 chartA1 数据
      chartA1Instance.setOption(createChartA1()); // 设置 chartA1 数据
    } else if (selectedOption === "option2") {
      // 如果需要处理选项2的情况，请在此处添加代码...
    } else {
      // 如果需要处理其他选项或默认情况，请在此处添加代码...
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